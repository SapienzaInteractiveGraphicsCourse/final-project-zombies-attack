import { Sound, SceneLoader, Vector3, Ray, Mesh } from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import { shotAnimation } from "./animations/gunShot";
import { options } from "../../options";

async function loadAsync(scene, camera) {
  setupCrosshair()

  return SceneLoader.ImportMeshAsync("", "./models/weapons/", "scene.glb", scene).then((result) => {
    // Set all other meshes invisible
    gun.meshes = result.meshes;
    gun.meshes.map((mesh) => {
      mesh.isVisible = false;
    })
    result.transformNodes.map((node) => {
      if (node.name === 'AK-47') {
        const meshArray = []
        node._children.map((child) => {
          meshArray.push(child)
        })
        gun.mesh = Mesh.MergeMeshes(meshArray)
      }
    })
    gun.mesh.isVisible = true;

    gun.mesh.parent = camera;
    gun.renderingGroupId = 1;

    gun.mesh.rotation = new Vector3(0, Math.PI * 0.2, 0);
    gun.mesh.position = new Vector3(0.05, -0.05, 0.2);

    gun.isShooting = false;
    gun.isReloading = false;

    return result;
  })
}

function setupCrosshair() {
  const tex = GUI.AdvancedDynamicTexture.CreateFullscreenUI('FullscreenUI');

  const leftRect = new GUI.Rectangle('leftRect');
  leftRect.width = '10px';
  leftRect.height = '2px';
  leftRect.color = 'Green';
  leftRect.background = 'Green';
  leftRect._moveToProjectedPosition(new Vector3(-8, 0, 0));
  tex.addControl(leftRect);

  const rightRect = new GUI.Rectangle('rightRect');
  rightRect.width = '10px';
  rightRect.height = '2px';
  rightRect.color = 'Green';
  rightRect.background = 'Green';
  rightRect._moveToProjectedPosition(new Vector3(8, 0, 0));
  tex.addControl(rightRect);

  const topRect = new GUI.Rectangle('topRect');
  topRect.width = '2px';
  topRect.height = '10px';
  topRect.color = 'Green';
  topRect.background = 'Green';
  topRect._moveToProjectedPosition(new Vector3(0, 8, 0));
  tex.addControl(topRect);

  const bottomRect = new GUI.Rectangle('bottomRect');
  bottomRect.width = '2px';
  bottomRect.height = '10px';
  bottomRect.color = 'Green';
  bottomRect.background = 'Green';
  bottomRect._moveToProjectedPosition(new Vector3(0, -8, 0));
  tex.addControl(bottomRect);

  return tex;
}

function shot(sceneInfo) {
  let id;
  const volume = options.settings.sound ? options.settings.soundPerc / 100 : 0;
  const gunshot = new Sound("gunshot", "./sounds/ak_shot.mp3", sceneInfo.scene, null, {
    volume: volume,
  });
  const blood = new Sound("blood", "./sounds/blood.mp3", sceneInfo.scene, null, {
    volume: volume,
    offset: 0.5
  });
  const bodyFall = new Sound("bodyFall", "./sounds/body_fall.mp3", sceneInfo.scene, null, {
    volume: volume,
    offset: 0.4
  });

  onmousedown = ((event) => {
    if (!sceneInfo.gun.isReloading) {
      if (sceneInfo.player.ammo > 0) {
        sceneInfo.gun.isShooting = true;
      sceneInfo.player.ammo -= 1;
        gunshot.setVolume(volume); // Or Engine.audioEngine.setGlobalVolume(volume); for global volume
        // First shot
        checkShot(sceneInfo, blood, bodyFall);
        gunshot.play();
      }

      // Second shot (and sequent ones) after 75ms
      id = setInterval(()=>{
        if (sceneInfo.player.ammo > 0) {
          sceneInfo.player.ammo -= 1;
          checkShot(sceneInfo, blood, bodyFall);
          gunshot.play();
        }
      }, 100) // 600 rps for the ak47, -> 100 ms of delay between shots
    }
  })
  onmouseup = () => {
    sceneInfo.gun.isShooting = false;
    clearInterval(id)
  }
}

function checkShot(sceneInfo, blood, bodyFall) {
  const origin = sceneInfo.camera.globalPosition.clone();
  const forward = sceneInfo.camera.getDirection(Vector3.Forward());
  shotAnimation(sceneInfo.scene, sceneInfo.camera, sceneInfo.gun)

  if (sceneInfo.camera.rotation.x > -0.30) {
    sceneInfo.camera.rotation.x -= 0.02
  }

  const ray = new Ray(origin, forward, 200);
  
  const hit = sceneInfo.scene.pickWithRay(ray, (mesh) => {
    return mesh.name.match(/^hitbox+/) !== null;
  });

  if(sceneInfo.enemy.hp > 0){
    if (hit && hit.pickedMesh) {
      blood.play()
      // Get the parent mesh node
      let mesh = hit.pickedMesh;
      while (mesh.parent !== null) {
        mesh = mesh.parent;
      }

      if (hit.pickedMesh.name.match(/Head+/) !== null) {
        sceneInfo.enemy.hp -= 50;
      }
      else if (hit.pickedMesh.name.match(/Spine+/) !== null) {
        sceneInfo.enemy.hp -= 20;
      }
      else {
        sceneInfo.enemy.hp -= 10;
      }

      if (sceneInfo.enemy.hp <= 0 && sceneInfo.enemy.meshdata) {
        sceneInfo.scene.getAnimationGroupByName("walk").stop()
        sceneInfo.scene.getAnimationGroupByName("attack").stop()
        sceneInfo.scene.getAnimationGroupByName("death").play()
        sceneInfo.scene.getAnimationGroupByName("death").onAnimationGroupEndObservable.add(() => {
          bodyFall.play()
          // Dispose the parent mesh
          //enemy.meshdata = false;
          sceneInfo.player.pts += 100;
          setTimeout(() => {
            mesh.dispose();
          }, 1000); // Dispose the mesh after 1s when the death animation has finished
        })
      }
    }
  }
}

const gun = {
    isReloading: false,
    isShooting: false,
    loadAsync,
    shot
};

export default gun;
import {
    Scene,
    Vector3,
    CubeTexture,
    MeshBuilder,
    UniversalCamera,
    SceneLoader,
    PBRMaterial,
    Mesh,
    Texture,
    Ray,
    Sound,
    Engine,
    Axis,
    Space,
    StandardMaterial,
    Color3,
    Quaternion
} from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import "@babylonjs/loaders";
import { shotAnimation } from '../models/gun/animations/gunShot'
import { options } from "../options";
import enemy from "../models/zombie/zombie";
import { RotationFromDegrees, deg2rad } from "../libs/angles";
import hud from "../HUD/HUD";
import gunanims from "../models/gun/animations/gunReload";
import { RoundSystem } from "../libs/roundSystem";

let isReloading = false;

async function createScene(canvas, engine) {
  const scene = new Scene(engine);

  scene.onPointerDown = (event) => {
      if (event.button === 0) {
          canvas.width = window.outerWidth;
          canvas.height = window.outerHeight;
          engine.enterPointerlock();
          engine.enterFullscreen();
      }
      if (event.button === 1) {
          canvas.width = this.width;
          canvas.height = this.height;
          engine.exitPointerlock();
          engine.exitFullscreen();
      }
  }

  HandleControl(engine)

  const framesPerSecond = 60;
  const gravity = -9.81;
  scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);
  scene.collisionsEnabled = true;


  const envTex = CubeTexture.CreateFromPrefilteredData('./environment/sky.env', scene)
  scene.environmentTexture = envTex

  scene.createDefaultSkybox(envTex, true)

  CreateEnvironment(scene)
  const camera = CreateController(scene)
  const gun = await LoadGun(scene, camera)
  // Load all meshes
  await Promise.all([
    enemy.loadAsync(scene),
  ]);

  // Create the turn system for this battle
  const round = new RoundSystem();

  const sceneInfo = {
    player: {
      hp: 100,
      pts: 0,
      ammo: 30,
      magazines: 210
    },
    scene,
    enemy,
    camera,
    gun,
    round
    // ui,                  // added later since it needs battleUI and sceneInfo itself
    // onPlayerVictory,     // added later since it needs battleUI and sceneInfo itself
    // onPlayerDefeat,      // added later since it needs battleUI and sceneInfo itself
    // gotoNextScene,       // added later for coherence w/ the above
  }
  enemy.sceneSpecificInit(sceneInfo);

  // Have the turn system constantly watch for the condition to pass turn
  round.addRoundObserver(sceneInfo);

  // Create the GUI for this scene
  var gameHUD = hud.createHUD(sceneInfo);
  sceneInfo.hud = gameHUD;

  Shot(sceneInfo, camera, gun)
  reload(sceneInfo)

  return scene;
}

async function CreateEnvironment(scene) {
  const ground = MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, scene)

  ground.material = CreateAsphalt(scene)
  
  ground.model = ground;

  ground.checkCollisions = true;

  for(var i = 1 ; i < 7 ; i++){
    LoadFence1(scene , i);
    LoadFence2(scene , i);
    }
    LoadTombs(scene);
    LoadTMausoleum(scene);
    LoadStatue1(scene);
    LoadStatue2(scene);
}

function CreateAsphalt(scene) {
  const pbr = new PBRMaterial('pbr', scene)
  pbr.albedoTexture = new Texture('./textures/asphalt/asphalt_diffuse.jpg', scene)

  pbr.bumpTexture = new Texture('./textures/asphalt/asphalt_normal.jpg', scene)
  pbr.invertNormalMapX = true
  pbr.invertNormalMapY = true

  pbr.useAmbientOcclusionFromMetallicTextureRed = true
  pbr.useRoughnessFromMetallicTextureGreen = true
  pbr.useMetallnessFromMetallicTextureBlue = true

  pbr.metallicTexture = new Texture('./textures/asphalt/asphalt_ao.jpg', scene)

  return pbr
}

function CreateController(scene) {
  const camera = new UniversalCamera("UniversalCamera", new Vector3(1, 2, 1), scene);
  camera.setTarget(new Vector3(0, 2, 0));

  camera.attachControl()
  camera.speed = 0.25

  camera.applyGravity = true;
  camera.checkCollisions = true;

  camera.ellipsoid = new Vector3(0.5, 2, 0.5);
  camera.ellipsoidOffset = new Vector3(0.0, 2, 0.0);

  camera.minZ = 0.01;
  camera.angularSensibility = 5600 - options.settings.sensibility; // Normalize sensibility based on settings

  camera.keysUp.push(87);
  camera.keysLeft.push(65);
  camera.keysDown.push(83);
  camera.keysRight.push(68);
  
  return camera
}

async function LoadFence1(scene, i ,camera) {

  const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map/", "graveyard_fence.glb", scene);
  const fence = meshes[0];
  fence.position = new Vector3(-2+(8*i) , 2 , 0);
  fence.scaling = new Vector3(4 , 4 , 4);
  

}

async function LoadFence2(scene, i ,camera) {

  const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map/", "graveyard_fence.glb", scene);
  const fence = meshes[0];
  fence.position = new Vector3(-(-2+(8*i)) , 2 , 0);
  fence.scaling = new Vector3(4 , 4 , 4);

}

async function LoadTombs(scene,camera) {

  const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map/", "shelby_tombstone_with_smart3dcapture3.2_free.glb", scene);
  const tomb = meshes[0];
  tomb.position = new Vector3(30 , 2.6 , -2);
  tomb.scaling = new Vector3(0.1 , 0.1 , 0.1);
  tomb.rotation = new Vector3( 0 , -Math.PI*0.5 , 0);

}

async function LoadTMausoleum(scene,camera) {

  const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map/", "mausoleum.glb", scene);
  const maus = meshes[0];
  maus.position = new Vector3(0 , -0.5 , -42);
  maus.scaling = new Vector3(4 , 4 , 4);
  maus.rotation = new Vector3( 0 , Math.PI*0.5 , 0);

}

async function LoadStatue1(scene,camera) {

  const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map/", "frank.glb", scene);
  const statue = meshes[0];
  statue.position = new Vector3(8.5 , 1.8, -47);
  statue.scaling = new Vector3(3 , 3 , 3);
  statue.rotation = new Vector3( 0 , 0 , 0);

}

async function LoadStatue2(scene,camera) {

  const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map/", "frank.glb", scene);
  const statue = meshes[0];
  statue.position = new Vector3(-8.5 , 1.8, -47);
  statue.scaling = new Vector3(3 , 3 , 3);
  statue.rotation = new Vector3( 0 , 0 , 0);

}


async function LoadGun(scene, camera) {
  SetupCrosshair()

  const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/weapons/", "scene.glb", scene);

  // Set all other meshes invisible
  meshes.map((mesh) => {
    mesh.isVisible = false;
  })
  let gun;
  rest.transformNodes.map((node) => {
    if (node.name === 'AK-47') {
      const meshArray = []
      node._children.map((child) => {
        meshArray.push(child)
      })
      gun = Mesh.MergeMeshes(meshArray)
    }
  })
  gun.isVisible = true;

  gun.parent = camera;
  gun.renderingGroupId = 1;

  gun.rotation = new Vector3(0, Math.PI * 0.2, 0)
  gun.position = new Vector3(0.05, -0.05, 0.2);
  
  return gun;
}

function SetupCrosshair() {
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

function Shot(sceneInfo, camera, gun) {
  let id;
  const volume = options.settings.sound ? options.settings.soundPerc / 100 : 0;
  const gunshot = new Sound("gunshot", "./sounds/ak_shot.mp3", sceneInfo.scene, null, {
    volume: volume,
  });

  onmousedown = ((event) => {
    if (!isReloading) {
      if (sceneInfo.player.ammo > 0) {
      sceneInfo.player.ammo -= 1;
        gunshot.setVolume(volume); // Or Engine.audioEngine.setGlobalVolume(volume); for global volume
        // First shot
        CheckShot(sceneInfo, camera, gun);
        gunshot.play();
      }

      // Second shot (and sequent ones) after 75ms
      id = setInterval(()=>{
        if (sceneInfo.player.ammo > 0) {
          sceneInfo.player.ammo -= 1;
          CheckShot(sceneInfo, camera, gun);
          gunshot.play();
        }
      }, 100) // 600 rps for the ak47, -> 100 ms of delay between shots
    }
  })
  onmouseup = () => {
    clearInterval(id)
  }
}

function CheckShot(sceneInfo, camera, gun) {
  const origin = camera.globalPosition.clone();
  const forward = camera.getDirection(Vector3.Forward());
  shotAnimation(sceneInfo.scene, camera, gun)

  if (camera.rotation.x > -0.30) {
    camera.rotation.x -= 0.02
  }

  const ray = new Ray(origin, forward, 200);
  
  const hit = sceneInfo.scene.pickWithRay(ray, (mesh) => {
    return mesh.name.match(/^hitbox+/) !== null;
  });

  if (hit && hit.pickedMesh) {
    // Get the parent mesh node
    let mesh = hit.pickedMesh;
    while (mesh.parent !== null) {
      mesh = mesh.parent;
    }

    if (hit.pickedMesh.name.match(/Head+/) !== null) {
      enemy.hp -= 50;
    }
    else if (hit.pickedMesh.name.match(/Spine+/) !== null) {
      enemy.hp -= 20;
    }
    else {
      enemy.hp -= 10;
    }

    if (enemy.hp <= 0 && enemy.meshdata) {
      sceneInfo.player.pts += 100;
      enemy.death(sceneInfo, () => {
        // Dispose the parent mesh
        enemy.meshdata = false;
        setTimeout(() => {
          mesh.dispose();
        }, 1000); // Dispose the mesh after 1s when the death animation has finished
      })
    }
  }
}

function HandleControl(engine) {
  // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
  const pointerlockchange = function (evt) {
    const controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;
    // If the user is already locked
    if (!controlEnabled) {
      evt.target.activeElement.width = window.innerWidth;
      evt.target.activeElement.height = window.innerHeight;
      engine.exitPointerlock();
      engine.exitFullscreen();
    } 
  };

  // Attach events to the document
  document.addEventListener("pointerlockchange", pointerlockchange, false);
  document.addEventListener("mspointerlockchange", pointerlockchange, false);
  document.addEventListener("mozpointerlockchange", pointerlockchange, false);
  document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
}

function reload(sceneInfo) {
  const volume = options.settings.sound ? options.settings.soundPerc / 100 : 0;
  const reload = new Sound("reload", "./sounds/reload.mp3", sceneInfo.scene, null, {
    volume: volume,
  });

  onkeydown = ((event) => {
    if (event.code === "KeyR" && sceneInfo.player.magazines > 0 && sceneInfo.player.ammo < 30 && !isReloading) {
      gunanims.reload(sceneInfo.gun, sceneInfo.scene)
      isReloading = true;
      reload.play()
      reload.onended = (() => {
        if (sceneInfo.player.magazines + sceneInfo.player.ammo > 30) {
          sceneInfo.player.magazines -= 30 - sceneInfo.player.ammo;
          sceneInfo.player.ammo = 30;
        }
        else {
          sceneInfo.player.ammo += sceneInfo.player.magazines;
          sceneInfo.player.magazines = 0;
        }
        isReloading = false;
      })
    }
  })
}

const sceneBuilder = {
    createScene,
}

export default sceneBuilder;
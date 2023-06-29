import { Sound, Engine, Vector3, Ray } from "@babylonjs/core";
import { loadGunAsync } from "./gunMesh";
import { shotAnimation } from "./animations/gunShot";
import { setupCrosshair } from "./crosshair";
import { options } from "../../options";

async function loadAsync(scene, camera) {
    setupCrosshair();
    const gun = await loadGunAsync(scene);
    shot(scene, camera, gun.mesh)
}

function shot(scene, camera, gun) {
    let id;
    const volume = options.settings.sound ? options.settings.soundPerc / 100 : 0;
    const gunshot = new Sound("gunshot", "./sounds/ak_shot.mp3", scene, null, {
      volume: volume,
    });

    onmousedown = ((event) => {
      gunshot.setVolume(volume); // Or Engine.audioEngine.setGlobalVolume(volume); for global volume
      Engine.audioEngine.unlock();
      Engine.audioEngine.audioContext?.resume();
      // First shot
      checkShot(scene, camera, gun);
      gunshot.play();

      // Second shot (and sequent ones) after 75ms
      id = setInterval(()=>{
        checkShot(scene, camera, gun);
        gunshot.play();
        console.log("holding...")
      }, 100) // 600 rps for the ak47, -> 100 ms of delay between shots
    })
    onmouseup = () => {
      clearInterval(id)
      console.log("released...")
    }
}

function checkShot(scene, camera, gun) {
    const origin = camera.globalPosition.clone();
    const forward = camera.getDirection(Vector3.Forward());
    shotAnim(scene, camera, gun)

    if (camera.rotation.x > -0.30) {
      camera.rotation.x -= 0.02
    }

    const ray = new Ray(origin, forward, 200);
    
    const hit = scene.pickWithRay(ray, (mesh) => {
      return mesh.name.match(/^zombie+|Object_+/) !== null;
    });
    if (hit && hit.pickedMesh) {
      console.log(hit.pickedMesh)
      // Get the parent mesh node
      let mesh = hit.pickedMesh;
      while (mesh.parent !== null) {
        mesh = mesh.parent;
      }
      // Dispose the parent mesh
      mesh.dispose();
    }
}

function shotAnim(scene, camera, gun) {
    shotAnimation(scene, camera, gun)
}

const gun = {
    loadAsync
};

export default gun;
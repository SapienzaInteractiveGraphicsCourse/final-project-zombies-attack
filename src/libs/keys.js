import { Sound } from "@babylonjs/core";
import gunanims from "../models/gun/animations/gunReload";
import { options } from "../options";
import pause from "../HUD/pause";

function handleKeys(sceneInfo, engine) {
  const volume = options.settings.sound ? options.settings.soundPerc / 100 : 0;
  const reload = new Sound("reload", "./sounds/reload.mp3", sceneInfo.scene, null, {
    volume: volume,
  });
  const ammo_load = new Sound("ammo_load", "./sounds/ammo_load.mp3", sceneInfo.scene, null, {
    volume: volume,
  });

  onkeydown = ((event) => {
    console.log(event)
    if (event.code === "KeyR" && sceneInfo.player.magazines > 0 && ((sceneInfo.player.ammo < 30 && !sceneInfo.gun.isReloading && !sceneInfo.gun.isShooting) || (sceneInfo.player.ammo === 0 && !sceneInfo.gun.isReloading))) {
      gunanims.reload(sceneInfo.gun.mesh, sceneInfo.scene)
      sceneInfo.gun.isReloading = true;
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
        sceneInfo.gun.isReloading = false;
      })
    }
    else if (event.code === "KeyF" && sceneInfo.player.magazines < 210 && sceneInfo.ammoBox.isNear && !sceneInfo.gun.isReloading) {
      sceneInfo.player.magazines = 210;
      ammo_load.play()
    }
    else if (event.key === "Shift") {
      sceneInfo.camera.speed = 0.4;
    }
  })

  onkeyup = ((event) => {
    if (event.key === "Shift") {
      sceneInfo.camera.speed = 0.25;
    }
  })

  function isFullScreen() {
    console.log("Entered fullscreen")
  }
  
  function notFullScreen() {
    if (!sceneInfo.defeatHUD) {
      // Create the GUI for this scene
      const pauseHUD = pause.createHUD(sceneInfo, engine);
      sceneInfo.pauseHUD = pauseHUD;
    }
    document.querySelector("canvas").height = window.innerHeight;
    document.querySelector("canvas").width = window.innerWidth;
  }
  
  document.addEventListener("fullscreenchange", function() {
    if (document.fullscreen) {
        isFullScreen();
    } else {
        notFullScreen();
    }
  }, false);
    
  document.addEventListener("mozfullscreenchange", function() {
    if (document.mozFullScreen) {
        isFullScreen();
    } else {
        notFullScreen();
    }
  }, false);
    
  document.addEventListener("webkitfullscreenchange", function() {
    if (document.webkitIsFullScreen) {
        isFullScreen();
    } else {
        notFullScreen();
    }
  }, false);
}

const keys = {
    handleKeys
}

export default keys;
import {
    Scene,
    Vector3,
    MeshBuilder,
    UniversalCamera,
    MotionBlurPostProcess,
    HavokPlugin,
    PBRMaterial,
    Texture
} from "@babylonjs/core";
import HavokPhysics from "@babylonjs/havok"
import "@babylonjs/loaders";
import { options } from "../../options";
import hud from "../../HUD/HUD";
import { RoundSystem } from "../../libs/roundSystem";
import keys from "../../libs/keys";
import shadows from "../../libs/shadows";
import { RotationFromDegrees } from "../../libs/angles";

import gun from "../../models/gun/gun";
import enemy from "../../models/zombie/zombie";
import ammoBox from "../../models/ammoBox/ammoBox";
import building from "../../models/building/building";
import car1 from "../../models/car1/car1";
import car2 from "../../models/car2/car2";
import cars from "../../models/cars/cars";
import slide from "../../models/slide/slide";
import stall from "../../models/stall/stall";
import streetLamp from "../../models/streetLamp/streetLamp";
import barrier from "../../models/barrier/barrier";

  
async function createScene(canvas, engine) {
    const scene = new Scene(engine);
    scene.collisionsEnabled = true;
  
    const gravity = new Vector3(0, -10, 0);
    const hk = await HavokPhysics();
    const babylonPlugin =  new HavokPlugin(true, hk);
    scene.enablePhysics(gravity, babylonPlugin);
  
    scene.collisionsEnabled = true;
  
    const camera = createController(scene)

    if (options.settings.mb) {
        var motionblur = new MotionBlurPostProcess(
            "mb",   // The name of the effect.
            scene,  // The scene containing the objects to blur according to their velocity.
            1.0,    // The required width/height ratio to downsize to before computing the render pass.
            camera  // The camera to apply the render pass to.
        );
    }

    // Create the turn system for this battle
    const round = new RoundSystem();
  
    // Load all meshes
    await Promise.all([
        gun.loadAsync(scene, camera),
        enemy.loadAsync(scene),
        ammoBox.loadAsync(scene),
        building.loadAsync(scene),
        car1.loadAsync(scene),
        car2.loadAsync(scene),
        cars.loadAsync(scene),
        slide.loadAsync(scene),
        stall.loadAsync(scene),
        barrier.loadAsync(scene),
        streetLamp.loadAsync(scene)
       
    ]);

    building.addClone(new Vector3(-32.2, 0, 42.5), new Vector3(100, 100, 100), new Vector3(0, 0, 0),scene);
    building.addClone(new Vector3(32.2, 0, 42.5), new Vector3(100, 100, 100), new Vector3(0, 0, 0),scene);
    building.addClone(new Vector3(32.2, 0, -42.5), new Vector3(100, 100, 100), new Vector3(0, Math.PI, 0),scene);

    car1.addClone(new Vector3(20, 0, -10), new Vector3(0.015, 0.015, 0.015), new Vector3(0, 0, 0),scene);
    car2.addClone(new Vector3(-20, -1.5, -15), new Vector3(1.5, 1.5, 1.5), new Vector3(0, 0, 0),scene);

    for(var i=0; i<13; i++){
      barrier.addClone(new Vector3(-49.5, 0, -31.5 + 5.5 * i), new Vector3(2, 2, 2), new Vector3(0, Math.PI * 0.5, 0),scene)
    }
   for(var i=0; i<13; i++){
      barrier.addClone(new Vector3(49.5, 0, -31.5 + 5.5 * i), new Vector3(2, 2, 2), new Vector3(0, Math.PI * 0.5, 0),scene)
    }
    
    for(var i=0; i<5; i++) {
      barrier.addClone(new Vector3(-10.5 + 5.5 * i, 0,-49.5), new Vector3(2, 2 ,2), new Vector3(0, 0, 0),scene)
    }

    for(var i=0; i<5; i++) {
      barrier.addClone(new Vector3(-11.5+5.5*i, 0, 49.5), new Vector3(2, 2, 2), new Vector3(0, 0, 0),scene)
    }

    for(var i=0; i<6; i++) {
      streetLamp.addClone(new Vector3(40 - 15*i, 0, 30), new Vector3(0.01, 0.01, 0.01), new Vector3(0, Math.PI + Math.PI * 0.5, 0),scene)
    }

    for(var i=0; i<6; i++) {
      streetLamp.addClone(new Vector3(40 - 15*i, 0, -30), new Vector3(0.01, 0.01, 0.01), new Vector3(0, Math.PI - Math.PI * 0.5, 0),scene)
    }

    // For every mesh component, check collisions
    enemy.meshdata.meshes.forEach((mesh) => {
      mesh.checkCollisions = true;
    })
  
    const sceneInfo = {
      player: {
        hp: 100,
        pts: 0,
        ammo: 30,
        magazines: 210,
        round: 1
      },
      scene,
      enemy,
      camera,
      gun,
      round,
      ammoBox
    }

  scene.onPointerDown = (event) => {
    if (!sceneInfo.defeatHUD) {
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
  }

    // Have the turn system constantly watch for the condition to pass turn
    round.addRoundObserver(sceneInfo, engine);

    sceneInfo.ammoBox.mesh.position.z = -17;
    sceneInfo.scene.fogMode = Scene.FOGMODE_LINEAR;
    sceneInfo.scene.fogStart = 0.0;
    sceneInfo.scene.fogEnd = 100.0;

    enemy.sceneSpecificInit(sceneInfo);
    createEnvironment(sceneInfo)

    // Create the GUI for this scene
    var gameHUD = hud.createHUD(sceneInfo);
    sceneInfo.hud = gameHUD;
  
    gun.shot(sceneInfo)
    keys.handleKeys(sceneInfo, engine)
  
    ammoBox.float(ammoBox)
    scene.getAnimationGroupByName("float").play(true);
    createBounds(sceneInfo.scene)
  
    scene.loadedPromise = Promise.all([
      gameHUD.loadedPromise,
    ]);

    shadows.createDirectionalLight(scene, [
      enemy.meshdata.mesh,
      ...building.clones,
      ...barrier.clones,
      ...car1.clones,
      ...car2.clones,
      ...streetLamp.clones,
      car1.mesh,
      car2.mesh,
      cars.mesh,
      streetLamp.mesh,
      building.mesh,
      barrier.mesh,
      stall.mesh,
      slide.mesh,
      ammoBox.mesh
  ]);

    return scene;
}
  
async function createEnvironment(sceneInfo) {
    const ground = MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, sceneInfo.scene)
    ground.model = ground;
    ground.checkCollisions = true;
    ground.receiveShadows = true;

    const asphalt = createAsphalt(sceneInfo.scene);
    ground.material = asphalt;
}
  
function createController(scene) {
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

function createAsphalt(scene) {
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

function createBounds(scene) {
    const bound = MeshBuilder.CreateBox("boundMesh", {
      width: 100,
      height: 10,
      depth: 0.5
    }, scene);
    bound.position = new Vector3(0, 0, 50);
    bound.isVisible = false;
    bound.checkCollisions = true;
  
    for (let i = 0; i < 3; i++) {
      const boundClone = bound.clone(`boundClone_${i}`);
      if (i === 0) {
        boundClone.position = new Vector3(50, 0, 0);
        boundClone.rotation = RotationFromDegrees(0, 90, 0)
      }
      else if (i === 1) {
        boundClone.position = new Vector3(0, 0, -50);
      }
      else if (i === 2) {
        boundClone.position = new Vector3(-50, 0, 0);
        boundClone.rotation = RotationFromDegrees(0, 90, 0)
      }
    }
}

const map2Builder = {
    createScene,
}

export default map2Builder;
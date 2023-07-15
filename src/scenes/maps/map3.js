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

import enemy from "../../models/zombie/zombie";
import gun from "../../models/gun/gun";
import ammoBox from "../../models/ammoBox/ammoBox";
import cactus from "../../models/cactus/cactus";
import rocks from "../../models/rocks/rocks";


  
async function createScene(canvas, engine) {
    const scene = new Scene(engine);
    scene.collisionsEnabled = true;
  
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
        enemy.loadAsync(scene),
        cactus.loadAsync(scene, camera),
        rocks.loadAsync(scene , camera),
        gun.loadAsync(scene, camera),
        ammoBox.loadAsync(scene, camera),

    ]);

    //console.log(cactus.clones)

    for(var i=0; i<5; i++){
      
      var position = new Vector3(48  - 22*i, 0 , 43);
      var y = Math.floor(Math.random()*360);
      var rotation = RotationFromDegrees(0,y,0);

      cactus.addClone(position , new Vector3(1, 1, 1)  , rotation);
      
  }

  for(var i=0; i<3; i++){

    var position = new Vector3(43  - 34*i, 0 , 36);
    var y = Math.floor(Math.random()*360);
    var rotation = RotationFromDegrees(0,y,0);

    cactus.addClone(position , new Vector3(1, 1, 1)  , rotation);
  }

  for(var i=0; i<4; i++){

    var position = new Vector3(45 - 30*i, 0 , -6);
    var y = Math.floor(Math.random()*360);
    var rotation = RotationFromDegrees(0,y,0);

    cactus.addClone(position , new Vector3(1, 1, 1) , rotation);
  }

  for(var i=0; i<3; i++){

    var position = new Vector3(40 - 37*i, 0 , -10);
    var y = Math.floor(Math.random()*360);
    var rotation = RotationFromDegrees(0,y,0);

    cactus.addClone(position , new Vector3(1, 1, 1) , rotation);
  }

  for(var i=0; i<6; i++){

    var position = new Vector3(49  - 15*i, 0 , -30);
    var y = Math.floor(Math.random()*360);
    var rotation = RotationFromDegrees(0,y,0);

    cactus.addClone(position , new Vector3(1, 1, 1) , rotation);
  }

  for(var i=0; i<4; i++){

    var position = new Vector3(45 - 30*i, 0 , -46);
    var y = Math.floor(Math.random()*360);
    var rotation = RotationFromDegrees(0,y,0);

    cactus.addClone(position , new Vector3(1, 1, 1) , rotation);
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
        magazines: 210
      },
      scene,
      enemy,
      camera,
      gun,
      round,
      ammoBox
    }
    sceneInfo.camera.position = new Vector3 (0,2, -5);
    sceneInfo.enemy.meshdata.mesh.position=new Vector3 (0,0, -10);

    // Have the turn system constantly watch for the condition to pass turn
    round.addRoundObserver(sceneInfo);

    sceneInfo.ammoBox.mesh.position.z = -12;
    sceneInfo.scene.fogMode = Scene.FOGMODE_LINEAR;
    sceneInfo.scene.fogStart = 0.0;
    sceneInfo.scene.fogEnd = 100.0;

    enemy.sceneSpecificInit(sceneInfo);
    createEnvironment(sceneInfo)

    //shadows.createAmbientLight(scene);
    shadows.createDirectionalLight(scene, [
      enemy.meshdata.mesh,
      rocks.mesh,
      cactus.mesh,
      ...cactus.clones
    ]);

  
    // Create the GUI for this scene
    var gameHUD = hud.createHUD(sceneInfo);
    sceneInfo.hud = gameHUD;
  
    gun.shot(sceneInfo)
    keys.handleKeys(sceneInfo)
  
    ammoBox.float(ammoBox)
    scene.getAnimationGroupByName("float").play(true);
    createBounds(sceneInfo.scene)
  
    scene.loadedPromise = Promise.all([
      gameHUD.loadedPromise,
    ]);
  
    return scene;
}
  
async function createEnvironment(sceneInfo) {
    const ground = MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, sceneInfo.scene)
    ground.model = ground;
    ground.checkCollisions = true;
    ground.receiveShadows = true;

    const sand = CreateSand(sceneInfo.scene);
    ground.material = sand;
}
  
function createController(scene) {
    const camera = new UniversalCamera("UniversalCamera", new Vector3(1, 2, 1), scene);
    camera.setTarget(new Vector3(0, 2, 0));

    camera.attachControl()
    camera.speed = 0.25 //0.25

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

function CreateSand(scene) {
  const pbr = new PBRMaterial('pbr', scene)
  pbr.albedoTexture = new Texture('./textures/sand/sand2_diffuse.jpg', scene)

  pbr.bumpTexture = new Texture('./textures/sand/sand2_normal.jpg', scene)
  pbr.invertNormalMapX = true
  pbr.invertNormalMapY = true

  pbr.useAmbientOcclusionFromMetallicTextureRed = true
  pbr.useRoughnessFromMetallicTextureGreen = true
  pbr.useMetallnessFromMetallicTextureBlue = true

  pbr.metallicTexture = new Texture('./textures/sand/sand2_ao.jpg', scene)

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

  
const map3Builder = {
    createScene,
}

export default map3Builder;
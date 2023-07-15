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
import fence from "../../models/fence/fence";
import tomb1 from "../../models/tomb1/tomb1";
import tomb2 from "../../models/tomb2/tomb2";
import mausoleum from "../../models/mausoleum/mausoleum";
import statue from "../../models/statue/statue";
import centergraves from "../../models/centergraves/centergraves";
import grass from "../../models/grass/grass";
import trees1 from "../../models/trees1/trees1";
import trees2 from "../../models/trees2/trees2";
import tree from "../../models/tree/tree";

  
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
        gun.loadAsync(scene, camera),
        enemy.loadAsync(scene),
        ammoBox.loadAsync(scene),
        fence.loadAsync(scene),
        tomb1.loadAsync(scene),
        tomb2.loadAsync(scene),
        mausoleum.loadAsync(scene),
        statue.loadAsync(scene),
        centergraves.loadAsync(scene),
        grass.loadAsync(scene),
        trees1.loadAsync(scene),
        trees2.loadAsync(scene),
        tree.loadAsync(scene)
    ]);
  
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

    // Have the turn system constantly watch for the condition to pass turn
    round.addRoundObserver(sceneInfo);

    sceneInfo.ammoBox.mesh.position.z = -17;
    sceneInfo.scene.fogMode = Scene.FOGMODE_LINEAR;
    sceneInfo.scene.fogStart = 0.0;
    sceneInfo.scene.fogEnd = 100.0;

    enemy.sceneSpecificInit(sceneInfo);
    createEnvironment(sceneInfo)

    createInvWalls(sceneInfo.scene)
  
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

    tomb1.addClone(new Vector3(38, 0.2, -15), new Vector3(0.003, 0.003, 0.003), new Vector3(0, Math.PI * 0.8, 0));
    tomb1.addClone(new Vector3(39, 0.2, -30), new Vector3(0.003, 0.003, 0.003), new Vector3(0, Math.PI * 0.76, 0));
    tomb1.addClone(new Vector3(31, 0.2, -21), new Vector3(0.003, 0.003, 0.003), new Vector3(0, -Math.PI * 0.87, 0));
    tomb1.addClone(new Vector3(39, 0.2, -27), new Vector3(0.003, 0.003, 0.003), new Vector3(0, Math.PI * 0.87, 0));
    tomb1.addClone(new Vector3(36, 0.2, -24), new Vector3(0.003, 0.003, 0.003), new Vector3(0, Math.PI * 0.7, 0));
    tomb1.addClone(new Vector3(-38, 0.2, -20), new Vector3(0.003, 0.003, 0.003), new Vector3(0, 0, 0));
    tomb1.addClone(new Vector3(-36, 0.2, -30), new Vector3(0.003, 0.003, 0.003), new Vector3(0, Math.PI * 0.16, 0));
    tomb1.addClone(new Vector3(-45, 0.2, -15), new Vector3(0.003, 0.003, 0.003), new Vector3(0, -Math.PI * 0.27, 0));
    tomb1.addClone(new Vector3(-35, 0.2, -27), new Vector3(0.003, 0.003, 0.003), new Vector3(0, Math.PI * 0.27, 0));
    tomb1.addClone(new Vector3(-36, 0.2 , -20), new Vector3(0.003, 0.003, 0.003), new Vector3(0, Math.PI * 0.47, 0));

    tomb2.addClone(new Vector3(-45, 0.2, -15), new Vector3(0.003, 0.003, 0.003), new Vector3(0, Math.PI * 0.8, 0));
    tomb2.addClone(new Vector3(-39 , 0.2 , -10), new Vector3(0.003, 0.003, 0.003), new Vector3(0, Math.PI * 0.8, 0));
    tomb2.addClone(new Vector3(-39, 0.2, -30), new Vector3(0.003, 0.003, 0.003), new Vector3(0, Math.PI * 0.8, 0));

    trees1.addClone(new Vector3(45, 0.3, -30), new Vector3(0.015, 0.015, 0.015), new Vector3(0,  Math.PI * 0.4, 0));
    trees1.addClone(new Vector3(-20, 0.3, -40), new Vector3(0.015, 0.015, 0.015), new Vector3(0, 0, 0));
    trees1.addClone(new Vector3(20 , 0.3, -40), new Vector3(0.015, 0.015, 0.015), new Vector3(0, 0, 0));
    trees1.addClone(new Vector3(-45, 0.3, -10), new Vector3(0.015, 0.015, 0.015), new Vector3(0, -Math.PI * 0.4, 0));
    trees1.addClone(new Vector3(-45, 0.3, -30), new Vector3(0.015, 0.015, 0.015), new Vector3(0, -Math.PI * 0.5, 0));

    trees2.addClone(new Vector3(-43 , 0.3, -43), new Vector3(0.005 , 0.005, 0.005), new Vector3(0, Math.PI*0.5, Math.PI * 0.008));
    trees2.addClone(new Vector3(-38 , 0.3, -24), new Vector3(0.005 , 0.005, 0.005), new Vector3(0, Math.PI*0.2, Math.PI * 0.008));
    trees2.addClone(new Vector3(40 , 0.3, -31), new Vector3(0.005 , 0.005, 0.005), new Vector3(0, -Math.PI * 0.6, Math.PI * 0.008));

    tree.addClone(new Vector3(44 , 0.2, -42), new Vector3(0.017 , 0.017, 0.017), new Vector3(-Math.PI * 0.05, Math.PI * 0.5, 0));
  

    statue.addClone(new Vector3(-8.5, 1.8, -46), new Vector3(3, 3, 3), new Vector3(0, 0, 0));

    for(var i = 1 ; i < 7 ; i++){
        if (i !== 1) {
          fence.addClone(new Vector3(-2+(8*i), 2, 0), new Vector3(4, 4, 4));
        }
        
        fence.addClone(new Vector3(-(-2+(8*i)), 2, 0), new Vector3(4, 4, 4));

        fence.addClone(new Vector3(49.4, 2, -(-3.2+8*i)), new Vector3(4, 4, 4), new Vector3(0, Math.PI * 0.5, 0));

        fence.addClone(new Vector3(-49.4, 2, -(-3.2+8*i)), new Vector3(4, 4, 4), new Vector3(0, Math.PI * 0.5, 0));

        fence.addClone(new Vector3(-2+(8*i), 2, -49), new Vector3(4, 4, 4));

        fence.addClone(new Vector3(2-(8*i), 2, -49), new Vector3(4, 4, 4));
    }

    shadows.createDirectionalLight(scene, [
      enemy.meshdata.mesh,
      ...tomb1.clones,
      ...tomb2.clones,
      ...trees1.clones,
      ...tree.clones,
      ...trees2.clones,
      ...statue.clones,
      ...fence.clones,
      tomb1.mesh,
      tomb2.mesh,
      trees1.mesh,
      tree.mesh,
      trees2.mesh,
      statue.mesh,
      fence.mesh
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

function createInvWalls(scene) {
  const walls = [
    {
      width: 57,
      height: 10,
      depth: 0.5,
      position: new Vector3(-2, 0, -34),
      rotation: RotationFromDegrees(0, 0, 0)
    },
    {
      width: 34,
      height: 10,
      depth: 0.5,
      position: new Vector3(-30.5, 0, -17),
      rotation: RotationFromDegrees(0, 90, 0)
    },
    {
      width: 34,
      height: 10,
      depth: 0.5,
      position: new Vector3(26.5, 0, -17),
      rotation: RotationFromDegrees(0, 90, 0)
    }
  ]
  
  for (const wall of walls) {
    const bound = MeshBuilder.CreateBox("invWall", {
      width: wall.width,
      height: wall.height,
      depth: wall.depth
    }, scene);
    bound.position = wall.position;
    bound.rotation = wall.rotation;
    bound.isVisible = false;
    bound.checkCollisions = true;
  }
}
  
const map1Builder = {
    createScene,
}

export default map1Builder;
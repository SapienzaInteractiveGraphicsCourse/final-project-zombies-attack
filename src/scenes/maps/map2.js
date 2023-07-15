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
        building.loadAsync(scene),
        car1.loadAsync(scene),
        car2.loadAsync(scene),
        cars.loadAsync(scene),
        slide.loadAsync(scene),
        stall.loadAsync(scene),
        barrier.loadAsync(scene),
        streetLamp.loadAsync(scene)
       
    ]);


    building.addClone(new Vector3(-32.2,0,42.5), new Vector3(100,100,100), new Vector3(0, 0, 0),scene);
    building.addClone(new Vector3(32.2,0,42.5), new Vector3(100,100,100), new Vector3(0, 0, 0),scene);
    building.addClone(new Vector3(32.2,0,-42.5), new Vector3(100,100,100), new Vector3(0, Math.PI, 0),scene);

    car1.addClone(new Vector3(20 , 0 , -10), new Vector3(0.015 , 0.015, 0.015), new Vector3(0, 0, 0),scene);
    car2.addClone(new Vector3(-20 , -1.5 , -15), new Vector3(1.5 , 1.5, 1.5), new Vector3(0, 0, 0),scene);



    for(var i=0; i<13; i++){
      barrier.addClone(new Vector3(-49.5 , 0 , -31.5+5.5*i), new Vector3(2,2,2), new Vector3(0, Math.PI*0.5, 0),scene)
    }
   for(var i=0; i<13; i++){
      barrier.addClone(new Vector3(49.5 , 0 , -31.5+5.5*i), new Vector3(2,2,2), new Vector3(0, Math.PI*0.5, 0),scene)
    }
    
    for(var i=0; i<5; i++) {
      barrier.addClone(new Vector3(-10.5+5.5*i , 0 ,-49.5), new Vector3(2,2,2), new Vector3(0, 0, 0),scene)
    }

    for(var i=0; i<5; i++) {
      barrier.addClone(new Vector3(-11.5+5.5*i , 0 ,49.5), new Vector3(2,2,2), new Vector3(0, 0, 0),scene)
    }

    for(var i=0; i<6; i++) {
      streetLamp.addClone(new Vector3(40 - 15*i , 0 , 30), new Vector3(0.01 , 0.01, 0.01), new Vector3(0, Math.PI+ Math.PI*0.5, 0),scene)
    }

    for(var i=0; i<6; i++) {
      streetLamp.addClone(new Vector3(40 - 15*i , 0 , -30), new Vector3(0.01 , 0.01, 0.01), new Vector3(0, Math.PI - Math.PI*0.5, 0),scene)
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

    // Have the turn system constantly watch for the condition to pass turn
    round.addRoundObserver(sceneInfo);

    sceneInfo.ammoBox.mesh.position.z = -17;
    sceneInfo.scene.fogMode = Scene.FOGMODE_LINEAR;
    sceneInfo.scene.fogStart = 0.0;
    sceneInfo.scene.fogEnd = 100.0;

    enemy.sceneSpecificInit(sceneInfo);
    createEnvironment(sceneInfo)

    createInvWalls(sceneInfo.scene)

    shadows.createAmbientLight(scene);
    shadows.createDirectionalLight(scene, [
        enemy.meshdata.mesh
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

    /* const tomb1Clone = tomb1.mesh.clone("tomb11");
    tomb1Clone.position = new Vector3(38, 0.2, -15);
    tomb1Clone.scaling = new Vector3(0.003, 0.003, 0.003);
    tomb1Clone.rotation = new Vector3(0, Math.PI * 0.8, 0);
  
    const tomb1Clone1= tomb1.mesh.clone("tomb12");
    tomb1Clone1.position = new Vector3(39, 0.2, -30);
    tomb1Clone1.scaling = new Vector3(0.003, 0.003, 0.003);
    tomb1Clone1.rotation = new Vector3(0, Math.PI * 0.76, 0);
  
    const tomb1Clone2 = tomb1.mesh.clone("tomb13");
    tomb1Clone2.position = new Vector3(31, 0.2, -21);
    tomb1Clone2.scaling = new Vector3(0.003, 0.003, 0.003);
    tomb1Clone2.rotation = new Vector3(0, -Math.PI * 0.87, 0);
  
    const tomb1Clone4 = tomb1.mesh.clone("tomb14");
    tomb1Clone4.position = new Vector3(39, 0.2, -27);
    tomb1Clone4.scaling = new Vector3(0.003, 0.003, 0.003);
    tomb1Clone4.rotation = new Vector3(0, Math.PI * 0.87, 0);
  
    const tomb1Clone5 = tomb1.mesh.clone("tomb15");
    tomb1Clone5.position = new Vector3(36, 0.2, -24);
    tomb1Clone5.scaling = new Vector3(0.003, 0.003, 0.003);
    tomb1Clone5.rotation = new Vector3(0, Math.PI * 0.7, 0);
  
    const tomb1Clone20 = tomb1.mesh.clone("tomb12");
    tomb1Clone20.position = new Vector3(-38, 0.2, -20);
    tomb1Clone20.scaling = new Vector3(0.003, 0.003, 0.003);
    tomb1Clone20.rotation = new Vector3(0, 0, 0);
  
    const tomb1Clone21= tomb1.mesh.clone("tomb12");
    tomb1Clone21.position = new Vector3(-36, 0.2, -30);
    tomb1Clone21.scaling = new Vector3(0.003 , 0.003 , 0.003);
    tomb1Clone21.rotation = new Vector3( 0 , Math.PI * 0.16 , 0);
  
    const tomb1Clone22 = tomb1.mesh.clone("tomb13");
    tomb1Clone22.position = new Vector3(-45, 0.2, -15);
    tomb1Clone22.scaling = new Vector3(0.003, 0.003, 0.003);
    tomb1Clone22.rotation = new Vector3(0, -Math.PI * 0.27, 0);
  
    const tomb1Clone24 = tomb1.mesh.clone("tomb14");
    tomb1Clone24.position = new Vector3(-35, 0.2, -27);
    tomb1Clone24.scaling = new Vector3(0.003, 0.003, 0.003);
    tomb1Clone24.rotation = new Vector3(0, Math.PI * 0.27, 0);
  
    const tomb1Clone25 = tomb1.mesh.clone("tomb15");
    tomb1Clone25.position = new Vector3(-36, 0.2 , -20);
    tomb1Clone25.scaling = new Vector3(0.003, 0.003, 0.003);
    tomb1Clone25.rotation = new Vector3(0, Math.PI * 0.47, 0);

    const tomb2Clone = tomb2.mesh.clone("tomb2");
    tomb2Clone.position = new Vector3(39 , 0.2 , -17);
    tomb2Clone.scaling = new Vector3(0.003 , 0.003 , 0.003);
    tomb2Clone.rotation = new Vector3( 0 , Math.PI*0.8 , 0);
  
  
    const tomb2Clone21 = tomb2.mesh.clone("tomb2");
    tomb2Clone21.position = new Vector3(-39 , 0.2 , -10);
    tomb2Clone21.scaling = new Vector3(0.003 , 0.003 , 0.003);
    tomb2Clone21.rotation = new Vector3( 0 , Math.PI*0.8 , 0);
  
    const tomb2Clone22 = tomb2.mesh.clone("tomb2");
    tomb2Clone22.position = new Vector3(-39 , 0.2 , -30);
    tomb2Clone22.scaling = new Vector3(0.003 , 0.003 , 0.003);
    tomb2Clone22.rotation = new Vector3( 0 , Math.PI*0.8 , 0);

    const treesClone2 = trees1.mesh.clone("treesClone2");
    treesClone2.position = new Vector3(45 , 0.3, -30); 
    treesClone2.scaling = new Vector3(0.015 , 0.015, 0.015);
    treesClone2.rotation = new Vector3( 0 ,  Math.PI*0.4 , 0);
  
    const treesClone3 = trees1.mesh.clone("treesClone2");
    treesClone3.position = new Vector3(20 , 0.3, -40); 
    treesClone3.scaling = new Vector3(0.015 , 0.015, 0.015);
    treesClone3.rotation = new Vector3( 0 ,  0 , 0);
  
    const treesClone21 = trees1.mesh.clone("treesClone2");
    treesClone21.position = new Vector3(-45 , 0.3, -10); 
    treesClone21.scaling = new Vector3(0.015 , 0.015, 0.015);
    treesClone21.rotation = new Vector3( 0 ,  -Math.PI*0.4 , 0);
  
    const treesClone22 = trees1.mesh.clone("treesClone2");
    treesClone22.position = new Vector3(-45 , 0.3, -30); 
    treesClone22.scaling = new Vector3(0.015 , 0.015, 0.015);
    treesClone22.rotation = new Vector3( 0 ,  -Math.PI*0.5 , 0);
  
    const treesClone23 = trees1.mesh.clone("treesClone2");
    treesClone23.position = new Vector3(-20 , 0.3, -40); 
    treesClone23.scaling = new Vector3(0.015 , 0.015, 0.015);
    treesClone23.rotation = new Vector3( 0 ,  0 , 0);

    const trees2Clone = trees2.mesh.clone("trees2clone");
    trees2Clone.position = new Vector3(40 , 0.3, -31);
    trees2Clone.scaling = new Vector3(0.005 , 0.005, 0.005);
    trees2Clone.rotation = new Vector3( 0 ,  -Math.PI*0.6 , Math.PI*0.008);
  
    const trees2Clone21 = trees2.mesh.clone("trees2clone");
    trees2Clone21.position = new Vector3(-43 , 0.3, -43);
    trees2Clone21.scaling = new Vector3(0.005 , 0.005, 0.005);
    trees2Clone21.rotation = new Vector3( 0 ,  Math.PI*0.5 , Math.PI*0.008);
  
    const trees2Clone22 = trees2.mesh.clone("trees2clone");
    trees2Clone22.position = new Vector3(-38 , 0.3, -24);
    trees2Clone22.scaling = new Vector3(0.005 , 0.005, 0.005);
    trees2Clone22.rotation = new Vector3( 0 ,  Math.PI*0.2 , Math.PI*0.008);

    const treeClone = tree.mesh.clone ("treeclone");
    treeClone.position = new Vector3(44 , 0.2, -42);
    treeClone.scaling = new Vector3(0.017 , 0.017, 0.017);
    treeClone.rotation = new Vector3( -Math.PI*0.05 ,  Math.PI*0.5 , 0);

    for(var i = 1 ; i < 7 ; i++){
        if (i !== 1) {
          const fenceClone = fence.meshes[0].clone("fenceClone");
          fenceClone.position = new Vector3(-2+(8*i) , 2 , 0);
          fenceClone.scaling = new Vector3(4 , 4 , 4);
    
          const fencewallClone = fence.meshes[8].clone("fencewallClone");
          fencewallClone.position = fenceClone.position
          fencewallClone.scaling = fenceClone.scaling
        }
    
        const fenceClone1 = fence.meshes[0].clone("fencewallClone1");
        fenceClone1.position = new Vector3(-(-2+(8*i)) , 2 , 0);
        fenceClone1.scaling = new Vector3(4 , 4 , 4);
    
        const fencewallClone1 = fence.meshes[8].clone("fencewallClone1");
        fencewallClone1.position = fenceClone1.position;
        fencewallClone1.scaling = fenceClone1.scaling;
    
        const fenceClone2 = fence.meshes[0].clone("fencewallClone2");
        fenceClone2.position = new Vector3(49.4 , 2 , -(-3.2+8*i));
        fenceClone2.scaling = new Vector3(4 , 4 , 4);
        fenceClone2.rotation = new Vector3( 0 ,  Math.PI*0.5 , 0);
        
        const fencewallClone2 = fence.meshes[8].clone("fencewallClone2");
        fencewallClone2.position = fenceClone2.position;
        fencewallClone2.scaling = fenceClone2.scaling;
        fencewallClone2.rotation = fenceClone2.rotation;
    
        const fenceClone3 = fence.meshes[0].clone("fenceClone3");
        fenceClone3.position = new Vector3(-49.4 , 2 , -(-3.2+8*i));
        fenceClone3.scaling = new Vector3(4 , 4 , 4);
        fenceClone3.rotation = new Vector3( 0 ,  Math.PI*0.5 , 0);
    
        const fencewallClone3 = fence.meshes[8].clone("fencewallClone3");
        fencewallClone3.position = fenceClone3.position;
        fencewallClone3.scaling = fenceClone3.scaling;
        fencewallClone3.rotation = fenceClone3.rotation ;
    
        const fenceClone4 = fence.meshes[0].clone("fenceClone4");
        fenceClone4.position = new Vector3(-2+(8*i) , 2 , -49);
        fenceClone4.scaling = new Vector3(4 , 4 , 4);
    
        const fencewallClone4 = fence.meshes[8].clone("fencewallClone4");
        fencewallClone4.position = fenceClone4.position;
        fencewallClone4.scaling = fenceClone4.scaling;
    
        const fenceClone5 = fence.meshes[0].clone("fenceClone5");
        fenceClone5.position = new Vector3(2-(8*i) , 2 , -49);
        fenceClone5.scaling = new Vector3(4 , 4 , 4);
    
        const fencewallClone5 = fence.meshes[8].clone("fencewallClone5");
        fencewallClone5.position = fenceClone5.position;
        fencewallClone5.scaling = fenceClone5.scaling;
    } */

    return scene;
}
  
async function createEnvironment(sceneInfo) {
    const ground = MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, sceneInfo.scene)
    ground.model = ground;
    ground.checkCollisions = true;

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
       /* {
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
      }  */
    ] 
    
    /* for (const wall of walls) {
      const bound = MeshBuilder.CreateBox("invWall", {
        width: wall.width,
        height: wall.height,
        depth: wall.depth
      }, scene);
      bound.position = wall.position;
      bound.rotation = wall.rotation;
      bound.isVisible = true;
      bound.checkCollisions = true;
    } */
  }
  
const map2Builder = {
    createScene,
}

export default map2Builder;
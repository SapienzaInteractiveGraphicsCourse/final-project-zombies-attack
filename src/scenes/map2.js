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
    Quaternion,
    MotionBlurPostProcess
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

async function map2(scene){

    /* const ground = MeshBuilder.CreateGround('ground', { width: 100, height: 50.5}, scene)

    ground.material = CreateGrass(scene)
  
     ground.model = ground;

    ground.checkCollisions = true; */
    
    const building = await LoadBuilding(scene);

    var flag = false;
    
    for(var i = 0 ; i < 2 ; i++){
        for(var j=0; j<2; j++) {
            const buildingClone = building.clone("buildingClone");
            buildingClone.position = new Vector3(-32.5 + (65*j) , 0 , -42.5 + 85*i);
            if (flag == true){
                buildingClone.rotation = RotationFromDegrees(0,0,0);
            }
            
            if(j==1){
                flag = true;
            }
        }
    }
    //await Loadstreet(scene);

    const cars = await LoadCars(scene);
    var carsy = Math.floor(Math.random()*360);
    cars.rotation = RotationFromDegrees(0,carsy,0);


    const car1 = await LoadCar1(scene);
    var cary1 = Math.floor(Math.random()*360);
    car1.rotation = RotationFromDegrees(0,cary1,0);


    const car2 = await LoadCar2(scene);
    var cary2 = Math.floor(Math.random()*360);
    car2.rotation = RotationFromDegrees(0,cary2,0);


    const car1Clone = car1.clone("car1Clone");
    car1Clone.position = new Vector3(30 , 0 , -10);
    var car1y = Math.floor(Math.random()*360);
    car1Clone.rotation = RotationFromDegrees(0,car1y,0);


    const car2Clone = car2.clone("car2Clone");
    car2Clone.position = new Vector3(-25 , -1.5 , -15);
    var car2y = Math.floor(Math.random()*360);
    car2Clone.rotation = RotationFromDegrees(0,car2y,0);

    
    

    await LoadStall(scene);
    
    await LoadSlide(scene); 

    const barrier = await LoadBarrier(scene);
    barrier.rotation = RotationFromDegrees(0,90,0);

    for (var i = 0; i< 6; i++){
        const barrierClone = barrier.clone("barrierClone");
        barrierClone.rotation = RotationFromDegrees(0,90,0);
        barrierClone.position = new Vector3(-49.5 , 0 , -31.5 + 5.5*i);
    }
    for (var i = 0; i< 5; i++){
        const barrierClone = barrier.clone("barrierClone");
        barrierClone.rotation = RotationFromDegrees(0,90,0);
        barrierClone.position = new Vector3(-49.5 , 0 , 10 + 5.5*i);
    }

    for (var i = 0; i< 6; i++){
        const barrierClone = barrier.clone("barrierClone");
        barrierClone.rotation = RotationFromDegrees(0,90,0);
        barrierClone.position = new Vector3(49.5 , 0 , -31.5 + 5.5*i);
    }
    for (var i = 0; i< 5; i++){
        const barrierClone = barrier.clone("barrierClone");
        barrierClone.rotation = RotationFromDegrees(0,90,0);
        barrierClone.position = new Vector3(49.5 , 0 , 10 + 5.5*i);
    }

    for (var i = 0; i< 1; i++){
        const barrierClone = barrier.clone("barrierClone");
        barrierClone.rotation = RotationFromDegrees(0,180,0);
        barrierClone.position = new Vector3(11 - 5.5*i , 0 , 49.5);
    }

    for (var i = 0; i< 1; i++){
        const barrierClone = barrier.clone("barrierClone");
        barrierClone.rotation = RotationFromDegrees(0,180,0);
        barrierClone.position = new Vector3(-12 - 5.5*i , 0 , 49.5);
    }
    

    for (var i = 0; i< 1; i++){
        const barrierClone = barrier.clone("barrierClone");
        barrierClone.rotation = RotationFromDegrees(0,180,0);
        barrierClone.position = new Vector3(12 - 5.5*i , 0 , -49.5);
    }

    for (var i = 0; i< 1; i++){
        const barrierClone = barrier.clone("barrierClone");
        barrierClone.rotation = RotationFromDegrees(0,180,0);
        barrierClone.position = new Vector3(-11 - 5.5*i , 0 , -49.5);
    }
    
    
    
     

    const lamp = await LoadStreetLamps(scene);
    lamp.rotation = RotationFromDegrees(0,270,0);


    for (var i = 0; i<6; i++) {
        const lampClone = lamp.clone("lampClone")
        lampClone.rotation = RotationFromDegrees(0,90,0);
        lampClone.position = new Vector3(40 - 15*i,0,-30);
    }

    for (var i = 0; i<6; i++) {
        const lampClone = lamp.clone("lampClone")
        lampClone.rotation = RotationFromDegrees(0,270,0);
        lampClone.position = new Vector3(40 - 15*i,0, 30);
    }
    
    
    

    const envTex = CubeTexture.CreateFromPrefilteredData('./environment/sky.env', scene)
    scene.environmentTexture = envTex

    scene.createDefaultSkybox(envTex, true)
  
  }

async function LoadBuilding(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "building.glb", scene);
    const building = meshes[0];
    building.scaling = new Vector3(100 , 100, 100);
    building.position = new Vector3(-32.5 , 0 , -42.5);

    return building
}

/* async function Loadstreet(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "asphalt.glb", scene);
    const street = meshes[0];
    street.scaling = new Vector3(0.623 , 0.1, 0.5);
    street.position = new Vector3(18.01 , 0 , -12.2);

    if(options.settings.shadows){
        street.receiveShadows = true;
      }

    return street
} */

async function LoadCar1(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "car1.glb", scene);
    const cars = meshes[0];
    cars.scaling = new Vector3(0.015 , 0.015, 0.015);
    cars.position = new Vector3(-20 , 0 , 10);
    cars.rotation = RotationFromDegrees(0,90,0);

    return cars
}

async function LoadCar2(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "car2.glb", scene);
    const car2 = meshes[0];
    car2.scaling = new Vector3(1.5 , 1.5, 1.5);
    car2.position = new Vector3(20 , -1.5 , 15);
    car2.rotation = RotationFromDegrees(0,0,0);

    return car2
}

async function LoadCars(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "cars.glb", scene);
    const cars = meshes[0];
    cars.scaling = new Vector3(1.1 , 1.1, 1.1);
    cars.position = new Vector3(0 , 0 , 0);
    cars.rotation = RotationFromDegrees(0,0,0);

    return cars
}

async function LoadStall(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "stall.glb", scene);
    const stall = meshes[0];
    stall.scaling = new Vector3(0.02 , 0.02, 0.02);
    stall.position = new Vector3(0 , 0 , 40);
    //cars.rotation = RotationFromDegrees(0,0,0);

    return stall
}

async function LoadSlide(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "scene.glb", scene);
    const slide = meshes[0];
    slide.scaling = new Vector3(2 , 2, 2);
    slide.position = new Vector3(3 , 0 , -42);
    slide.rotation = RotationFromDegrees(0,90,0);

    return slide
}



async function LoadBarrier(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "barrier.glb", scene);
    const barrier = meshes[0];
    barrier.scaling = new Vector3(2, 2, 2);
    barrier.position = new Vector3(-49.5 , 0 , -31.5);

    return barrier
}

async function LoadStreetLamps(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "streetLamp.glb", scene);
    const lamp = meshes[0];
    lamp.scaling = new Vector3(0.01 , 0.01, 0.01);
    lamp.position = new Vector3(40 , 0 , 30);

    return lamp
}

  


  function CreateGrass(scene) {
    const pbr = new PBRMaterial('pbr', scene)
    pbr.albedoTexture = new Texture('./textures/grass/grass_diffuse.jpg', scene)
  
    pbr.bumpTexture = new Texture('./textures/grass/grass_normal.jpg', scene)
    pbr.invertNormalMapX = true
    pbr.invertNormalMapY = true
  
    pbr.useAmbientOcclusionFromMetallicTextureRed = true
    pbr.useRoughnessFromMetallicTextureGreen = true
    pbr.useMetallnessFromMetallicTextureBlue = true
  
    pbr.metallicTexture = new Texture('./textures/grass/grass_ao.jpg', scene)
  
    return pbr
  }


  const map2Builder = {
    map2,
  }

  export default map2Builder
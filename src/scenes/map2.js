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

    const ground = MeshBuilder.CreateGround('ground', { width: 100, height: 50.5}, scene)

    ground.material = CreateGrass(scene)
  
     ground.model = ground;

    ground.checkCollisions = true;
    
    const building = await LoadAbandonedBuilding(scene);
    await Loadstreet(scene);

    await LoadCars(scene);

    await LoadCar1(scene);

    await LoadCar2(scene);

    await LoadStall(scene);
    
    await LoadSlide(scene);    
    
    
    var flag = false;
    
    for(var i = 0 ; i < 2 ; i++){
        for(var j=0; j<2; j++) {
            const buildingClone = building.clone("buildingClone");
            buildingClone.position = new Vector3(-30 + (50*j) , 0 , -17.5 + 35.25*i);
            if (flag == true){
                buildingClone.rotation = RotationFromDegrees(0,0,0);
            }
            
            if(j==1){
                flag = true;
            }
        }
    }
    
    

    const envTex = CubeTexture.CreateFromPrefilteredData('./environment/sky.env', scene)
    scene.environmentTexture = envTex

    scene.createDefaultSkybox(envTex, true)
  
  }

async function LoadAbandonedBuilding(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "building.glb", scene);
    const building = meshes[0];
    building.scaling = new Vector3(100 , 100, 100);
    building.position = new Vector3(-30 , 0 , -17.5);
    
    return building
}

async function Loadstreet(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "asphalt.glb", scene);
    const street = meshes[0];
    street.scaling = new Vector3(0.623 , 0.1, 0.5);
    street.position = new Vector3(18.01 , 0 , -12.2);
    
    return street
}

async function LoadCar1(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "car1.glb", scene);
    const cars = meshes[0];
    cars.scaling = new Vector3(0.015 , 0.015, 0.015);
    cars.position = new Vector3(-20 , 0 , 3);
    cars.rotation = RotationFromDegrees(0,90,0);
    return cars
}


async function LoadCar2(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "car2.glb", scene);
    const cars = meshes[0];
    cars.scaling = new Vector3(1.5 , 1.5, 1.5);
    cars.position = new Vector3(20 , -1.5 , -3);
    cars.rotation = RotationFromDegrees(0,0,0);
    
    return cars
}

async function LoadCars(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "cars.glb", scene);
    const cars = meshes[0];
    cars.scaling = new Vector3(1.1 , 1.1, 1.1);
    cars.position = new Vector3(0 , 0 , 0);
    cars.rotation = RotationFromDegrees(0,90,0);

    
    
    return cars
}

async function LoadStall(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "stall.glb", scene);
    const stall = meshes[0];
    stall.scaling = new Vector3(0.02 , 0.02, 0.02);
    stall.position = new Vector3(-5 , 0 , 16);
    //cars.rotation = RotationFromDegrees(0,0,0);

    
    return stall
}

async function LoadSlide(scene) {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "scene.glb", scene);
    const slide = meshes[0];
    slide.scaling = new Vector3(2 , 2, 2);
    slide.position = new Vector3(-2 , 0 , -17);
    slide.rotation = RotationFromDegrees(0,90,0);


    return slide
}


  
  const map2Builder = {
    map2,
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

  export default map2Builder
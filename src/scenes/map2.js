import {
    Vector3,
    CubeTexture,
    SceneLoader,
    DirectionalLight,
    ShadowGenerator
} from "@babylonjs/core";
import "@babylonjs/loaders";
import { options } from "../options";
import { RotationFromDegrees} from "../libs/angles";

let map2Shadows;

async function map2(scene, enemy){
    const envTex = CubeTexture.CreateFromPrefilteredData('./environment/sky.env', scene)
    scene.environmentTexture = envTex 
  
    scene.createDefaultSkybox(envTex, true)

    const light = new DirectionalLight("dir01", new Vector3(-1, -2, -1), scene);
    light.position = new Vector3(20, 40, 20);
    light.intensity = 1.8;

    const building = await LoadBuilding(scene);

    const stall = await LoadStall(scene);
    
    const slide = await LoadSlide(scene);  

    const cars = await LoadCars(scene);

    const car1 = await LoadCar1(scene);

    const car2 = await LoadCar2(scene);

    const barrier = await LoadBarrier(scene);

    const lamp = await LoadStreetLamps(scene);


    if(options.settings.shadows){

        //Creating shadows variable and adding enemy shadows
        map2Shadows = new ShadowGenerator(4096, light);
        if (enemy.meshdata.meshes) {
            enemy.meshdata.meshes.forEach((mesh) => {
                map2Shadows.addShadowCaster(mesh);
            });
          } else {
            console.warn("No enemy meshes found to cast shadows.");
          } 
        map2Shadows.addShadowCaster(building);
        map2Shadows.addShadowCaster(car1);
        map2Shadows.addShadowCaster(cars);
        map2Shadows.addShadowCaster(car2);
        map2Shadows.addShadowCaster(stall);
        map2Shadows.addShadowCaster(slide);
        map2Shadows.addShadowCaster(barrier);
        map2Shadows.addShadowCaster(lamp);
        map2Shadows.setDarkness(-100.0);
        map2Shadows.useContactHardeningShadow = true;
        map2Shadows.useExponentialShadowMap = true;
        map2Shadows.usePoissonSampling = true;
        
      }
    
    var flag = false;
    
    for(var i = 0 ; i < 2 ; i++){
        for(var j=0; j<2; j++) {
            const buildingClone = building.clone("buildingClone");
            buildingClone.position = new Vector3(-32.5 + (65*j) , 0 , -42.5 + 85*i);
            if(options.settings.shadows){
                map2Shadows.addShadowCaster(buildingClone);
            }
            if (flag == true){
                buildingClone.rotation = RotationFromDegrees(0,0,0);
            }
            
            if(j==1){
                flag = true;
            }
        }
    }

    var carsy = Math.floor(Math.random()*360);
    cars.rotation = RotationFromDegrees(0,carsy,0);


    var cary1 = Math.floor(Math.random()*360);
    car1.rotation = RotationFromDegrees(0,cary1,0);


    var cary2 = Math.floor(Math.random()*360);
    car2.rotation = RotationFromDegrees(0,cary2,0);


    const car1Clone = car1.clone("car1Clone");
    if(options.settings.shadows){
        map2Shadows.addShadowCaster(car1Clone);
      }
    car1Clone.position = new Vector3(30 , 0 , -10);
    var car1y = Math.floor(Math.random()*360);
    car1Clone.rotation = RotationFromDegrees(0,car1y,0);

    const car2Clone = car2.clone("car2Clone");
    if(options.settings.shadows){
        map2Shadows.addShadowCaster(car2Clone);
      }
    car2Clone.position = new Vector3(-25 , -1.5 , -15);
    var car2y = Math.floor(Math.random()*360);
    car2Clone.rotation = RotationFromDegrees(0,car2y,0);

    barrier.rotation = RotationFromDegrees(0,90,0);

    for (var i = 0; i< 6; i++){
        const barrierClone = barrier.clone("barrierClone");
        if(options.settings.shadows){
            map2Shadows.addShadowCaster(barrierClone);
          }
        barrierClone.rotation = RotationFromDegrees(0,90,0);
        barrierClone.position = new Vector3(-49.5 , 0 , -31.5 + 5.5*i);
    }
    for (var i = 0; i< 5; i++){
        const barrierClone = barrier.clone("barrierClone");
        if(options.settings.shadows){
            map2Shadows.addShadowCaster(barrierClone);
          }
        barrierClone.rotation = RotationFromDegrees(0,90,0);
        barrierClone.position = new Vector3(-49.5 , 0 , 10 + 5.5*i);
    }

    for (var i = 0; i< 6; i++){
        const barrierClone = barrier.clone("barrierClone");
        if(options.settings.shadows){
            map2Shadows.addShadowCaster(barrierClone);
          }
        barrierClone.rotation = RotationFromDegrees(0,90,0);
        barrierClone.position = new Vector3(49.5 , 0 , -31.5 + 5.5*i);
    }
    for (var i = 0; i< 5; i++){
        const barrierClone = barrier.clone("barrierClone");
        if(options.settings.shadows){
            map2Shadows.addShadowCaster(barrierClone);
          }
        barrierClone.rotation = RotationFromDegrees(0,90,0);
        barrierClone.position = new Vector3(49.5 , 0 , 10 + 5.5*i);
    }

    for (var i = 0; i< 1; i++){
        const barrierClone = barrier.clone("barrierClone");
        if(options.settings.shadows){
            map2Shadows.addShadowCaster(barrierClone);
          }
        barrierClone.rotation = RotationFromDegrees(0,180,0);
        barrierClone.position = new Vector3(11 - 5.5*i , 0 , 49.5);
    }

    for (var i = 0; i< 1; i++){
        const barrierClone = barrier.clone("barrierClone");
        if(options.settings.shadows){
            map2Shadows.addShadowCaster(barrierClone);
          }
        barrierClone.rotation = RotationFromDegrees(0,180,0);
        barrierClone.position = new Vector3(-12 - 5.5*i , 0 , 49.5);
    }
    
    for (var i = 0; i< 1; i++){
        const barrierClone = barrier.clone("barrierClone");
        if(options.settings.shadows){
            map2Shadows.addShadowCaster(barrierClone);
          }
        barrierClone.rotation = RotationFromDegrees(0,180,0);
        barrierClone.position = new Vector3(12 - 5.5*i , 0 , -49.5);
    }

    for (var i = 0; i< 1; i++){
        const barrierClone = barrier.clone("barrierClone");
        if(options.settings.shadows){
            map2Shadows.addShadowCaster(barrierClone);
          }
        barrierClone.rotation = RotationFromDegrees(0,180,0);
        barrierClone.position = new Vector3(-11 - 5.5*i , 0 , -49.5);
    }
    
    lamp.rotation = RotationFromDegrees(0,270,0);

    for (var i = 0; i<6; i++) {
        const lampClone = lamp.clone("lampClone")
        if(options.settings.shadows){
            map2Shadows.addShadowCaster(lampClone);
          }
        lampClone.rotation = RotationFromDegrees(0,90,0);
        lampClone.position = new Vector3(40 - 15*i,0,-30);
    }

    for (var i = 0; i<6; i++) {
        const lampClone = lamp.clone("lampClone")
        if(options.settings.shadows){
            map2Shadows.addShadowCaster(lampClone);
          }
        lampClone.rotation = RotationFromDegrees(0,270,0);
        lampClone.position = new Vector3(40 - 15*i,0, 30);
    }
    
}

async function LoadBuilding(scene) {
    const { meshes} = await SceneLoader.ImportMeshAsync("", "./models/map2/", "building.glb", scene);
    const building = meshes[0];
    building.scaling = new Vector3(100 , 100, 100);
    building.position = new Vector3(-32.5 , 0 , -42.5);

    return building
}

async function LoadCar1(scene) {
    const { meshes} = await SceneLoader.ImportMeshAsync("", "./models/map2/", "car1.glb", scene);
    const cars = meshes[0];
    cars.scaling = new Vector3(0.015 , 0.015, 0.015);
    cars.position = new Vector3(-20 , 0 , 10);
    cars.rotation = RotationFromDegrees(0,90,0);

    return cars
}

async function LoadCar2(scene) {
    const { meshes} = await SceneLoader.ImportMeshAsync("", "./models/map2/", "car2.glb", scene);
    const car2 = meshes[0];
    car2.scaling = new Vector3(1.5 , 1.5, 1.5);
    car2.position = new Vector3(20 , -1.5 , 15);
    car2.rotation = RotationFromDegrees(0,0,0);

    return car2
}

async function LoadCars(scene) {
    const { meshes} = await SceneLoader.ImportMeshAsync("", "./models/map2/", "cars.glb", scene);
    const cars = meshes[0];
    cars.scaling = new Vector3(1.1 , 1.1, 1.1);
    cars.position = new Vector3(0 , 0 , 0);
    cars.rotation = RotationFromDegrees(0,0,0);

    return cars
}

async function LoadStall(scene) {
    const { meshes} = await SceneLoader.ImportMeshAsync("", "./models/map2/", "stall.glb", scene);
    const stall = meshes[0];
    stall.scaling = new Vector3(0.02 , 0.02, 0.02);
    stall.position = new Vector3(0 , 0 , 40);
    //cars.rotation = RotationFromDegrees(0,0,0);

    return stall
}

async function LoadSlide(scene) {
    const { meshes} = await SceneLoader.ImportMeshAsync("", "./models/map2/", "scene.glb", scene);
    const slide = meshes[0];
    slide.scaling = new Vector3(2 , 2, 2);
    slide.position = new Vector3(3 , 0 , -42);
    slide.rotation = RotationFromDegrees(0,90,0);

    return slide
}

async function LoadBarrier(scene) {
    const { meshes} = await SceneLoader.ImportMeshAsync("", "./models/map2/", "barrier.glb", scene);
    const barrier = meshes[0];
    barrier.scaling = new Vector3(2, 2, 2);
    barrier.position = new Vector3(-49.5 , 0 , -31.5);

    return barrier
}

async function LoadStreetLamps(scene) {
    const { meshes} = await SceneLoader.ImportMeshAsync("", "./models/map2/", "streetLamp.glb", scene);
    const lamp = meshes[0];
    lamp.scaling = new Vector3(0.01 , 0.01, 0.01);
    lamp.position = new Vector3(40 , 0 , 30);

    return lamp
}

  const map2Builder = {
    map2
  };

  export default map2Builder
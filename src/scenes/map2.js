import {
    Vector3,
    CubeTexture,
    SceneLoader,
    DirectionalLight,
    ShadowGenerator,
    MeshBuilder,
    PBRMaterial,
    Texture,
    Scene,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import { options } from "../options";
import { RotationFromDegrees} from "../libs/angles";

let map2Shadows;

async function map2(scene, enemy){
    const envTex = CubeTexture.CreateFromPrefilteredData('./environment/sky.env', scene)
    scene.environmentTexture = envTex 
  
    scene.createDefaultSkybox(envTex, true)

    createBounds(scene);

    /*scene.fogMode = Scene.FOGMODE_LINEAR;
    scene.fogStart = 0.0;
    scene.fogEnd = 100.0;*/

    const light = new DirectionalLight("dir01", new Vector3(-1, -2, -1), scene);
    light.position = new Vector3(20, 40, 20);
    light.intensity = 1.8;

    const building = await LoadBuilding(scene);

    const stall = await LoadStall(scene);
    
    const slide = await LoadSlide(scene);  

    const boundslide1 = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: 1,
      height: 5,
      depth: 5
    }, scene);
    boundslide1.position = new Vector3(2.7 , 0.2 , -44.3);
    boundslide1.rotation = RotationFromDegrees(0,50,0);
    boundslide1.isVisible = false;
    boundslide1.checkCollisions = true;

    const boundslide2 = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: 7.5,
      height: 7,
      depth: 2.5
    }, scene);
    boundslide2.position = new Vector3(0 , 0.2 , -42);
    boundslide2.rotation = RotationFromDegrees(0,0,0);
    boundslide2.isVisible = false;
    boundslide2.checkCollisions = true;

    const boundslide3 = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: 5,
      height: 5.7,
      depth: 1.7
    }, scene);
    boundslide3.position = new Vector3(3 , 0.2 , -37.8);
    boundslide3.rotation = RotationFromDegrees(0,-24,0);
    boundslide3.isVisible = false;
    boundslide3.checkCollisions = true;
    

    const cars = await LoadCars(scene);
    cars.rotation = RotationFromDegrees(0,30,0);

    const boundcars1 = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: 2.6,
      height: 4,
      depth: 7.3
    }, scene);
    boundcars1.position = new Vector3(-3.1 , 0 , 1);
    boundcars1.rotation = RotationFromDegrees(0,30,0);
    boundcars1.isVisible = false;
    boundcars1.checkCollisions = true;

    const boundcars2 = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: 2.6,
      height: 4,
      depth: 7
    }, scene);
    boundcars2.position = new Vector3(1.9 , 0 , -3);
    boundcars2.rotation = RotationFromDegrees(0,30,0);
    boundcars2.isVisible = false;
    boundcars2.checkCollisions = true;




    const car1 = await LoadCar1(scene);
      car1.scaling = new Vector3(0.015 , 0.015, 0.015);
      car1.position = new Vector3(-20 , 0 , 10);

      const boundCar1 = MeshBuilder.CreateBox("boundingBoxMesh", {
        width: 2.6,
        height: 6,
        depth: 7.3
      }, scene);
      boundCar1.position = car1.position;
      boundCar1.isVisible = false;
      boundCar1.checkCollisions = true;

    const car2 = await LoadCar2(scene);
    car2.scaling = new Vector3(1.5 , 1.5, 1.5);
    car2.position = new Vector3(20 , -1.5 , 15);
    car2.rotation = RotationFromDegrees(0,40,0);

    const boundCar2 = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: 8.5,
      height: 6,
      depth: 3
    }, scene);
    boundCar2.position = new Vector3(21.9 , -0.5 , 13.5);
    boundCar2.rotation = RotationFromDegrees(0,40,0);

    boundCar2.isVisible = false;
    boundCar2.checkCollisions = true;

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
        map2Shadows.addShadowCaster(building[0]);
        map2Shadows.addShadowCaster(car1);
        map2Shadows.addShadowCaster(cars);
        map2Shadows.addShadowCaster(car2);
        map2Shadows.addShadowCaster(stall);
        map2Shadows.addShadowCaster(slide);
        map2Shadows.addShadowCaster(barrier);
        map2Shadows.addShadowCaster(lamp[0]);
        map2Shadows.setDarkness(-100.0);
        map2Shadows.useContactHardeningShadow = true;
        map2Shadows.useExponentialShadowMap = true;
        map2Shadows.usePoissonSampling = true;
        
      }
    
    var flag = false;
    
    for(var i = 0 ; i < 2 ; i++){
        for(var j=0; j<2; j++) {
            const buildingClone = building[0].clone("buildingClone");
            buildingClone.position = new Vector3(-32.5 + (65*j) , 0 , -42.5 + 85*i);

            const buildingwallClone = building[2].clone("fencewallClone4");
            buildingwallClone.position = buildingClone.position;
            buildingwallClone.scaling = buildingClone.scaling;

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

  
    var cary1 = Math.floor(Math.random()*360);
    car1.rotation = RotationFromDegrees(0,cary1,0);
    boundCar1.rotation = car1.rotation;

    const car1Clone = car1.clone("car1Clone");
    if(options.settings.shadows){
        map2Shadows.addShadowCaster(car1Clone);
      }
    car1Clone.position = new Vector3(30 , 0 , -10);
    var car1y = Math.floor(Math.random()*360);
    car1Clone.rotation = RotationFromDegrees(0,car1y,0); 

    const boundCar1Clone = boundCar1.clone("bound1clone");
    boundCar1Clone.position = car1Clone.position;
    boundCar1Clone.rotation = car1Clone.rotation;


    const car2Clone = car2.clone("car2Clone");
    if(options.settings.shadows){
        map2Shadows.addShadowCaster(car2Clone);
      }
    car2Clone.position = new Vector3(-25 , -1.5 , -15);
    car2Clone.rotation = RotationFromDegrees(0,30,0);

    const boundCar2Clone = boundCar2.clone("bound1clone");
    boundCar2Clone.position = new Vector3(-22.8 , -0.5 , -16.1  );
    boundCar2Clone.rotation = car2Clone.rotation;

    

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
        const lampClone = lamp[0].clone("lampClone")
        if(options.settings.shadows){
            map2Shadows.addShadowCaster(lampClone);
          }
        lampClone.rotation = RotationFromDegrees(0,90,0);
        lampClone.position = new Vector3(40 - 15*i,0,-30);

        const boundlampClone = lamp[2].clone("bound1clone");
        boundlampClone.position = lampClone.position;
        boundlampClone.rotation = lampClone.rotation;


    }

    for (var i = 0; i<6; i++) {
        const lampClone = lamp[0].clone("lampClone")
        if(options.settings.shadows){
            map2Shadows.addShadowCaster(lampClone);
          }
        lampClone.rotation = RotationFromDegrees(0,270,0);
        lampClone.position = new Vector3(40 - 15*i,0, 30);

        const boundlampClone = lamp[2].clone("bound1clone");
        boundlampClone.position = lampClone.position;
        boundlampClone.rotation = lampClone.rotation;
    }
    
}

async function LoadBuilding(scene) {
    const { meshes} = await SceneLoader.ImportMeshAsync("", "./models/map2/", "building.glb", scene);
    const building = meshes[0];

    const mesh = meshes[1];
    meshes[1].showBoundingBox = false
    ;

  const boundingBox = mesh.getBoundingInfo().boundingBox;

  const sizeVector = boundingBox.maximum.subtract(boundingBox.minimum);
  const centerVector = boundingBox.minimum.add(sizeVector.scale(0.5));
  boundingBox.minimum = centerVector.subtract(sizeVector.scale(0.5));
  boundingBox.maximum = centerVector.add(sizeVector.scale(0.5));

  const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
  const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
    width: boxSize.x,
    height: boxSize.y,
    depth: boxSize.z
  }, scene);
  boxMesh.isVisible = false;
  boxMesh.checkCollisions = true;

  building.scaling = new Vector3(100 , 100, 100);
  building.position = new Vector3(-32.5 , 0 , -42.5);
  boxMesh.scaling = building.scaling;
  boxMesh.position = building.position;
  meshes.push(boxMesh)

    return meshes
}

async function LoadCar1(scene) {
    const { meshes} = await SceneLoader.ImportMeshAsync("", "./models/map2/", "car1.glb", scene);
    const cars = meshes[0];
    return cars
}

async function LoadCar2(scene) {
    const { meshes} = await SceneLoader.ImportMeshAsync("", "./models/map2/", "car2.glb", scene);
    const car2 = meshes[0];

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

    const mesh = meshes[1];
    meshes[1].showBoundingBox = false;

    const boundingBox = mesh.getBoundingInfo().boundingBox;

    const sizeVector = boundingBox.maximum.subtract(boundingBox.minimum);
    const centerVector = boundingBox.minimum.add(sizeVector.scale(0.5));
    boundingBox.minimum = centerVector.subtract(sizeVector.scale(0.5));
    boundingBox.maximum = centerVector.add(sizeVector.scale(0.5));

    const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
    const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: boxSize.x,
      height: boxSize.y,
      depth: boxSize.z
    }, scene);
    boxMesh.isVisible = false;
    boxMesh.checkCollisions = true;
    boxMesh.position = new Vector3(0 , 2 , 40);
    boxMesh.scaling = stall.scaling;
    meshes.push(boxMesh)

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
    
    const mesh = meshes[1];
    meshes[1].showBoundingBox = false;

    const boundingBox = mesh.getBoundingInfo().boundingBox;

    const sizeVector = boundingBox.maximum.subtract(boundingBox.minimum);
    const centerVector = boundingBox.minimum.add(sizeVector.scale(0.5));
    boundingBox.minimum = centerVector.subtract(sizeVector.scale(0.5));
    boundingBox.maximum = centerVector.add(sizeVector.scale(0.5));

    const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
    const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: boxSize.x,
      height: boxSize.y,
      depth: boxSize.z
    }, scene);
    boxMesh.isVisible = false;
    boxMesh.checkCollisions = true;

    lamp.scaling = new Vector3(0.01 , 0.01, 0.01);
    lamp.position = new Vector3(40 , 0 , 30);
    boxMesh.position = lamp.position;
    boxMesh.scaling = lamp.scaling;
    meshes.push(boxMesh)
    
    return meshes
}

function createBounds(scene) {
  const bound = MeshBuilder.CreateBox("boundingBoxMesh", {
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
    map2
  };

  export default map2Builder
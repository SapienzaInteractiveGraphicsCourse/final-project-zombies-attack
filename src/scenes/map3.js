import {
    Vector3,
    CubeTexture,
    SceneLoader,
    DirectionalLight,
    ShadowGenerator,
    MeshBuilder
} from "@babylonjs/core";
import "@babylonjs/loaders";
import { options } from "../options";
import { RotationFromDegrees} from "../libs/angles";

let map3Shadows;

async function map3(sceneInfo, enemy){

    const envTex = CubeTexture.CreateFromPrefilteredData('./environment/environment.env', sceneInfo.scene)
    sceneInfo.scene.environmentTexture = envTex 

    const light = new DirectionalLight("dir01", new Vector3(-1, -2, -1), sceneInfo.scene);
    light.position = new Vector3(20, 40, 20);
    light.intensity = 1.8;

    sceneInfo.scene.createDefaultSkybox(envTex, true)
    
    const rock = await LoadRocks(sceneInfo.scene);

    Loadbox1(rock , sceneInfo.scene);
    Loadbox2(rock , sceneInfo.scene);
    Loadbox3(rock , sceneInfo.scene);
    Loadbox4(rock , sceneInfo.scene);
    Loadbox5(rock , sceneInfo.scene);
    Loadbox6(rock , sceneInfo.scene);
    Loadbox7(rock , sceneInfo.scene);
    Loadbox8(rock , sceneInfo.scene);
    Loadbox9(rock , sceneInfo.scene);
    Loadbox10(rock , sceneInfo.scene);    
    Loadbox11(rock , sceneInfo.scene);
    Loadbox12(rock , sceneInfo.scene);
    Loadbox13(rock , sceneInfo.scene);
    Loadbox14(rock , sceneInfo.scene);
    Loadbox15(rock , sceneInfo.scene);




    if(options.settings.shadows){

        //Creating shadows variable and adding enemy shadows
        map3Shadows = new ShadowGenerator(4096, light);
        if (enemy.meshdata.meshes) {
            enemy.meshdata.meshes.forEach((mesh) => {
                map3Shadows.addShadowCaster(mesh);
            });
          } else {
            console.warn("No enemy meshes found to cast shadows.");
          } 
        map3Shadows.addShadowCaster(rock[0]);
        map3Shadows.setDarkness(-100.0);
        map3Shadows.useContactHardeningShadow = true;
        map3Shadows.useExponentialShadowMap = true;
        map3Shadows.usePoissonSampling = true;
        
      }

    const cactus = await LoadCactus(sceneInfo.scene);
    for(var i=0; i<5; i++){
        const cactusClone = cactus.clone("cactusClone");
        cactusClone.position = new Vector3(48  - 22*i, 0 , 43);
        var y = Math.floor(Math.random()*360);
        cactusClone.rotation = RotationFromDegrees(0,y,0);
        if(options.settings.shadows){
            map3Shadows.addShadowCaster(cactusClone);
        }
    }

    for(var i=0; i<3; i++){
        const cactusClone = cactus.clone("cactusClone");
        cactusClone.position = new Vector3(43  - 34*i, 0 , 36);
        var y = Math.floor(Math.random()*360);
        cactusClone.rotation = RotationFromDegrees(0,y,0);
        if(options.settings.shadows){
            map3Shadows.addShadowCaster(cactusClone);
        }
    }

    for(var i=0; i<4; i++){
        const cactusClone = cactus.clone("cactusClone");
        cactusClone.position = new Vector3(45 - 30*i, 0 , -6);
        var y = Math.floor(Math.random()*360);
        cactusClone.rotation = RotationFromDegrees(0,y,0);
        if(options.settings.shadows){
            map3Shadows.addShadowCaster(cactusClone);
        }
    }

    for(var i=0; i<3; i++){
        const cactusClone = cactus.clone("cactusClone");
        cactusClone.position = new Vector3(40 - 37*i, 0 , -10);
        var y = Math.floor(Math.random()*360);
        cactusClone.rotation = RotationFromDegrees(0,y,0);
        if(options.settings.shadows){
            map3Shadows.addShadowCaster(cactusClone);
        }
    }

    for(var i=0; i<6; i++){
        const cactusClone = cactus.clone("cactusClone");
        cactusClone.position = new Vector3(49  - 15*i, 0 , -30);
        var y = Math.floor(Math.random()*360);
        cactusClone.rotation = RotationFromDegrees(0,y,0);
        if(options.settings.shadows){
            map3Shadows.addShadowCaster(cactusClone);
        }
    }

    for(var i=0; i<4; i++){
        const cactusClone = cactus.clone("cactusClone");
        cactusClone.position = new Vector3(45 - 30*i, 0 , -46);
        var y = Math.floor(Math.random()*360);
        cactusClone.rotation = RotationFromDegrees(0,y,0);
        if(options.settings.shadows){
            map3Shadows.addShadowCaster(cactusClone);
        }
    }

    async function LoadRocks(scene) {
        const { meshes} = await SceneLoader.ImportMeshAsync("", "./models/map3/", "rocks.glb", scene);
        const rocks = meshes[0];
        rocks.scaling = new Vector3(1.5, 1.5, 2.0);
        rocks.position = new Vector3(50, 0, -20);       
        console.log(meshes) 
        return meshes
    }

    async function LoadCactus(scene) {
        const { meshes} = await SceneLoader.ImportMeshAsync("", "./models/map3/", "cactus.glb", scene);
        const cactus = meshes[0];
        cactus.scaling = new Vector3(1.5, 1.5, 1.5);
        cactus.position = new Vector3(48 , 0 , 0);
    
        return cactus
    }
   
    async function Loadbox1(rock , scene){
        const mesh = rock[1];

        rock[1].showBoundingBox = false;
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
        console.log(boxSize)
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: boxSize.x,
          height: boxSize.y,
          depth: boxSize.z
        }, scene);
        boxMesh.isVisible = false;
        boxMesh.checkCollisions = true;

        boxMesh.position = new Vector3(43.5, 0.8 , -37.6);
        boxMesh.scaling = new Vector3(1.5, 1.9, 2.0);

    }

    async function Loadbox2(rock , scene){
        const mesh = rock[2];

        rock[2].showBoundingBox = false;
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
        console.log(boxSize)
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: boxSize.x,
          height: boxSize.y,
          depth: boxSize.z
        }, scene);
        boxMesh.isVisible = false;
        boxMesh.checkCollisions = true;

        boxMesh.position = new Vector3(32.4, 1.2  , -37.6);
        boxMesh.scaling = new Vector3(1.5, 1.5, 2.0);

    }

    async function Loadbox3(rock , scene){
        const mesh = rock[3];

        rock[3].showBoundingBox = false;
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
        console.log(boxSize)
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: boxSize.x,
          height: boxSize.y,
          depth: boxSize.z
        }, scene);
        boxMesh.isVisible = false;
        boxMesh.checkCollisions = true;

        boxMesh.position = new Vector3(20.8, 1.2  , -37.5);
        boxMesh.scaling = new Vector3(1.5, 1.5, 2.0);

    }

    async function Loadbox4(rock , scene){
        const mesh = rock[4];

        rock[4].showBoundingBox = false;
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
        console.log(boxSize)
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: boxSize.x,
          height: boxSize.y,
          depth: boxSize.z
        }, scene);
        boxMesh.isVisible = false;
        boxMesh.checkCollisions = true;

        boxMesh.position = new Vector3(8.3 , 1.2  , -37.9);
        boxMesh.scaling = new Vector3(1.5, 1.5, 2.0);

    }

    async function Loadbox5(rock , scene){
        const mesh = rock[5];

        rock[5].showBoundingBox = false;
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
        console.log(boxSize)
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: boxSize.x,
          height: boxSize.y,
          depth: boxSize.z
        }, scene);
        boxMesh.isVisible = false;
        boxMesh.checkCollisions = true;

        boxMesh.position = new Vector3(39.4, 0.8 , -18.9);
        boxMesh.scaling = new Vector3(1.5, 1.5, 2.0);

    }

    async function Loadbox6(rock , scene){
        const mesh = rock[6];

        rock[6].showBoundingBox = false;
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
        console.log(boxSize)
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: 10,
          height: 6,
          depth: 7
        }, scene);
        boxMesh.isVisible = false;
        boxMesh.checkCollisions = true;

        boxMesh.position = new Vector3(19.5, 1.6 , -19.4);
        boxMesh.rotation = RotationFromDegrees(0,-25,0);
        boxMesh.scaling = new Vector3(0.9, 1.5, 1.3);

    }

    async function Loadbox7(rock , scene){
        const mesh = rock[7];

        rock[7].showBoundingBox = false;
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
        console.log(boxSize)
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: boxSize.x,
          height: boxSize.y,
          depth: boxSize.z
        }, scene);
        boxMesh.isVisible = false;
        boxMesh.checkCollisions = true;

        boxMesh.position = new Vector3(1.5 , 1.6   , -20);
        boxMesh.scaling = new Vector3(1.5, 1.5, 2.0);

    }


    async function Loadbox8(rock , scene){
        const mesh = rock[8];

        rock[8].showBoundingBox = false;
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
        console.log(boxSize)
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: boxSize.x,
          height: boxSize.y,
          depth: boxSize.z
        }, scene);
        boxMesh.isVisible = false;
        boxMesh.checkCollisions = true;

        boxMesh.position = new Vector3(-20, 1.6 , -19.2);
        boxMesh.scaling = new Vector3(1.4, 1.5, 1.7);
        boxMesh.rotation = boxMesh.rotation = RotationFromDegrees(0,-4,0);

    }


        async function Loadbox9(rock , scene){
        const mesh = rock[9];

        rock[9].showBoundingBox = false;
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
        console.log(boxSize)
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: boxSize.x,
          height: boxSize.y,
          depth: boxSize.z
        }, scene);
        boxMesh.isVisible = false;
        boxMesh.checkCollisions = true;

        boxMesh.position = new Vector3(-41.9 , 1.2  , -19.2);
        boxMesh.scaling = new Vector3(1.5, 1.5, 1.7);

    }

    async function Loadbox10(rock , scene){
        const mesh = rock[10];

        rock[10].showBoundingBox = false;
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
        console.log(boxSize)
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: boxSize.x,
          height: boxSize.y,
          depth: boxSize.z
        }, scene);
        boxMesh.isVisible = false;
        boxMesh.checkCollisions = true;

        boxMesh.position = new Vector3(-10.5 , 1.2  , -37.5);
        boxMesh.scaling = new Vector3(1.1, 1.5, 1.3);

    }


    async function Loadbox11(rock , scene){
        const mesh = rock[11];

        rock[11].showBoundingBox = false;
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
        console.log(boxSize)
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: boxSize.x,
          height: boxSize.y,
          depth: boxSize.z
        }, scene);
        boxMesh.isVisible = false;
        boxMesh.checkCollisions = true;

        boxMesh.position = new Vector3(-28.3 , 2.5  , -37.5);
        boxMesh.scaling = new Vector3(1.5, 2.5, 2.0);

    }

    async function Loadbox12(rock , scene){
        const mesh = rock[12];

        rock[12].showBoundingBox = false;
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
        console.log(boxSize)
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: boxSize.x,
          height: boxSize.y,
          depth: boxSize.z
        }, scene);
        boxMesh.isVisible = false;
        boxMesh.checkCollisions = true;

        boxMesh.position = new Vector3(-43.5 , 1.2  , -38.8);
        boxMesh.scaling = new Vector3(1.5, 1.5, 2.0);

    }

    async function Loadbox13(rock , scene){
        const mesh = rock[13];

        rock[13].showBoundingBox = false;
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
        console.log(boxSize)
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: boxSize.x,
          height: boxSize.y,
          depth: boxSize.z
        }, scene);
        boxMesh.isVisible = false;
        boxMesh.checkCollisions = true;

        boxMesh.position = new Vector3(27 , 1.2  , 17);
        boxMesh.scaling = new Vector3(1.5, 1.5, 2.0);

    }

    async function Loadbox14(rock , scene){
    const mesh = rock[14];

    rock[14].showBoundingBox = false;
  
    const boundingBox = mesh.getBoundingInfo().boundingBox;
    const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
    console.log(boxSize)
    const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: boxSize.x,
      height: boxSize.y,
      depth: boxSize.z
    }, scene);
    boxMesh.isVisible = false;
    boxMesh.checkCollisions = true;

    boxMesh.position = new Vector3(-7 , 1.2  , 14);
    boxMesh.scaling = new Vector3(1.5, 1.5, 2.0);


}

async function Loadbox15(rock , scene){
    const mesh = rock[15];

    rock[15].showBoundingBox = false;
  
    const boundingBox = mesh.getBoundingInfo().boundingBox;
    const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
    console.log(boxSize)
    const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: boxSize.x,
      height: boxSize.y,
      depth: boxSize.z
    }, scene);
    boxMesh.isVisible = false;
    boxMesh.checkCollisions = true;

    boxMesh.position = new Vector3(-35 , 1.2  , 13);
    boxMesh.scaling = new Vector3(1.2, 1.5, 1.5);


}
}
const map3Builder = {
    map3
  };

  export default map3Builder
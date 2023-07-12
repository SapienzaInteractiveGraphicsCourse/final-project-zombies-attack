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

let map3Shadows;

async function map3(scene, enemy){

    const envTex = CubeTexture.CreateFromPrefilteredData('./environment/environment.env', scene)
    scene.environmentTexture = envTex 

    const light = new DirectionalLight("dir01", new Vector3(-1, -2, -1), scene);
    light.position = new Vector3(20, 40, 20);
    light.intensity = 1.8;

    scene.createDefaultSkybox(envTex, true)
    
    const rock = await LoadRocks(scene);

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
        map3Shadows.addShadowCaster(rock);
        map3Shadows.setDarkness(-100.0);
        map3Shadows.useContactHardeningShadow = true;
        map3Shadows.useExponentialShadowMap = true;
        map3Shadows.usePoissonSampling = true;
        
      }

    const cactus = await LoadCactus(scene);
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
        rocks.scaling = new Vector3(1.5 , 1.5, 2.0);
        rocks.position = new Vector3(50 , 0 , -20);
    
        return rocks
    }

    async function LoadCactus(scene) {
        const { meshes} = await SceneLoader.ImportMeshAsync("", "./models/map3/", "cactus.glb", scene);
        const cactus = meshes[0];
        cactus.scaling = new Vector3(1.5, 1.5, 1.5);
        cactus.position = new Vector3(48 , 0 , 0);
    
        return cactus
    }
   
}

const map3Builder = {
    map3
  };

  export default map3Builder
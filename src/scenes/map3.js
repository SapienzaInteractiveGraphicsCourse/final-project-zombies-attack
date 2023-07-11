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

async function map3(scene){

    const envTex = CubeTexture.CreateFromPrefilteredData('./environment/environment.env', scene)
    scene.environmentTexture = envTex 

    scene.createDefaultSkybox(envTex, true)
    
    await LoadRocks(scene);

    const cactus = await LoadCactus(scene);
    for(var i=0; i<5; i++){
        const cactusClone = cactus.clone("cactusClone");
        cactusClone.position = new Vector3(48  - 22*i, 0 , 43);
        var y = Math.floor(Math.random()*360);
        cactusClone.rotation = RotationFromDegrees(0,y,0);
    }

    for(var i=0; i<3; i++){
        const cactusClone = cactus.clone("cactusClone");
        cactusClone.position = new Vector3(43  - 34*i, 0 , 36);
        var y = Math.floor(Math.random()*360);
        cactusClone.rotation = RotationFromDegrees(0,y,0);
    }

    for(var i=0; i<4; i++){
        const cactusClone = cactus.clone("cactusClone");
        cactusClone.position = new Vector3(45 - 30*i, 0 , -6);
        var y = Math.floor(Math.random()*360);
        cactusClone.rotation = RotationFromDegrees(0,y,0);
    }

    for(var i=0; i<3; i++){
        const cactusClone = cactus.clone("cactusClone");
        cactusClone.position = new Vector3(40 - 37*i, 0 , -10);
        var y = Math.floor(Math.random()*360);
        cactusClone.rotation = RotationFromDegrees(0,y,0);
}

    for(var i=0; i<6; i++){
        const cactusClone = cactus.clone("cactusClone");
        cactusClone.position = new Vector3(49  - 15*i, 0 , -30);
        var y = Math.floor(Math.random()*360);
        cactusClone.rotation = RotationFromDegrees(0,y,0);
    }

    for(var i=0; i<4; i++){
        const cactusClone = cactus.clone("cactusClone");
        cactusClone.position = new Vector3(45 - 30*i, 0 , -46);
        var y = Math.floor(Math.random()*360);
        cactusClone.rotation = RotationFromDegrees(0,y,0);
}


    /*for(var i=0; i<33; i++){
        const cactusClone = cactus.clone("cactusClone");
        cactusClone.rotation = RotationFromDegrees(0,90,0);
        cactusClone.position = new Vector3(49 , 0 , 48  - 3*i);
    }

    for(var i=0; i<33; i++){
        const cactusClone = cactus.clone("cactusClone");
        cactusClone.rotation = RotationFromDegrees(0,90,0);
        cactusClone.position = new Vector3(-49 , 0 , - 48  + 3*i);
    }

    for(var i=0; i<32; i++){
        const cactusClone = cactus.clone("cactusClone");
        cactusClone.position = new Vector3(- 47  + 3*i, 0 , -49);
    }
*/

    


    async function LoadRocks(scene) {
        const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map3/", "rocks.glb", scene);
        const rocks = meshes[0];
        rocks.scaling = new Vector3(1.5 , 1.5, 2.0);
        rocks.position = new Vector3(50 , 0 , -20);
    
        return rocks
    }

    async function LoadCactus(scene) {
        const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map3/", "cactus.glb", scene);
        const cactus = meshes[0];
        cactus.scaling = new Vector3(1.5, 1.5, 1.5);
        cactus.position = new Vector3(48 , 0 , 0);
    
        return cactus
    }

   
}

const map3Builder = {
    map3,
  }

  export default map3Builder
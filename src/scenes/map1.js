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

function map1(scene){
    for(var i = 1 ; i < 7 ; i++){
      LoadFence1(scene , i);
      LoadFence2(scene , i);
      }
      LoadTombs(scene);
      LoadTMausoleum(scene);
      LoadStatue1(scene);
      LoadStatue2(scene);
  
  
      async function LoadFence1(scene, i ,camera) {
  
        const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "graveyard_fence.glb", scene);
        const fence = meshes[0];
        fence.position = new Vector3(-2+(8*i) , 2 , 0);
        fence.scaling = new Vector3(4 , 4 , 4);
        
      
      }
      
      async function LoadFence2(scene, i ,camera) {
      
        const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "graveyard_fence.glb", scene);
        const fence = meshes[0];
        fence.position = new Vector3(-(-2+(8*i)) , 2 , 0);
        fence.scaling = new Vector3(4 , 4 , 4);
      
      }
      
      async function LoadTombs(scene,camera) {
      
        const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "shelby_tombstone_with_smart3dcapture3.2_free.glb", scene);
        const tomb = meshes[0];
        tomb.position = new Vector3(30 , 2.6 , -2);
        tomb.scaling = new Vector3(0.1 , 0.1 , 0.1);
        tomb.rotation = new Vector3( 0 , -Math.PI*0.5 , 0);
      
      }
      
      async function LoadTMausoleum(scene,camera) {
      
        const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "mausoleum.glb", scene);
        const maus = meshes[0];
        maus.position = new Vector3(0 , -0.5 , -42);
        maus.scaling = new Vector3(4 , 4 , 4);
        maus.rotation = new Vector3( 0 , Math.PI*0.5 , 0);
      
      }
      
      async function LoadStatue1(scene,camera) {
      
        const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "frank.glb", scene);
        const statue = meshes[0];
        statue.position = new Vector3(8.5 , 1.8, -47);
        statue.scaling = new Vector3(3 , 3 , 3);
        statue.rotation = new Vector3( 0 , 0 , 0);
      
      }
      
      async function LoadStatue2(scene,camera) {
      
        const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "frank.glb", scene);
        const statue = meshes[0];
        statue.position = new Vector3(-8.5 , 1.8, -47);
        statue.scaling = new Vector3(3 , 3 , 3);
        statue.rotation = new Vector3( 0 , 0 , 0);
      
      }

    const envTex = CubeTexture.CreateFromPrefilteredData('./environment/sky.env', scene)
    scene.environmentTexture = envTex

    scene.createDefaultSkybox(envTex, true)
  }

  const map1Builder = {
    map1,
  }

  export default map1Builder
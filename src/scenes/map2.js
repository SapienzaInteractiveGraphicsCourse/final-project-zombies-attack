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

function map2(scene){
    for(var i = 1 ; i < 10 ; i++){
      LoadTree(scene , i);
    }
      
    async function LoadTree(scene, i) {
  
      const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map2/", "tree.glb", scene);
      const fence = meshes[0];
      fence.position = new Vector3(-2+(8*i) , 5 , 0);
      fence.scaling = new Vector3(4 , 4 , 4);
        
    }

    const envTex = CubeTexture.CreateFromPrefilteredData('./environment/nightSky.env', scene)
    scene.environmentTexture = envTex

    scene.createDefaultSkybox(envTex, true)
  
  }

  
  const map2Builder = {
    map2,
  }

  export default map2Builder
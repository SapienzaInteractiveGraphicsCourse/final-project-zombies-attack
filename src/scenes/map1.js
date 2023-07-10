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

async function map1(scene){


  const ground = MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, scene)

 ground.material = CreateAsphalt(scene)

  ground.model = ground;

 ground.checkCollisions = true;


  function CreateAsphalt(scene) {
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
  
    const fence = await LoadFence1(scene);
    fence.position = new Vector3(-2+(8*i) , 2 , 0);
    fence.scaling = new Vector3(0 , 0 , 0);

    for(var i = 1 ; i < 7 ; i++){

      const fenceClone = fence.clone("fenceClone");
      fenceClone.position = new Vector3(-2+(8*i) , 2 , 0);
      fenceClone.scaling = new Vector3(4 , 4 , 4);

      const fenceClone1 = fence.clone("fenceClone1");
      fenceClone1.position = new Vector3(-(-2+(8*i)) , 2 , 0);
      fenceClone1.scaling = new Vector3(4 , 4 , 4);

      const fenceClone2 = fence.clone("fenceClone2");
      fenceClone2.position = new Vector3(49.4 , 2 , -(-3.2+8*i));
      fenceClone2.scaling = new Vector3(4 , 4 , 4);
      fenceClone2.rotation = new Vector3( 0 ,  Math.PI*0.5 , 0);

      const fenceClone3 = fence.clone("fenceClone3");
      fenceClone3.position = new Vector3(-49.4 , 2 , -(-3.2+8*i));
      fenceClone3.scaling = new Vector3(4 , 4 , 4);
      fenceClone3.rotation = new Vector3( 0 ,  Math.PI*0.5 , 0);

      const fenceClone4 = fence.clone("fenceClone4");
      fenceClone4.position = new Vector3(-2+(8*i) , 2 , -49);
      fenceClone4.scaling = new Vector3(4 , 4 , 4);

      const fenceClone5 = fence.clone("fenceClone5");
      fenceClone5.position = new Vector3(2-(8*i) , 2 , -49);
      fenceClone5.scaling = new Vector3(4 , 4 , 4);

    }
    
    const tomb1 = await LoadTomb1(scene);
    tomb1.position = new Vector3(33 , 0.2 , -12);
    tomb1.scaling = new Vector3(0.003 , 0.003 , 0.003);
    tomb1.rotation = new Vector3( 0 , Math.PI , 0);
    tomb1.isVisible = true;

    const tomb1Clone = tomb1.clone(tomb1);
    tomb1Clone.position = new Vector3(38 , 0.2 , -15);
    tomb1Clone.scaling = new Vector3(0.003 , 0.003 , 0.003);
    tomb1Clone.rotation = new Vector3( 0 , Math.PI*0.8 , 0);

    const tomb1Clone1= tomb1.clone(tomb1);
    tomb1Clone1.position = new Vector3(39 , 0.2 , -30);
    tomb1Clone1.scaling = new Vector3(0.003 , 0.003 , 0.003);
    tomb1Clone1.rotation = new Vector3( 0 , Math.PI*0.76 , 0);

    const tomb1Clone2 = tomb1.clone(tomb1);
    tomb1Clone2.position = new Vector3(31 , 0.2 , -21);
    tomb1Clone2.scaling = new Vector3(0.003 , 0.003 , 0.003);
    tomb1Clone2.rotation = new Vector3( 0 , -Math.PI*0.87 , 0);

    const tomb1Clone4 = tomb1.clone(tomb1);
    tomb1Clone4.position = new Vector3(39 , 0.2 , -27);
    tomb1Clone4.scaling = new Vector3(0.003 , 0.003 , 0.003);
    tomb1Clone4.rotation = new Vector3( 0 , Math.PI*0.87  , 0);

    const tomb1Clone5 = tomb1.clone(tomb1);
    tomb1Clone5.position = new Vector3(36 , 0.2 , -24);
    tomb1Clone5.scaling = new Vector3(0.003 , 0.003 , 0.003);
    tomb1Clone5.rotation = new Vector3( 0 , Math.PI*0.7  , 0);


    const tomb2 = await LoadTomb2(scene);
    tomb2.position = new Vector3(33 , 0.2 , -16);
    tomb2.scaling = new Vector3(0.003 , 0.003 , 0.003);
    tomb2.rotation = new Vector3( 0 , Math.PI , 0);
    tomb2.isVisible = true;

    const tomb2Clone = tomb1.clone(tomb1);
    tomb2Clone.position = new Vector3(39 , 0.2 , -17);
    tomb2Clone.scaling = new Vector3(0.003 , 0.003 , 0.003);
    tomb2Clone.rotation = new Vector3( 0 , Math.PI*0.8 , 0);
    


    LoadTMausoleum(scene);
    LoadStatue1(scene);
    LoadStatue2(scene);
    LoadCentergraves(scene);
    
    const trees = await LoadTrees(scene);
    trees.position = new Vector3(45 , 0.3, -10); 
    trees.scaling = new Vector3(0.015 , 0.015, 0.015);
    trees.rotation = new Vector3( 0 ,  Math.PI*0.5 , 0)

    const treesClone2 = trees.clone("treesClone2");
    treesClone2.position = new Vector3(45 , 0.3, -30); 
    treesClone2.scaling = new Vector3(0.015 , 0.015, 0.015);
    treesClone2.rotation = new Vector3( 0 ,  Math.PI*0.4 , 0);

    const treesClone3 = trees.clone("treesClone2");
    treesClone3.position = new Vector3(20 , 0.3, -40); 
    treesClone3.scaling = new Vector3(0.015 , 0.015, 0.015);
    treesClone3.rotation = new Vector3( 0 ,  0 , 0);



    const trees2 = await LoadTrees2(scene);
    trees2.position = new Vector3(45 , 0.3, -21);
    trees2.scaling = new Vector3(0.005 , 0.005, 0.005);
    trees2.rotation = new Vector3( 0 ,  0 , Math.PI*0.008);

    const trees2Clone = trees2.clone("trees2clone");
    trees2Clone.position = new Vector3(40 , 0.3, -31);
    trees2Clone.scaling = new Vector3(0.005 , 0.005, 0.005);
    trees2Clone.rotation = new Vector3( 0 ,  -Math.PI*0.6 , Math.PI*0.008);
    


    LoadGrass (scene);

    const tree = await LoadTree (scene);
    tree.position = new Vector3(39 , 0.2, -7);
    tree.scaling = new Vector3(0.015 , 0.015, 0.015);
    tree.rotation = new Vector3( -Math.PI*0.05 ,  Math.PI*0.5 , 0);

    const treeClone = tree.clone ("treeclone");
    treeClone.position = new Vector3(44 , 0.2, -42);
    treeClone.scaling = new Vector3(0.017 , 0.017, 0.017);
    treeClone.rotation = new Vector3( -Math.PI*0.05 ,  Math.PI*0.5 , 0);

    const graveyard = Mesh.MergeMeshes([tomb1 ,tomb1Clone,tomb1Clone1,tomb1Clone2,tomb1Clone4,tomb1Clone5 , tomb2 ,
       tomb2Clone , trees, treesClone2, treesClone3 ,trees2 ,trees2Clone]);

    

    


    async function LoadFence1(scene, i ,camera) {

      const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "graveyard_fence.glb", scene);
      const fence = meshes[0];
      return fence;
    }

    async function LoadTomb1(scene,camera) {
    
      const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "tomb1.glb", scene);
      var tomb1 = meshes[0];
      return tomb1;  
    }

    async function LoadTomb2(scene,camera) {
    
      const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "tomb2.glb", scene);
      var tomb2 = meshes[0];
      return tomb2;  
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
      statue.position = new Vector3(8.5 , 1.8, -46);
      statue.scaling = new Vector3(3 , 3 , 3);
      statue.rotation = new Vector3( 0 , 0 , 0);
    
    }
    
    async function LoadStatue2(scene,camera) {
    
      const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "frank.glb", scene);
      const statue = meshes[0];
      statue.position = new Vector3(-8.5 , 1.8, -46);
      statue.scaling = new Vector3(3 , 3 , 3);
      statue.rotation = new Vector3( 0 , 0 , 0);
    
    }

    async function LoadCentergraves(scene,camera) {
    
      const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "graveyard_of_gravestones.glb", scene);
      const graves = meshes[0];
      graves.position = new Vector3(0 , -0.5, -20);
      graves.scaling = new Vector3(1.5 , 1.5 , 1.5);
      graves.rotation = new Vector3( 0 , 0 , 0);
    
    }
    async function LoadGrass (scene,camera) {
    
      const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "grass_patches.glb", scene);
      const grass = meshes[0];
      grass.position = new Vector3(4 , -0.2, -17);
      grass.scaling = new Vector3(0.03 , 0.01, 0.03);
      grass.rotation = new Vector3( 0 ,  0 , 0);
    
    }

    async function LoadTrees (scene,camera) {
    
      const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "trees.glb", scene);
      const trees = meshes[0];
      return trees;
    
    }

    async function LoadTrees2 (scene,camera) {
    
      const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "trees (1).glb", scene);
      const trees2 = meshes[0];
      return trees2;
    
    }

    async function LoadTree (scene,camera) {
    
      const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "tree.glb", scene);
      const tree = meshes[0];
      return tree;
    }





  const envTex = CubeTexture.CreateFromPrefilteredData('./environment/sky.env', scene)
  scene.environmentTexture = envTex

  scene.createDefaultSkybox(envTex, true)
}

const map1Builder = {
  map1,
}

export default map1Builder
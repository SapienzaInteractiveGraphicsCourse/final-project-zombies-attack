import {
  Vector3,
  MeshBuilder,
  SceneLoader,
  PBRMaterial,
  Texture,
  DirectionalLight,
  ShadowGenerator,
  Scene
} from "@babylonjs/core";
import "@babylonjs/loaders";
import { options } from "../options";
import enemy from "../models/zombie/zombie";
import { RotationFromDegrees } from "../libs/angles";

let map1Shadows;

async function map1(sceneInfo){
  sceneInfo.ammoBox.mesh.position.z = -17;
  sceneInfo.scene.fogMode = Scene.FOGMODE_LINEAR;
  sceneInfo.scene.fogStart = 0.0;
  sceneInfo.scene.fogEnd = 100.0;
  const light = new DirectionalLight("dir01", new Vector3(-1, -2, -1), sceneInfo.scene);
  light.position = new Vector3(20, 40, 20);
  light.intensity = 1.8;

  const ground = MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, sceneInfo.scene)
  ground.material = CreateAsphalt(sceneInfo.scene)
  ground.model = ground;
  ground.checkCollisions = true;

  const bounds = createBounds(sceneInfo.scene)
  const walls = createInvWalls(sceneInfo.scene)
  
  const fence = await LoadFence1(sceneInfo.scene);

  const tomb1 = await LoadTomb1(sceneInfo.scene);
  tomb1.position = new Vector3(33 , 0.2 , -12);
  tomb1.scaling = new Vector3(0.003 , 0.003 , 0.003);
  tomb1.rotation = new Vector3( 0 , Math.PI , 0);
  tomb1.isVisible = true;

  const tomb1Clone = tomb1.clone("tomb11");
  tomb1Clone.position = new Vector3(38 , 0.2 , -15);
  tomb1Clone.scaling = new Vector3(0.003 , 0.003 , 0.003);
  tomb1Clone.rotation = new Vector3( 0 , Math.PI*0.8 , 0);

  const tomb1Clone1= tomb1.clone("tomb12");
  tomb1Clone1.position = new Vector3(39 , 0.2 , -30);
  tomb1Clone1.scaling = new Vector3(0.003 , 0.003 , 0.003);
  tomb1Clone1.rotation = new Vector3( 0 , Math.PI*0.76 , 0);

  const tomb1Clone2 = tomb1.clone("tomb13");
  tomb1Clone2.position = new Vector3(31 , 0.2 , -21);
  tomb1Clone2.scaling = new Vector3(0.003 , 0.003 , 0.003);
  tomb1Clone2.rotation = new Vector3( 0 , -Math.PI*0.87 , 0);

  const tomb1Clone4 = tomb1.clone("tomb14");
  tomb1Clone4.position = new Vector3(39 , 0.2 , -27);
  tomb1Clone4.scaling = new Vector3(0.003 , 0.003 , 0.003);
  tomb1Clone4.rotation = new Vector3( 0 , Math.PI*0.87  , 0);

  const tomb1Clone5 = tomb1.clone("tomb15");
  tomb1Clone5.position = new Vector3(36 , 0.2 , -24);
  tomb1Clone5.scaling = new Vector3(0.003 , 0.003 , 0.003);
  tomb1Clone5.rotation = new Vector3( 0 , Math.PI*0.7  , 0);


  const tomb1Clone20 = tomb1.clone("tomb12");
  tomb1Clone20.position = new Vector3(-38 , 0.2 , -20);
  tomb1Clone20.scaling = new Vector3(0.003 , 0.003 , 0.003);
  tomb1Clone20.rotation = new Vector3( 0 , 0 , 0);

  const tomb1Clone21= tomb1.clone("tomb12");
  tomb1Clone21.position = new Vector3(-36 , 0.2 , -30);
  tomb1Clone21.scaling = new Vector3(0.003 , 0.003 , 0.003);
  tomb1Clone21.rotation = new Vector3( 0 , Math.PI*0.16 , 0);

  const tomb1Clone22 = tomb1.clone("tomb13");
  tomb1Clone22.position = new Vector3(-45 , 0.2 , -15);
  tomb1Clone22.scaling = new Vector3(0.003 , 0.003 , 0.003);
  tomb1Clone22.rotation = new Vector3( 0 , -Math.PI*0.27 , 0);

  const tomb1Clone24 = tomb1.clone("tomb14");
  tomb1Clone24.position = new Vector3(-35 , 0.2 , -27);
  tomb1Clone24.scaling = new Vector3(0.003 , 0.003 , 0.003);
  tomb1Clone24.rotation = new Vector3( 0 , Math.PI*0.27  , 0);

  const tomb1Clone25 = tomb1.clone("tomb15");
  tomb1Clone25.position = new Vector3(-36 , 0.2 , -20);
  tomb1Clone25.scaling = new Vector3(0.003 , 0.003 , 0.003);
  tomb1Clone25.rotation = new Vector3( 0 , Math.PI*0.47  , 0);


  const tomb2 = await LoadTomb2(sceneInfo.scene);
  tomb2.position = new Vector3(33 , 0.2 , -16);
  tomb2.scaling = new Vector3(0.003 , 0.003 , 0.003);
  tomb2.rotation = new Vector3( 0 , Math.PI , 0);
  tomb2.isVisible = true;

  const tomb2Clone = tomb2.clone("tomb2");
  tomb2Clone.position = new Vector3(39 , 0.2 , -17);
  tomb2Clone.scaling = new Vector3(0.003 , 0.003 , 0.003);
  tomb2Clone.rotation = new Vector3( 0 , Math.PI*0.8 , 0);


  const tomb2Clone21 = tomb2.clone("tomb2");
  tomb2Clone21.position = new Vector3(-39 , 0.2 , -10);
  tomb2Clone21.scaling = new Vector3(0.003 , 0.003 , 0.003);
  tomb2Clone21.rotation = new Vector3( 0 , Math.PI*0.8 , 0);

  const tomb2Clone22 = tomb2.clone("tomb2");
  tomb2Clone22.position = new Vector3(-39 , 0.2 , -30);
  tomb2Clone22.scaling = new Vector3(0.003 , 0.003 , 0.003);
  tomb2Clone22.rotation = new Vector3( 0 , Math.PI*0.8 , 0);
  


  const maus = await LoadTMausoleum(sceneInfo.scene);
  const statue1 = await LoadStatue1(sceneInfo.scene);
  const statue2 = await LoadStatue2(sceneInfo.scene);
  const center = await LoadCentergraves(sceneInfo.scene);
  
  const trees = await LoadTrees(sceneInfo.scene);
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

  const treesClone21 = trees.clone("treesClone2");
  treesClone21.position = new Vector3(-45 , 0.3, -10); 
  treesClone21.scaling = new Vector3(0.015 , 0.015, 0.015);
  treesClone21.rotation = new Vector3( 0 ,  -Math.PI*0.4 , 0);

  const treesClone22 = trees.clone("treesClone2");
  treesClone22.position = new Vector3(-45 , 0.3, -30); 
  treesClone22.scaling = new Vector3(0.015 , 0.015, 0.015);
  treesClone22.rotation = new Vector3( 0 ,  -Math.PI*0.5 , 0);

  const treesClone23 = trees.clone("treesClone2");
  treesClone23.position = new Vector3(-20 , 0.3, -40); 
  treesClone23.scaling = new Vector3(0.015 , 0.015, 0.015);
  treesClone23.rotation = new Vector3( 0 ,  0 , 0);



  const trees2 = await LoadTrees2(sceneInfo.scene);
  trees2.position = new Vector3(45 , 0.3, -21);
  trees2.scaling = new Vector3(0.005 , 0.005, 0.005);
  trees2.rotation = new Vector3( 0 ,  0 , Math.PI*0.008);

  const trees2Clone = trees2.clone("trees2clone");
  trees2Clone.position = new Vector3(40 , 0.3, -31);
  trees2Clone.scaling = new Vector3(0.005 , 0.005, 0.005);
  trees2Clone.rotation = new Vector3( 0 ,  -Math.PI*0.6 , Math.PI*0.008);

  const trees2Clone21 = trees2.clone("trees2clone");
  trees2Clone21.position = new Vector3(-43 , 0.3, -43);
  trees2Clone21.scaling = new Vector3(0.005 , 0.005, 0.005);
  trees2Clone21.rotation = new Vector3( 0 ,  Math.PI*0.5 , Math.PI*0.008);

  const trees2Clone22 = trees2.clone("trees2clone");
  trees2Clone22.position = new Vector3(-38 , 0.3, -24);
  trees2Clone22.scaling = new Vector3(0.005 , 0.005, 0.005);
  trees2Clone22.rotation = new Vector3( 0 ,  Math.PI*0.2 , Math.PI*0.008);
  


  const grass = await LoadGrass (sceneInfo.scene);
  grass.position = new Vector3(4 , 0, -17);
  grass.scaling = new Vector3(0.02 , 0.01, 0.02);
  grass.rotation = new Vector3( 0 ,  0 , 0);


  const tree = await LoadTree (sceneInfo.scene);
  tree.position = new Vector3(39 , 0.2, -7);
  tree.scaling = new Vector3(0.015 , 0.015, 0.015);
  tree.rotation = new Vector3( -Math.PI*0.05 ,  Math.PI*0.5 , 0);

  const treeClone = tree.clone ("treeclone");
  treeClone.position = new Vector3(44 , 0.2, -42);
  treeClone.scaling = new Vector3(0.017 , 0.017, 0.017);
  treeClone.rotation = new Vector3( -Math.PI*0.05 ,  Math.PI*0.5 , 0);
  


  if(options.settings.shadows){

    //Creating shadows variable and adding enemy shadows
    map1Shadows = new ShadowGenerator(4096, light);

    map1Shadows.addShadowCaster(enemy.meshdata.mesh);
    map1Shadows.addShadowCaster(fence[0]);
    map1Shadows.addShadowCaster(tomb1);
    map1Shadows.addShadowCaster(tomb1Clone);
    map1Shadows.addShadowCaster(tomb1Clone1);
    map1Shadows.addShadowCaster(tomb1Clone2);
    map1Shadows.addShadowCaster(tomb1Clone4);
    map1Shadows.addShadowCaster(tomb1Clone5);
    map1Shadows.addShadowCaster(tomb1Clone20);
    map1Shadows.addShadowCaster(tomb1Clone21);
    map1Shadows.addShadowCaster(tomb1Clone22);
    map1Shadows.addShadowCaster(tomb1Clone24);
    map1Shadows.addShadowCaster(tomb1Clone25);
    map1Shadows.addShadowCaster(tomb2);
    map1Shadows.addShadowCaster(tomb2Clone);
    map1Shadows.addShadowCaster(tomb2Clone21);
    map1Shadows.addShadowCaster(tomb2Clone22);
    map1Shadows.addShadowCaster(tree);
    map1Shadows.addShadowCaster(treeClone);
    map1Shadows.addShadowCaster(trees);
    map1Shadows.addShadowCaster(treesClone2);
    map1Shadows.addShadowCaster(treesClone21);
    map1Shadows.addShadowCaster(treesClone22);
    map1Shadows.addShadowCaster(treesClone23);
    map1Shadows.addShadowCaster(treesClone3);
    map1Shadows.addShadowCaster(trees2);
    map1Shadows.addShadowCaster(trees2Clone);
    map1Shadows.addShadowCaster(trees2Clone21);
    map1Shadows.addShadowCaster(trees2Clone22);
    map1Shadows.addShadowCaster(grass);
    map1Shadows.addShadowCaster(maus);
    map1Shadows.addShadowCaster(statue1);
    map1Shadows.addShadowCaster(statue2);
    map1Shadows.addShadowCaster(center);
    
    map1Shadows.setDarkness(-100.0);
    map1Shadows.useContactHardeningShadow = true;
    map1Shadows.useExponentialShadowMap = true;
    map1Shadows.usePoissonSampling = true;
    
  }

  for(var i = 1 ; i < 7 ; i++){
    if (i !== 1) {
      const fenceClone = fence[0].clone("fenceClone");
      fenceClone.position = new Vector3(-2+(8*i) , 2 , 0);
      fenceClone.scaling = new Vector3(4 , 4 , 4);

      const fencewallClone = fence[8].clone("fencewallClone");
      fencewallClone.position = fenceClone.position
      fencewallClone.scaling = fenceClone.scaling

      if(options.settings.shadows){
        map1Shadows.addShadowCaster(fenceClone);
      }
    }

    const fenceClone1 = fence[0].clone("fencewallClone1");
    fenceClone1.position = new Vector3(-(-2+(8*i)) , 2 , 0);
    fenceClone1.scaling = new Vector3(4 , 4 , 4);

    const fencewallClone1 = fence[8].clone("fencewallClone1");
    fencewallClone1.position = fenceClone1.position;
    fencewallClone1.scaling = fenceClone1.scaling;

    if(options.settings.shadows){
      map1Shadows.addShadowCaster(fenceClone1);
    }

    const fenceClone2 = fence[0].clone("fencewallClone2");
    fenceClone2.position = new Vector3(49.4 , 2 , -(-3.2+8*i));
    fenceClone2.scaling = new Vector3(4 , 4 , 4);
    fenceClone2.rotation = new Vector3( 0 ,  Math.PI*0.5 , 0);
    
    const fencewallClone2 = fence[8].clone("fencewallClone2");
    fencewallClone2.position = fenceClone2.position;
    fencewallClone2.scaling = fenceClone2.scaling;
    fencewallClone2.rotation = fenceClone2.rotation;

    if(options.settings.shadows){
      map1Shadows.addShadowCaster(fenceClone2);
    }

    const fenceClone3 = fence[0].clone("fenceClone3");
    fenceClone3.position = new Vector3(-49.4 , 2 , -(-3.2+8*i));
    fenceClone3.scaling = new Vector3(4 , 4 , 4);
    fenceClone3.rotation = new Vector3( 0 ,  Math.PI*0.5 , 0);

    const fencewallClone3 = fence[8].clone("fencewallClone3");
    fencewallClone3.position = fenceClone3.position;
    fencewallClone3.scaling = fenceClone3.scaling;
    fencewallClone3.rotation = fenceClone3.rotation ;

    if(options.settings.shadows){
      map1Shadows.addShadowCaster(fenceClone3);
    }

    const fenceClone4 = fence[0].clone("fenceClone4");
    fenceClone4.position = new Vector3(-2+(8*i) , 2 , -49);
    fenceClone4.scaling = new Vector3(4 , 4 , 4);

    const fencewallClone4 = fence[8].clone("fencewallClone4");
    fencewallClone4.position = fenceClone4.position;
    fencewallClone4.scaling = fenceClone4.scaling;

    if(options.settings.shadows){
      map1Shadows.addShadowCaster(fenceClone4);
    }

    const fenceClone5 = fence[0].clone("fenceClone5");
    fenceClone5.position = new Vector3(2-(8*i) , 2 , -49);
    fenceClone5.scaling = new Vector3(4 , 4 , 4);

    const fencewallClone5 = fence[8].clone("fencewallClone5");
    fencewallClone5.position = fenceClone5.position;
    fencewallClone5.scaling = fenceClone5.scaling;

    if(options.settings.shadows){
      map1Shadows.addShadowCaster(fenceClone5);
    }
  }
}

async function LoadFence1(scene) {
  const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "graveyard_fence.glb", scene);
  const fence = meshes[0];
  meshes[2].showBoundingBox = false;
  const mesh = meshes[2]

  const boundingBox = mesh.getBoundingInfo().boundingBox;

  const sizeVector = boundingBox.maximum.subtract(boundingBox.minimum);
  const centerVector = boundingBox.minimum.add(sizeVector.scale(0.5));
  boundingBox.minimum = centerVector.subtract(sizeVector.scale(0.5));
  boundingBox.maximum = centerVector.add(sizeVector.scale(0.5));

  const boxSize = boundingBox.maximum.subtract(boundingBox.minimum);
  const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
    width: boxSize.x,
    height: boxSize.y,
    depth: boxSize.z
  }, scene);
  boxMesh.isVisible = false;
  boxMesh.checkCollisions = true;

  fence.scaling = new Vector3(4, 4, 4);
  fence.position = new Vector3(6, 2, 0);
  boxMesh.scaling = fence.scaling
  boxMesh.position = fence.position

  meshes.push(boxMesh)

  fence.isPickable = true;
  fence.isVisible = false;

  return meshes;
}

async function LoadTomb1(scene) {

  const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "tomb1.glb", scene);
  var tomb1 = meshes[0];
  return tomb1;  
}

async function LoadTomb2(scene) {

  const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "tomb2.glb", scene);
  var tomb2 = meshes[0];
  return tomb2;  
}

async function LoadTMausoleum(scene) {

  const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "mausoleum.glb", scene);
  const maus = meshes[0];
  maus.position = new Vector3(0, -0.5, -42);
  maus.scaling = new Vector3(4, 4, 4);
  maus.rotation = new Vector3(0, Math.PI * 0.5, 0);

  const mesh = meshes[2];
  meshes[2].showBoundingBox = false;

  const boundingBox = mesh.getBoundingInfo().boundingBox;

  const sizeVector = boundingBox.maximum.subtract(boundingBox.minimum);
  const centerVector = boundingBox.minimum.add(sizeVector.scale(0.5));
  boundingBox.minimum = centerVector.subtract(sizeVector.scale(0.5));
  boundingBox.maximum = centerVector.add(sizeVector.scale(0.5));

  const boxSize = boundingBox.maximum.subtract(boundingBox.minimum);
  const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
    width: boxSize.x,
    height: boxSize.y,
    depth: boxSize.z
  }, scene);
  boxMesh.isVisible = false;
  boxMesh.checkCollisions = true;
  boxMesh.position = maus.position;
  boxMesh.scaling = new Vector3(1.8, 40, 1.5);
  meshes.push(boxMesh)

  return maus

}

async function LoadStatue1(scene) {

  const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "frank.glb", scene);
  const statue1 = meshes[0];
  statue1.position = new Vector3(8.5 , 1.8, -46);
  statue1.scaling = new Vector3(3 , 3 , 3);
  statue1.rotation = new Vector3( 0 , 0 , 0);
  return statue1

}

async function LoadStatue2(scene) {

  const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "frank.glb", scene);
  const statue = meshes[0];
  statue.position = new Vector3(-8.5 , 1.8, -46);
  statue.scaling = new Vector3(3 , 3 , 3);
  statue.rotation = new Vector3( 0 , 0 , 0);
  return statue

}

async function LoadCentergraves(scene) {

  const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "graveyard_of_gravestones.glb", scene);
  const graves = meshes[0];
  meshes[1].showBoundingBox = false;
  graves.position = new Vector3(-2, -0.5, -20);
  graves.scaling = new Vector3(1.5, 1.5, 1.5);

  const bound = MeshBuilder.CreateBox("boundingBoxMesh", {
    width: 12,
    height: 5,
    depth: 7
  }, scene);
  bound.position = graves.position;
  bound.isVisible = false;
  bound.checkCollisions = true;

  return graves

}
async function LoadGrass (scene) {

  const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "grass_patches.glb", scene);
  const grass = meshes[0];
  return grass

}

async function LoadTrees (scene) {

  const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "trees.glb", scene);
  const trees = meshes[0];
  return trees;

}

async function LoadTrees2 (scene) {

  const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "trees (1).glb", scene);
  const trees2 = meshes[0];
  return trees2;

}

async function LoadTree (scene) {

  const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/map1/", "tree.glb", scene);
  const tree = meshes[0];
  return tree;
}

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

function createInvWalls(scene) {
  const walls = [
    {
      width: 57,
      height: 10,
      depth: 0.5,
      position: new Vector3(-2, 0, -34),
      rotation: RotationFromDegrees(0, 0, 0)
    },
    {
      width: 34,
      height: 10,
      depth: 0.5,
      position: new Vector3(-30.5, 0, -17),
      rotation: RotationFromDegrees(0, 90, 0)
    },
    {
      width: 34,
      height: 10,
      depth: 0.5,
      position: new Vector3(26.5, 0, -17),
      rotation: RotationFromDegrees(0, 90, 0)
    }
  ]
  
  for (const wall of walls) {
    const bound = MeshBuilder.CreateBox("invWall", {
      width: wall.width,
      height: wall.height,
      depth: wall.depth
    }, scene);
    bound.position = wall.position;
    bound.rotation = wall.rotation;
    bound.isVisible = false;
    bound.checkCollisions = true;
  }
}

const map1Builder = {
  map1,
}

export default map1Builder
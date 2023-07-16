import {
    SceneLoader,
    MeshBuilder,
    Vector3
} from "@babylonjs/core";

import { RotationFromDegrees } from "../../libs/angles";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map3/", "rocks.glb", scene).then((result) => {
    rocks.meshes = result.meshes;
    rocks.mesh = result.meshes[0];
    rocks.mesh.scaling = new Vector3(1.5, 1.5, 2.0);
    rocks.mesh.position = new Vector3(50, 0, -20);  
    //console.log(rocks);  
    Loadbox1(rocks.meshes , scene);  
    Loadbox2(rocks.meshes , scene); 
    Loadbox3(rocks.meshes , scene); 
    Loadbox4(rocks.meshes , scene); 
    Loadbox5(rocks.meshes , scene); 
    Loadbox6(rocks.meshes , scene); 
    Loadbox7(rocks.meshes , scene); 
    Loadbox8(rocks.meshes , scene); 
    Loadbox9(rocks.meshes , scene); 
    Loadbox10(rocks.meshes , scene); 
    Loadbox11(rocks.meshes , scene); 
    Loadbox12(rocks.meshes , scene); 
    Loadbox13(rocks.meshes , scene); 
    Loadbox14(rocks.meshes , scene); 
    Loadbox15(rocks.meshes , scene); 


    return result
  });
}

async function Loadbox1(rock , scene){
    const mesh = rock[1];
    //console.log(rock)

    rock[1].showBoundingBox = false;
  
    const boundingBox = mesh.getBoundingInfo().boundingBox;
    const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
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
   // console.log(boxSize)
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
   // console.log(boxSize)
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
    //console.log(boxSize)
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
    //console.log(boxSize)
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
    //console.log(boxSize)
    const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: 10,
      height: 6,
      depth: 7
    }, scene);
    boxMesh.isVisible = false;
    boxMesh.checkCollisions = true;

    boxMesh.position = new Vector3(19.5, 1.6 , -19.4);
    boxMesh.rotation = RotationFromDegrees(0,-25,0);
    boxMesh.scaling = new Vector3(1.0, 1.5, 1.3);

}

async function Loadbox7(rock , scene){
    const mesh = rock[7];

    rock[7].showBoundingBox = false;
  
    const boundingBox = mesh.getBoundingInfo().boundingBox;
    const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
    //console.log(boxSize)
    const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: boxSize.x,
      height: boxSize.y,
      depth: boxSize.z
    }, scene);
    boxMesh.isVisible = false;
    boxMesh.checkCollisions = true;

    boxMesh.position = new Vector3(1.5 , 1.6   , -21);
    boxMesh.scaling = new Vector3(1.4, 1.5, 1.9);

}


async function Loadbox8(rock , scene){
    const mesh = rock[8];

    rock[8].showBoundingBox = false;
  
    const boundingBox = mesh.getBoundingInfo().boundingBox;
    const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
    //console.log(boxSize)
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
    //console.log(boxSize)
    const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: boxSize.x,
      height: boxSize.y,
      depth: boxSize.z
    }, scene);
    boxMesh.isVisible = false;
    boxMesh.checkCollisions = true;

    boxMesh.position = new Vector3(-42.2 , 1.2  , -19.2);
    boxMesh.scaling = new Vector3(1.4, 1.5, 1.9);

}

async function Loadbox10(rock , scene){
    const mesh = rock[10];

    rock[10].showBoundingBox = false;
  
    const boundingBox = mesh.getBoundingInfo().boundingBox;
    const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
    //console.log(boxSize)
    const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: boxSize.x,
      height: boxSize.y,
      depth: boxSize.z
    }, scene);
    boxMesh.isVisible = false;
    boxMesh.checkCollisions = true;

    boxMesh.position = new Vector3(-10.7 , 1.2  , -37);
    boxMesh.scaling = new Vector3(1, 1.5, 1.2);
    boxMesh.rotation = new Vector3(0 , 0 , 0);
}


async function Loadbox11(rock , scene){
    const mesh = rock[11];

    rock[11].showBoundingBox = false;
  
    const boundingBox = mesh.getBoundingInfo().boundingBox;
    const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
    //console.log(boxSize)
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
    //console.log(boxSize)
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
    //console.log(boxSize)
    const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: boxSize.x,
      height: boxSize.y,
      depth: boxSize.z
    }, scene);
    boxMesh.isVisible = false;
    boxMesh.checkCollisions = true;

    boxMesh.position = new Vector3(27.2 , 1.2  , 17);
    boxMesh.scaling = new Vector3(1.4, 1.5, 1.9);

}

async function Loadbox14(rock , scene){
const mesh = rock[14];

rock[14].showBoundingBox = false;

const boundingBox = mesh.getBoundingInfo().boundingBox;
const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
//console.log(boxSize)
const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
  width: boxSize.x,
  height: boxSize.y,
  depth: boxSize.z
}, scene);
boxMesh.isVisible = false;
boxMesh.checkCollisions = true;

boxMesh.position = new Vector3(-7 , 1.2  , 15.5);
boxMesh.scaling = new Vector3(1.5, 1.5, 2.0);


}

async function Loadbox15(rock , scene){
const mesh = rock[15];

rock[15].showBoundingBox = false;

const boundingBox = mesh.getBoundingInfo().boundingBox;
const boxSize = boundingBox.maximumWorld.subtract(boundingBox.minimumWorld);
//console.log(boxSize)
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

const rocks = {
  meshes: undefined,
  mesh: undefined,
  clones: [], // Initialize an empty array to store the clones
  loadAsync,

};

export default rocks;
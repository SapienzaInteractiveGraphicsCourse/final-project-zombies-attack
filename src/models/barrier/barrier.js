import {
    SceneLoader,
    MeshBuilder,
    Vector3
} from "@babylonjs/core";
import { RotationFromDegrees } from "../../libs/angles";

async function loadAsync(scene) {
    
    return SceneLoader.ImportMeshAsync("", "./models/map2/", "barrier.glb", scene).then((result) => {
        barrier.meshes = result.meshes;
        barrier.mesh = result.meshes[0];
        result.meshes[0].showBoundingBox = false;
        const mesh = result.meshes[0]
      
        const boundBarrier= MeshBuilder.CreateBox("boundingBoxMesh", {
            width: 5.5,
            height:4,
            depth: 0.5
          }, scene);
          boundBarrier.position = new Vector3(-49.5 , 0 , -31.5);
          boundBarrier.isVisible = false;
          boundBarrier.checkCollisions = true;
          boundBarrier.rotation = RotationFromDegrees(0,90,0);

        mesh.scaling = new Vector3(2, 2, 2);
        barrier.mesh.position = new Vector3(-49.5 , 0 , -31.5);
        barrier.mesh.rotation = RotationFromDegrees(0,90,0);
        
    
        barrier.mesh.isPickable = true;
        barrier.mesh.isVisible = false;

        return result;
    });
}

function addClone(position, scaling, rotation, scene) {

    let mesh = barrier.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newClone = mesh.clone("barrier");
    newClone.setEnabled(true);

    newClone.position = position;

    newClone.scaling = scaling;

    newClone.rotation = rotation;

    const boundingBox = mesh.getBoundingInfo().boundingBox;

    const sizeVector = boundingBox.maximum.subtract(boundingBox.minimum);
    const centerVector = boundingBox.minimum.add(sizeVector.scale(0.5));
    boundingBox.minimum = centerVector.subtract(sizeVector.scale(0.5));
    boundingBox.maximum = centerVector.add(sizeVector.scale(0.5));
    
    const boxSize = boundingBox.maximum.subtract(boundingBox.minimum);
    /* const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: boxSize.x,
      height: boxSize.y,
      depth: boxSize.z
    }, scene);
    boxMesh.isVisible = false;
    boxMesh.checkCollisions = true; */
    const boundBarrier = MeshBuilder.CreateBox("boundingBoxMesh", {
        width: 5.5,
        height:4,
        depth: 0.5
      }, scene);
      boundBarrier.position = position;
      boundBarrier.rotation = rotation;
      boundBarrier.isVisible = false;
      boundBarrier.checkCollisions = true;
  
    //result.meshes.push(boxMesh)

    barrier.clones.push(newClone)
}

const barrier = {
    meshes: undefined,
    mesh: undefined,
    addClone,
    clones: [],
    loadAsync,
};

export default barrier;
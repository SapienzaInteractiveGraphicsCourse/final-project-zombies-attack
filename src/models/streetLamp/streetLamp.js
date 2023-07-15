import {
    SceneLoader,
    MeshBuilder,
    Vector3
} from "@babylonjs/core";
import { RotationFromDegrees } from "../../libs/angles";


async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map2/", "streetLamp.glb", scene).then((result) => {
        streetLamp.meshes = result.meshes;
        streetLamp.mesh = result.meshes[0];
        result.meshes[0].showBoundingBox = false;
        const mesh = result.meshes[0]
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;

        const sizeVector = boundingBox.maximum.subtract(boundingBox.minimum);
        const centerVector = boundingBox.minimum.add(sizeVector.scale(0.5));
        boundingBox.minimum = centerVector.subtract(sizeVector.scale(0.5));
        boundingBox.maximum = centerVector.add(sizeVector.scale(0.5));
      
        /* const boxSize = boundingBox.maximum.subtract(boundingBox.minimum);
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: boxSize.x,
          height: boxSize.y,
          depth: boxSize.z
        }, scene);

        boxMesh.isVisible = false;
        boxMesh.checkCollisions = true; */

        mesh.scaling = new Vector3(0.01 , 0.01, 0.01);
        streetLamp.mesh.position = new Vector3(40 , 0 , 30);
        streetLamp.mesh.rotation = RotationFromDegrees(0,270,0);

       /*  boxMesh.scaling = streetLamp.mesh.scaling
        boxMesh.position = streetLamp.mesh.position */
      
        //result.meshes.push(boxMesh)
      
        streetLamp.mesh.isPickable = true;
        streetLamp.mesh.isVisible = false;

        const boundLamp = MeshBuilder.CreateBox("boundingBoxMesh", {
            width: 1,
            height: 10,
            depth: 1
          }, scene);
          boundLamp.position = new Vector3(40 , 0 , 30);
          boundLamp.rotation = RotationFromDegrees(0,0,0);
          boundLamp.isVisible = false;
          boundLamp.checkCollisions = true;

        return result;
    });

}

function addClone(position, scaling, rotation, scene) {

    let mesh = streetLamp.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newClone = mesh.clone("lamp");
    newClone.setEnabled(true);

    newClone.position = position;

    newClone.scaling = scaling;

    newClone.rotation = rotation;

    streetLamp.clones.push(newClone)

    const boundingBox = mesh.getBoundingInfo().boundingBox;

    const sizeVector = boundingBox.maximum.subtract(boundingBox.minimum);
    const centerVector = boundingBox.minimum.add(sizeVector.scale(0.5));
    boundingBox.minimum = centerVector.subtract(sizeVector.scale(0.5));
    boundingBox.maximum = centerVector.add(sizeVector.scale(0.5));
    
    //const boxSize = boundingBox.maximum.subtract(boundingBox.minimum);
    /* const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
      width: boxSize.x,
      height: boxSize.y,
      depth: boxSize.z
    }, scene);
    boxMesh.isVisible = false;
    boxMesh.checkCollisions = true; */
    const boundLamp = MeshBuilder.CreateBox("boundingBoxMesh", {
        width: 1,
        height: 10,
        depth: 1
      }, scene);
      boundLamp.position = position;
      boundLamp.isVisible = false;
      boundLamp.checkCollisions = true;
  
}

const streetLamp = {
    meshes: undefined,
    mesh: undefined,
    addClone,
    loadAsync,
    clones: []
};

export default streetLamp;
import {
    SceneLoader,
    MeshBuilder,
    Vector3
} from "@babylonjs/core";
import { RotationFromDegrees } from "../../libs/angles";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map2/", "car2.glb", scene).then((result) => {
        car2.meshes = result.meshes;
        car2.mesh = result.meshes[0];
        result.meshes[0].showBoundingBox = false;
        const mesh = result.meshes[0]
      
        const boundcars2 = MeshBuilder.CreateBox("boundingBoxMesh", {
            width: 7.6,
            height: 7,
            depth: 2.6
          }, scene);
          boundcars2.position = new Vector3(18 , -1.5 , 15);
          boundcars2.rotation = RotationFromDegrees(0,0,0);
          boundcars2.isVisible = false;
          boundcars2.checkCollisions = true;

        
      
        mesh.scaling = new Vector3(1.5 , 1.5, 1.5);
        car2.mesh.position = new Vector3(20 , -1.5 , 15);
    
      
        car2.mesh.isPickable = true;
        car2.mesh.isVisible = false;

        return result;
    });
}

function addClone(position, scaling, rotation, scene) {

    let mesh = car2.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newClone = mesh.clone("car2");
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
    const boundCar2 = MeshBuilder.CreateBox("boundingBoxMesh", {
        width: 7.6,
            height: 7,
            depth: 2.6
      }, scene);
      boundCar2.position = new Vector3(-18 , -1.5 ,-15);
      boundCar2.isVisible = false;
      boundCar2.checkCollisions = true;
  
  

    car2.clones.push(newClone)
}

const car2 = {
    meshes: undefined,
    mesh: undefined,
    addClone,
    loadAsync,
    clones: []
};

export default car2;
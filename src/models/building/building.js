import {
    SceneLoader,
    MeshBuilder,
    Vector3
} from "@babylonjs/core";
import { RotationFromDegrees } from "../../libs/angles";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map2/", "building.glb", scene).then((result) => {
        building.meshes = result.meshes;
        building.mesh = result.meshes[0];
        result.meshes[0].showBoundingBox = false;
        const mesh = result.meshes[0]
      
        const boundBuilding = MeshBuilder.CreateBox("boundingBoxMesh", {
            width: 37,
            height: 40,
            depth: 19
          }, scene);
          boundBuilding.position = new Vector3(-32.5 , 0 , -42.5);
          boundBuilding.rotation = RotationFromDegrees(0,0,0);
          boundBuilding.isVisible = false;
          boundBuilding.checkCollisions = true;

        
      
        mesh.scaling = new Vector3(100 , 100, 100);
        building.mesh.position = new Vector3(-32.5 , 0 , -42.5);
        

      
        building.mesh.isPickable = true;
        building.mesh.isVisible = false;

        

        return result;
    });
}

function addClone(position, scaling, rotation, scene) {

    let mesh = building.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newClone = mesh.clone("building");
    newClone.setEnabled(true);

    newClone.position = position;

    newClone.scaling = scaling;

    newClone.rotation = rotation;

    building.clones.push(newClone)

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
    const boundBuilding = MeshBuilder.CreateBox("boundingBoxMesh", {
        width: 37,
        height: 40,
        depth: 19
      }, scene);
      boundBuilding.position = position;
      boundBuilding.isVisible = false;
      boundBuilding.checkCollisions = true;
  
}

const building = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addClone,
    clones: []
};

export default building;
    
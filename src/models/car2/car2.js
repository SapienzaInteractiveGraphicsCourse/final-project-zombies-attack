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

const car2 = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
};

export default car2;
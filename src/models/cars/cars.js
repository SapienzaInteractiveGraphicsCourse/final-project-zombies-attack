import {
    SceneLoader,
    MeshBuilder,
    Vector3
} from "@babylonjs/core";
import { RotationFromDegrees } from "../../libs/angles";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map2/", "cars.glb", scene).then((result) => {
        cars.meshes = result.meshes;
        cars.mesh = result.meshes[0];
        result.meshes[0].showBoundingBox = false;
        const mesh = result.meshes[0]

        mesh.scaling = new Vector3(1.1 , 1.1, 1.1);
        cars.mesh.position = new Vector3(0 , 0 , 0);
        cars.mesh.rotation = RotationFromDegrees(0,30,0);

        
      
        const boundcars1 = MeshBuilder.CreateBox("boundingBoxMesh", {
            width: 2.6,
            height: 4,
            depth: 7.3
          }, scene);
          boundcars1.position = new Vector3(-3.1 , 0 , 1);
          boundcars1.rotation = RotationFromDegrees(0,30,0);
          boundcars1.isVisible = false;
          boundcars1.checkCollisions = true;
      
          const boundcars2 = MeshBuilder.CreateBox("boundingBoxMesh", {
            width: 2.6,
            height: 4,
            depth: 7
          }, scene);
          boundcars2.position = new Vector3(1.9 , 0 , -3);
          boundcars2.rotation = RotationFromDegrees(0,30,0);
          boundcars2.isVisible = false;
          boundcars2.checkCollisions = true;
      
        cars.mesh.isPickable = true;
        cars.mesh.isVisible = false;

        return result;
    });
}

const cars = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
};

export default cars;
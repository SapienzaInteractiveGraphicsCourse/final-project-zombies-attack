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
            width: 39,
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

const building = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
};

export default building;
    
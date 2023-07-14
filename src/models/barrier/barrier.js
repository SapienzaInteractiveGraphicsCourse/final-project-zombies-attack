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
          boundBarrier.isVisible = true;
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

const barrier = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
};

export default barrier;
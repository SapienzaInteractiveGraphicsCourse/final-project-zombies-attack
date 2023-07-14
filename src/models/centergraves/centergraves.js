import {
    SceneLoader,
    Vector3,
    MeshBuilder
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map1/", "graveyard_of_gravestones.glb", scene).then((result) => {
        const graves = result.meshes[0];
        result.meshes[1].showBoundingBox = false;
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
    });
}

const centergraves = {
    loadAsync,
};

export default centergraves;
import {
    SceneLoader,
    Vector3
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map1/", "trees.glb", scene).then((result) => {
        trees1.meshes = result.meshes;
        trees1.mesh = result.meshes[0];
        trees1.mesh.position = new Vector3(45, 0.3, -10); 
        trees1.mesh.scaling = new Vector3(0.015, 0.015, 0.015);
        trees1.mesh.rotation = new Vector3(0, Math.PI*0.5, 0)
        return result;
    });
}

const trees1 = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
};

export default trees1;
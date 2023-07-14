import {
    SceneLoader,
    Vector3
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map1/", "tomb2.glb", scene).then((result) => {
        tomb2.meshes = result.meshes;
        tomb2.mesh = result.meshes[0];
        tomb2.mesh.position = new Vector3(33, 0.2, -16);
        tomb2.mesh.scaling = new Vector3(0.003, 0.003, 0.003);
        tomb2.mesh.rotation = new Vector3(0, Math.PI, 0);
        tomb2.mesh.isVisible = true;
        return result;
    });
}

const tomb2 = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
};

export default tomb2;
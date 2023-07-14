import {
    SceneLoader,
    Vector3
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map1/", "tomb1.glb", scene).then((result) => {
        tomb1.meshes = result.meshes;
        tomb1.mesh = result.meshes[0];
        tomb1.mesh.position = new Vector3(33, 0.2, -12);
        tomb1.mesh.scaling = new Vector3(0.003, 0.003, 0.003);
        tomb1.mesh.rotation = new Vector3(0, Math.PI, 0);
        tomb1.mesh.isVisible = true;
        return result;
    });
}

const tomb1 = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
};

export default tomb1;
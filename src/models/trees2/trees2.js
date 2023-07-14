import {
    SceneLoader,
    Vector3
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map1/", "trees (1).glb", scene).then((result) => {
        trees2.meshes = result.meshes;
        trees2.mesh = result.meshes[0];
        trees2.mesh.position = new Vector3(45, 0.3, -21);
        trees2.mesh.scaling = new Vector3(0.005, 0.005, 0.005);
        trees2.mesh.rotation = new Vector3(0, 0, Math.PI * 0.008);

        return result;
    });
}

const trees2 = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
};

export default trees2;
import {
    SceneLoader,
    Vector3
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map1/", "frank.glb", scene).then((result) => {
        const mesh = result.meshes[0];
        mesh.position = new Vector3(8.5, 1.8, -46);
        mesh.scaling = new Vector3(3, 3, 3);
        mesh.rotation = new Vector3(0, 0, 0);
        return mesh
    });
}

const statue = {
    loadAsync,
};

export default statue;
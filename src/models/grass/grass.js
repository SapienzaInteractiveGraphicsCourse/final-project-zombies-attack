import {
    SceneLoader,
    Vector3
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map1/", "grass_patches.glb", scene).then((result) => {
        const mesh = result.meshes[0];
        mesh.position = new Vector3(4, 0, -17);
        mesh.scaling = new Vector3(0.02, 0.01, 0.02);
        mesh.rotation = new Vector3(0, 0, 0);
        return mesh
    });
}

const grass = {
    loadAsync,
};

export default grass;
import {
    SceneLoader,
    Vector3
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map1/", "tree.glb", scene).then((result) => {
        tree.meshes = result.meshes;
        tree.mesh = result.meshes[0];
        tree.mesh.position = new Vector3(39 , 0.2, -7);
        tree.mesh.scaling = new Vector3(0.015, 0.015, 0.015);
        tree.mesh.rotation = new Vector3(-Math.PI * 0.05,  Math.PI * 0.5, 0);
        
        return result;
    });
}

const tree = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
};

export default tree;
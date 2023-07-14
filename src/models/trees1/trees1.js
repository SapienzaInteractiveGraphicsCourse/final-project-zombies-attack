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

function addClone(position, scaling, rotation) {

    let mesh = trees1.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newClone = mesh.clone("trees1");
    newClone.setEnabled(true);

    newClone.position = position;

    newClone.scaling = scaling;

    newClone.rotation = rotation;

    trees1.clones.push(newClone)
}

const trees1 = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addClone,
    clones: []
};

export default trees1;
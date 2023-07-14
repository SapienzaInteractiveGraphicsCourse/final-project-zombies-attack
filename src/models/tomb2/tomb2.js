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

function addClone(position, scaling, rotation) {

    let mesh = tomb2.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newClone = mesh.clone("tomb1");
    newClone.setEnabled(true);

    newClone.position = position;

    newClone.scaling = scaling;

    newClone.rotation = rotation;


    tomb2.clones.push(newClone)
}

const tomb2 = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addClone,
    clones: []
};

export default tomb2;
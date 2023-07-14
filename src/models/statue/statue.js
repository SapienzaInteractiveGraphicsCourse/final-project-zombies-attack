import {
    SceneLoader,
    Vector3
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map1/", "frank.glb", scene).then((result) => {
        statue.meshes = result.meshes;
        statue.mesh = result.meshes[0];
        statue.mesh.position = new Vector3(8.5, 1.8, -46);
        statue.mesh.scaling = new Vector3(3, 3, 3);
        statue.mesh.rotation = new Vector3(0, 0, 0);
        return result
    });
}

function addClone(position, scaling, rotation) {

    let mesh = statue.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newClone = mesh.clone("statue");
    newClone.setEnabled(true);

    newClone.position = position;

    newClone.scaling = scaling;

    newClone.rotation = rotation;


    statue.clones.push(newClone)
}

const statue = {
    loadAsync,
    addClone,
    meshes: undefined,
    mesh: undefined,
    clones: []
};

export default statue;
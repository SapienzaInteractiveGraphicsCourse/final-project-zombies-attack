import {
    SceneLoader,
    Vector3
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map3/", "cactus.glb", scene).then((result) => {
    cactus.meshes = result.meshes;
    cactus.mesh = result.meshes[0];
    cactus.scaling = new Vector3(1.5, 1.5, 1.5);
    cactus.position = new Vector3(48 , 0 , 0);
    
    return result
    });
}

function addClone(position, scaling, rotation) {

    let mesh = cactus.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newClone = mesh.clone("cactus");
    newClone.setEnabled(true);

    newClone.position = position;

    newClone.scaling = scaling;

    newClone.rotation = rotation;

    cactus.clones.push(newClone)
    
}


const cactus = {
    meshes: undefined,
    mesh: undefined,
    clones: [], // Initialize an empty array to store the clones
    loadAsync,
    addClone
};

export default cactus;
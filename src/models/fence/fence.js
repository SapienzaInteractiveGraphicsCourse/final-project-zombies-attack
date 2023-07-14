import {
    SceneLoader,
    MeshBuilder,
    Vector3
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map1/", "graveyard_fence.glb", scene).then((result) => {
        fence.meshes = result.meshes;
        fence.mesh = result.meshes[0];
        result.meshes[2].showBoundingBox = false;
        const mesh = result.meshes[2]
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;
      
        const sizeVector = boundingBox.maximum.subtract(boundingBox.minimum);
        const centerVector = boundingBox.minimum.add(sizeVector.scale(0.5));
        boundingBox.minimum = centerVector.subtract(sizeVector.scale(0.5));
        boundingBox.maximum = centerVector.add(sizeVector.scale(0.5));
      
        const boxSize = boundingBox.maximum.subtract(boundingBox.minimum);
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: boxSize.x,
          height: boxSize.y,
          depth: boxSize.z
        }, scene);
        boxMesh.isVisible = false;
        boxMesh.checkCollisions = true;
      
        fence.mesh.scaling = new Vector3(4, 4, 4);
        fence.mesh.position = new Vector3(6, 2, 0);
        boxMesh.scaling = fence.mesh.scaling
        boxMesh.position = fence.mesh.position
      
        result.meshes.push(boxMesh)
      
        fence.mesh.isPickable = true;
        fence.mesh.isVisible = false;

        return result;
    });
}

function addClone(position, scaling, rotation = new Vector3(0, 0, 0)) {

    let mesh = fence.mesh;
    let wall = fence.meshes[8];
    

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newClone = mesh.clone("fence");
    var newCloneWall = wall.clone("wall");
    newClone.setEnabled(true);
    newCloneWall.setEnabled(true);

    newCloneWall.position = position;

    newCloneWall.scaling = scaling;

    newCloneWall.rotation = rotation;

    newClone.position = position;

    newClone.scaling = scaling;

    newClone.rotation = rotation;

    fence.clones.push(newClone)
}

const fence = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addClone,
    clones: []
};

export default fence;
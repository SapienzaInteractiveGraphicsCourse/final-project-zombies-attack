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

const fence = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
};

export default fence;
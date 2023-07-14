import {
    SceneLoader,
    MeshBuilder,
    Vector3
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map2/", "streetLamp.glb", scene).then((result) => {
        streetLamp.meshes = result.meshes;
        streetLamp.mesh = result.meshes[1];
        result.meshes[1].showBoundingBox = false;
        const mesh = result.meshes[0]
      
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

        mesh.scaling = new Vector3(0.01 , 0.01, 0.01);
        streetLamp.mesh.position = new Vector3(40 , 0 , 30);

        boxMesh.scaling = streetLamp.mesh.scaling
        boxMesh.position = streetLamp.mesh.position
      
        result.meshes.push(boxMesh)
      
        streetLamp.mesh.isPickable = true;
        streetLamp.mesh.isVisible = false;

        return result;
    });
}

const streetLamp = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
};

export default streetLamp;
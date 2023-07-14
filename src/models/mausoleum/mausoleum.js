import {
    SceneLoader,
    MeshBuilder,
    Vector3
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map1/", "mausoleum.glb", scene).then((result) => {
        console.log(result)
        const maus = result.meshes[0];
        maus.position = new Vector3(0, -0.5, -42);
        maus.scaling = new Vector3(4, 4, 4);
        maus.rotation = new Vector3(0, Math.PI * 0.5, 0);
      
        const mesh = result.meshes[2];
        console.log(mesh)
        result.meshes[2].showBoundingBox = false;
      
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
        boxMesh.position = maus.position;
        boxMesh.scaling = new Vector3(1.8, 40, 1.5);
        result.meshes.push(boxMesh)
      
        return maus
    });
}

const mausoleum = {
    loadAsync,
};

export default mausoleum;
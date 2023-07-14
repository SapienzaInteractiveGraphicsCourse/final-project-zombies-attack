import {
    SceneLoader,
    MeshBuilder,
    Vector3
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map2/", "scene.glb", scene).then((result) => {
        slide.meshes = result.meshes;
        slide.mesh = result.meshes[0];
        result.meshes[0].showBoundingBox = false;
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
      
        

        mesh.scaling = new Vector3(2 , 2, 2);
        slide.mesh.position = new Vector3(3 , 0 , -42);

        
        

        boxMesh.scaling = slide.mesh.scaling
        boxMesh.position = slide.mesh.position
      
        result.meshes.push(boxMesh)
      
        slide.mesh.isPickable = true;
        slide.mesh.isVisible = false;

        return result;
    });
}

const slide = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
};

export default slide;
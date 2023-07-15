import {
    SceneLoader,
    MeshBuilder,
    Vector3
} from "@babylonjs/core";
import { RotationFromDegrees } from "../../libs/angles";
async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map2/", "scene.glb", scene).then((result) => {
        slide.meshes = result.meshes;
        slide.mesh = result.meshes[0];
        result.meshes[0].showBoundingBox = false;
        const mesh = result.meshes[0];

        const boundingBox = mesh.getBoundingInfo().boundingBox;

        const sizeVector = boundingBox.maximum.subtract(boundingBox.minimum);
        const centerVector = boundingBox.minimum.add(sizeVector.scale(0.5));
        boundingBox.minimum = centerVector.subtract(sizeVector.scale(0.5));
        boundingBox.maximum = centerVector.add(sizeVector.scale(0.5));
      
        /* const boxSize = boundingBox.maximum.subtract(boundingBox.minimum);
        const boxMesh = MeshBuilder.CreateBox("boundingBoxMesh", {
          width: boxSize.x,
          height: boxSize.y,
          depth: boxSize.z
        }, scene); */

        mesh.scaling = new Vector3(2 , 2, 2);
        slide.mesh.position = new Vector3(3 , 0 , -42);
        slide.mesh.rotation = RotationFromDegrees(0,90,0);

        /* boxMesh.isVisible = false;
        boxMesh.checkCollisions = true; */

        const boundSlide = MeshBuilder.CreateBox("boundingBoxMesh", {
            width: 3,
            height: 6,
            depth: 6.5
          }, scene);
          boundSlide.position = new Vector3(3 , 0 , -38);
          boundSlide.isVisible = false;
          boundSlide.checkCollisions = true;

          const boundGame1 = MeshBuilder.CreateBox("boundingBoxMesh", {
            width: 7,
            height: 6,
            depth: 5
          }, scene);
          boundGame1.position = new Vector3(5 , 0 , -42);
          boundGame1.isVisible = false;
          boundGame1.checkCollisions = true;

          const boundGame2 = MeshBuilder.CreateBox("boundingBoxMesh", {
            width: 3,
            height: 6,
            depth: 3
          }, scene);
          boundGame2.position = new Vector3(0 , 0 , -41);
          boundGame2.isVisible = false;
          boundGame2.checkCollisions = true;
    
        //result.meshes.push(boxMesh)
      

        

      
        //result.meshes.push(boxMesh)
      
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
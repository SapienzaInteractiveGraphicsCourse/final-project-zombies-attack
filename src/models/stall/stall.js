import {
    SceneLoader,
    MeshBuilder,
    Vector3
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map2/", "stall.glb", scene).then((result) => {
        stall.meshes = result.meshes;
        stall.mesh = result.meshes[0];
        result.meshes[0].showBoundingBox = false;
        const mesh = result.meshes[0]
      
        const boundStall= MeshBuilder.CreateBox("boundingBoxMesh", {
            width: 5,
            height:5,
            depth: 5
          }, scene);
          boundStall.position = new Vector3(0 , 0 , 40);
          boundStall.isVisible = false;
          boundStall.checkCollisions = true;

        mesh.scaling = new Vector3(0.02 , 0.02, 0.02);
        stall.mesh.position = new Vector3(0 , 0 , 40);

        
    
        stall.mesh.isPickable = true;
        stall.mesh.isVisible = false;

        return result;
    });
}

const stall = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
};

export default stall;
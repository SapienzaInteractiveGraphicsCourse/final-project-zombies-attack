import {
    SceneLoader,
    MeshBuilder,
    Vector3
} from "@babylonjs/core";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/map2/", "car1.glb", scene).then((result) => {
        car1.meshes = result.meshes;
        car1.mesh = result.meshes[0];
        result.meshes[0].showBoundingBox = false;
        const mesh = result.meshes[0]
      
        const boundingBox = mesh.getBoundingInfo().boundingBox;

        const sizeVector = boundingBox.maximum.subtract(boundingBox.minimum);
        const centerVector = boundingBox.minimum.add(sizeVector.scale(0.5));
        boundingBox.minimum = centerVector.subtract(sizeVector.scale(0.5));
        boundingBox.maximum = centerVector.add(sizeVector.scale(0.5));
      
        mesh.scaling = new Vector3(0.015, 0.015, 0.015);
        car1.mesh.position = new Vector3(-20, 0, 10);
        

        const boundCar1 = MeshBuilder.CreateBox("boundingBoxMesh", {
            width: 2.6,
            height: 6,
            depth: 7.3
          }, scene);
          boundCar1.position = car1.mesh.position;
          boundCar1.isVisible = false;
          boundCar1.checkCollisions = true;
      
      
        car1.mesh.isPickable = true;
        car1.mesh.isVisible = false;

        return result;
    });
}

function addClone(position, scaling, rotation, scene) {

    let mesh = car1.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newClone = mesh.clone("car1");
    newClone.setEnabled(true);

    newClone.position = position;

    newClone.scaling = scaling;

    newClone.rotation = rotation;

    const boundingBox = mesh.getBoundingInfo().boundingBox;

    const sizeVector = boundingBox.maximum.subtract(boundingBox.minimum);
    const centerVector = boundingBox.minimum.add(sizeVector.scale(0.5));
    boundingBox.minimum = centerVector.subtract(sizeVector.scale(0.5));
    boundingBox.maximum = centerVector.add(sizeVector.scale(0.5));
    
    const boxSize = boundingBox.maximum.subtract(boundingBox.minimum);
    const boundCar1 = MeshBuilder.CreateBox("boundingBoxMesh", {
        width: 2.6,
        height: 6,
        depth: 7.3
      }, scene);
    boundCar1.position = position;
    boundCar1.isVisible = false;
    boundCar1.checkCollisions = true;
  
    car1.clones.push(newClone)
}

const car1 = {
    meshes: undefined,
    mesh: undefined,
    addClone,
    loadAsync,
    clones: []
};

export default car1;
    
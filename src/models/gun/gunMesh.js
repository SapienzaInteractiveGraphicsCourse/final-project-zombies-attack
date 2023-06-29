import {
    Mesh,
    Vector3
} from "@babylonjs/core";
import { SceneLoader } from "@babylonjs/core";

function _loadMesh(scene, camera) {
    let gun = {};
    return SceneLoader.ImportMeshAsync("", "./models/weapons/", "scene.glb", scene).then((res) => {

        const mesh = res.meshes[0];
        const skeleton = res.skeletons[0];

        gun.meshes = res.meshes;
        gun.skeleton = skeleton;

        gun.meshes.map((mesh) => {
            mesh.isPickable = false;

            // Set all other meshes invisible
            mesh.isVisible = true;
        });
        
        res.transformNodes.map((node) => {
            if (node.name === 'AK-47') {
            const meshArray = []
            node._children.map((child) => {
                meshArray.push(child)
            })
            gun.mesh = Mesh.MergeMeshes(meshArray)
            }
        })


        gun.parent = camera;
        gun.renderingGroupId = 1;
      
      return gun;
    })
}

function _initMeshDependent(gun) {
    gun.rotation = new Vector3(0, Math.PI * 0.2, 0)
    gun.position = new Vector3(0.05, -0.02, 0.2);
}

async function loadGunAsync(scene) {
    let gun = await _loadMesh(scene);
    _initMeshDependent(gun);
    return gun;
}

export { loadGunAsync };
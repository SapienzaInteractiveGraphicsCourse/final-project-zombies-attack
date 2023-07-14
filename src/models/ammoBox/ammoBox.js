import {
    SceneLoader,
    StandardMaterial,
    DynamicTexture,
    MeshBuilder,
    Vector4
} from "@babylonjs/core";
import floatanims from "./animations/ammoBoxFloat";
import { RotationFromDegrees } from "../../libs/angles";

async function loadAsync(scene) {
    return SceneLoader.ImportMeshAsync("", "./models/ammo/", "ammo_box.glb", scene).then((result) => {
        ammoBox.meshes = result.meshes;
        ammoBox.mesh = result.meshes[0];
        ammoBox.mesh.rotation = RotationFromDegrees(0, -90, 0);

        //Create dynamic texture
        const dynamicTex = new DynamicTexture("dynamic texture", {
            width: 512,
            height: 256
        }, scene);  
        
        const materialGround = new StandardMaterial("Mat", scene);    				
        materialGround.diffuseTexture = dynamicTex;

        //Add text to dynamic texture
        const font = "bold 44px monospace";
        dynamicTex.drawText("Ammo here", 135, 135, font, "black", "white", true, true);

        const faceUV = new Array(6);
    
        for (let i = 0; i < 6; i++) {
            faceUV[i] = new Vector4(0, 0, 0, 0);
        }
        faceUV[0] = new Vector4(0, 0, 1, 1);

        const panel = MeshBuilder.CreateBox("boundingBoxMesh", {
            width: 1,
            height: 0.5,
            depth: 0.01,
            faceUV: faceUV
        }, scene);
        panel.material = materialGround;
        panel.position = ammoBox.mesh.position;
        panel.position.y += 2;
        panel.rotation = RotationFromDegrees(180, 180, 0)

        ammoBox.clones = [];
        return result;
    });
}

function float(meshdata) {
    floatanims.float(meshdata)
}

const ammoBox = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    isNear: false,
    float
};

export default ammoBox;
/**
 * Contains the instructions to load the mesh for the zombie.
 * Usable in both battle and dungeon.
 */

import {
    SceneLoader,
    Color3,
    MeshBuilder,
    Vector3,
    StandardMaterial,
    Quaternion
} from "@babylonjs/core";
import "@babylonjs/loaders";
import { RotationFromDegrees } from "../../libs/angles";
import { getSize } from "../../libs/dimension";

// list of bones to save in the bonesDict.
const bonesOfInterest = [
    // root (~center)
    "Base HumanPelvis_01",
    // body segments
    "Base HumanSpine1_06",
    "Base HumanSpine2_00",
    // "Base HumanRibcage_07",   // not useful
    // head
    "Base HumanNeck_08",
    "Base HumanHead_09",
    // left arm
    "Base HumanLArmCollarbone_033",
    "Base HumanLArmUpperarm_034",
    "Base HumanLArmForearm_035",
    "Base HumanLArmPalm_036",
    // right arm
    "Base HumanRArmCollarbone_015",
    "Base HumanRArmUpperarm_016",
    "Base HumanRArmForearm_017",
    "Base HumanRArmPalm_018",
    // left leg
    "Base HumanLLegThigh_051",
    "Base HumanLLegCalf_052",
    "Base HumanLLegFoot_053",
    "Base HumanLLegDigit11_054",
    // right leg
    "Base HumanRThigh_02",
    "Base HumanRCalf_03",
    "Base HumanRFoot_04",
    "Base HumanRDigit11_05"
];

const bonesForHitBox = [
    // body segments
    {
        name: "Base HumanSpine2_00",
        width: 28,
        height: 60,
        depth: 30
    },
    // head
    {
        name: "Base HumanHead_09",
        width: 21,
        height: 25,
        depth: 15
    },
    // left arm
    {
        name: "Base HumanLArmCollarbone_033",
        width: 10,
        height: 20,
        depth: 10
    },
    {
        name: "Base HumanLArmUpperarm_034",
        width: 8,
        height: 30,
        depth: 8
    },
    {
        name: "Base HumanLArmForearm_035",
        width: 7,
        height: 30,
        depth: 7
    },
    {
        name: "Base HumanLArmPalm_036",
        width: 7,
        height: 15,
        depth: 7
    }, 
    // right arm
    {
        name: "Base HumanRArmCollarbone_015",
        width: 10,
        height: 20,
        depth: 10
    },
    {
        name: "Base HumanRArmUpperarm_016",
        width: 8,
        height: 30,
        depth: 8
    },
    {
        name: "Base HumanRArmForearm_017",
        width: 7,
        height: 30,
        depth: 7
    },
    {
        name: "Base HumanRArmPalm_018",
        width: 7,
        height: 15,
        depth: 7
    },
    // left leg
    {
        name: "Base HumanLLegThigh_051",
        width: 15,
        height: 45,
        depth: 15
    },
    {
        name: "Base HumanLLegCalf_052",
        width: 15,
        height: 48,
        depth: 15
    },
    {
        name: "Base HumanLLegFoot_053",
        width: 10,
        height: 27,
        depth: 12
    },
    // right leg
    {
        name: "Base HumanRThigh_02",
        width: 15,
        height: 45,
        depth: 15
    },
    {
        name: "Base HumanRCalf_03",
        width: 15,
        height: 48,
        depth: 15
    },
    {
        name: "Base HumanRFoot_04",
        width: 10,
        height: 27,
        depth: 12
    }
];

/**
 * Asynchronously loads this character's mesh
 * and returns an object with basic info.
 * @param {Scene} scene The scene to associate the loaded mesh to.
 * @returns A promise that resolves when loading and initialization is complete.
 */
async function _loadMesh(scene) {
    let zombie = {}
    return SceneLoader.ImportMeshAsync("", "/models/zombies/", "zombie3_test.glb", scene).then((result) => {
        let mesh = result.meshes[0];
        let skeleton = result.skeletons[0];


        zombie.meshes = result.meshes;
        zombie.mesh = mesh;
        zombie.skeleton = skeleton;

        // Print bone names for debugging
        skeleton.bones.forEach((bone, index) => {
            console.log(`Bone ${index}: ${bone.name}`);
        });

        zombie.skeleton.bones.forEach((bone, index) => {
            for (const hitBone of bonesForHitBox) {
                if (bone.name === hitBone.name) {
                    // Creating hitbox geometry
                    let hitbox = MeshBuilder.CreateBox(`hitbox ${hitBone.name}`, {width: hitBone.width, height: hitBone.height, depth: hitBone.depth}, scene);
                    hitbox.material = new StandardMaterial("std", scene);
                    hitbox.material.wireframe = true;
                    hitbox.isVisible = false;

                    let headBoneIndex = skeleton.getBoneIndexByName(bone.name);
                    console.log(bone)
                    console.log(headBoneIndex)
                    if (headBoneIndex !== -1) {
                    let headBone = skeleton.bones[headBoneIndex];
                        hitbox.parent = headBone.getTransformNode();
                        hitbox.position = new Vector3(0, 0, 0);
                        hitbox.rotationQuaternion = Quaternion.Identity();
                    } else {
                        console.error("Head bone not found.");
                    }

                    if (hitBone.name === "Base HumanSpine2_00") {
                        hitbox.position.y = 8
                    }
                    else if (hitBone.name === "Base HumanHead_09") {
                        hitbox.position.y = 4
                        hitbox.position.z = 4
                    }
                    else if (hitBone.name === "Base HumanLArmCollarbone_033" || hitBone.name === "Base HumanRArmCollarbone_015") {
                        hitbox.position.y = 7
                    }
                    else if (hitBone.name === "Base HumanLArmUpperarm_034" || hitBone.name === "Base HumanRArmUpperarm_016") {
                        hitbox.position.y = 15
                    }
                    else if (hitBone.name === "Base HumanLArmForearm_035" || hitBone.name === "Base HumanRArmForearm_017") {
                        hitbox.position.y = 15
                    }
                    else if (hitBone.name === "Base HumanLArmPalm_036" || hitBone.name === "Base HumanRArmPalm_018") {
                        hitbox.position.y = 10
                    }
                    else if (hitBone.name === "Base HumanLLegThigh_051" || hitBone.name === "Base HumanRThigh_02") {
                        hitbox.position.y = 20
                    }
                    else if (hitBone.name === "Base HumanLLegCalf_052" || hitBone.name === "Base HumanRCalf_03") {
                        hitbox.position.y = 20
                        hitbox.position.z = -2
                    }
                    else if (hitBone.name === "Base HumanLLegFoot_053" || hitBone.name === "Base HumanRFoot_04") {
                        hitbox.position.y = 9
                        hitbox.position.z = -2
                    }
                }
            }
        })

        return zombie;
    });
}

/**
 * Set some parameters that can only be set after the mesh and skeketon have been loaded.
 */
function _initMeshDependent(zombie) {
    let bonesDict = {};

    // Prepare dictionaries for bones and nodes of interest for the animations,
    // in order to get easy access
    bonesOfInterest.forEach((name) => {
        bonesDict[name] = zombie.skeleton.bones[zombie.skeleton.getBoneIndexByName(name)];
        if (!bonesDict[name]) {
            console.error(`Node ${name} not found"`)
        }
    })

    zombie.bonesDict = bonesDict;
    zombie.getBone = (name) => {
        return bonesDict[name];
    }
    zombie.getNode = (name) => {
        return bonesDict[name].getTransformNode();
    }

    // Set the initial pose of the character
    zombie.getNode("Base HumanLArmUpperarm_034").rotation = RotationFromDegrees(12.2255, 19.9400, -21.2424);
    zombie.getNode("Base HumanLArmForearm_035").rotation = RotationFromDegrees(33.4608, 3.6695, 10.5962);
    zombie.getNode("Base HumanLArmPalm_036").rotation = RotationFromDegrees(12.2255, -112.8121, 9.3135);
    zombie.getNode("Base HumanRArmUpperarm_016").rotation = RotationFromDegrees(12.2255, -19.9400, 21.2424);
    zombie.getNode("Base HumanRArmForearm_017").rotation = RotationFromDegrees(33.4608, -3.6695, -10.5962);
    zombie.getNode("Base HumanRArmPalm_018").rotation = RotationFromDegrees(12.2255, 112.8121, -9.3135);

    /**
     * Stops all animations on this character.
     * @param {Scene} scene The current scene
     */
    zombie.stopAllAnimations = function(scene) {
        scene.stopAnimation(zombie.mesh);
        scene.stopAnimation(zombie.skeleton);
        zombie.skeleton.bones.forEach((item, index) => { scene.stopAnimation(item) });
        zombie.mesh.getChildTransformNodes(false).forEach((item, index) => { scene.stopAnimation(item) });
    }
}

async function loadZombieAsync(scene) {
    let zombie = await _loadMesh(scene);
    _initMeshDependent(zombie); 
    return zombie;
}


export {
    loadZombieAsync
}
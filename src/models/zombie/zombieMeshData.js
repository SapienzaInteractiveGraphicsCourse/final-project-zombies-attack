/**
 * Contains the instructions to load the mesh for the zombie.
 * Usable in both battle and dungeon.
 */

import {
    SceneLoader,
    Color3
} from "@babylonjs/core";
import "@babylonjs/loaders";
import { RotationFromDegrees } from "../../libs/angles";

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
];

/**
 * Asynchronously loads this character's mesh
 * and returns an object with basic info.
 * @param {BABYLON.Scene} scene The scene to associate the loaded mesh to.
 * @returns A promise that resolves when loading and initialization is complete.
 */
async function _loadMesh(scene) {
    let zombie = {}
    return SceneLoader.ImportMeshAsync("", "/models/zombies/", "zombie3.glb", scene).then((result) => {
        let mesh = result.meshes[0];
        let skeleton = result.skeletons[0];

        zombie.meshes = result.meshes;
        zombie.mesh = mesh;
        zombie.skeleton = skeleton;

        // set characters non-pickable by default, to avoid accidental issues.
        // individual instances can be set pickable anyway.
        zombie.meshes.forEach((mesh, index) => {
            mesh.isPickable = false;
        });

        // this part of the zombie has the material regarding the sword and the gold ornament on the helmet.
        // such material was given an emissive texture so it can "glow in the dark" during the special attack
        // (and only at that time).
        // so we save this material for future use...
        zombie.theMaterialWithEmission = result.meshes[1].material;
        // ...and turn the emission off for now
        zombie.theMaterialWithEmission.emissiveColor = Color3.Black();

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
    zombie.getNode("Base HumanLArmUpperarm_034").rotation = RotationFromDegrees(32, -62, -6);
    zombie.getNode("Base HumanLArmForearm_035").rotation = RotationFromDegrees(-3, 9, 38);
    zombie.getNode("Base HumanLArmPalm_036").rotation = RotationFromDegrees(-64, 149, -156);
    zombie.getNode("Base HumanRArmUpperarm_016").rotation = RotationFromDegrees(-32, 62, -6);
    zombie.getNode("Base HumanRArmForearm_017").rotation = RotationFromDegrees(3, -9, 38);
    zombie.getNode("Base HumanRArmPalm_018").rotation = RotationFromDegrees(64, -149, -156);

    /**
     * Stops all animations on this character.
     * @param {BABYLON.Scene} scene The current scene
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
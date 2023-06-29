/**
 * Base file for the "zombie", a common enemy, when it appears in battle.
 * (It is given a more appropriate name in the UI.)
 * Loads its model and manages a few more things about it.
 * 
 * EXPORTS a JS object with all the necessary info about it,
 * some of which will only be filled once the loading is complete.
 */


// IMPORTS
import {
    Vector3
} from "@babylonjs/core";
import { loadZombieAsync } from "./zombieMeshData";
import miscanims from "./animations/zombieMiscAnims"
import { options } from "../../options";

// CONSTANTS & PARAMETERS

/*
 * General attributes
 */
// a lunar-feeling name to contextualize the special attack,
// which also includes a "bad"-sounding word to remind the user it's an enemy
const name = "Moon-Cursed zombie";
const isPlayer = false;

/**
 * The position where this character usually is.
 * Used as reference to position or point other objects or effects.
 */
const defaultPosition = new Vector3(-5, 0.2, -15);

/**
 * The position used as the target for projectile- or explosion-based attacks,
 * such as Makoto's Fireball
 */
const projectileTarget = defaultPosition.add(new Vector3(-0.3, 0.8, 0));

/**
 * The position in world space where the text (a UI element) showing the damage taken from attacks will first appear.
 * (will need to be projected to view space before each use, since it positions a UI element)
 */
// var damageTextSpawnPoint_world;   // declared in the object, left here for documentation purposes
// Depends on one of its nodes, so it's defined upon loading


// LOADING & INITIALIZATIONS

/**
 * Initializes the RPG parameters for this character.
 */
function _initGame() {
    zombie.maxhp = 35;
    if (options.hardMode) {
        zombie.maxhp += 15;
    }
    zombie.hp = zombie.maxhp;
}

/**
 * Full initial loading: loads mesh and initializes RPG stats.
 * @param {BABYLON.Scene} scene The scene to associate this model to.
 * @returns A promise that resolves when loading and initialization is complete.
 */
async function loadAsync(scene) {
    _initGame();
    zombie.meshdata = await loadZombieAsync(scene);

    zombie.meshdata.mesh.position = defaultPosition;
}


/**
 * Perform a number of initializations that require scene-specific
 * information or objects. Examples include animation event setup
 * (which need to target the characters and/or lights present in the scene)
 * and certain properties of some special attacks (which may target an
 * opponent-dependent position).
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function sceneSpecificInit(sceneInfo) {
    // animation
    zombie.idle(sceneInfo);
}

// wrap the miscanims animations to refer to the loaded meshdata object

function idle(sceneInfo) {
    // small touch: if the character has no HP left it can't idle as strength leaves it and it prepares to die.
    if (zombie.hp > 0) {
        miscanims.idle(zombie.meshdata, sceneInfo.scene);
    }
}

function walk(sceneInfo, onAnimationEnd) {
    miscanims.walk(zombie.meshdata, sceneInfo.scene, onAnimationEnd);
}

function death(sceneInfo, onAnimationEnd) {
    miscanims.death(zombie.meshdata, sceneInfo.scene, onAnimationEnd);
}

function stopAllAnimations(scene) {
    zombie.meshdata.stopAllAnimations(scene);
}


// EXPORT

/**
 * The object to be exported.
 */
const zombie = {
    name,
    isPlayer,
    meshdata: {},
    maxhp: undefined,
    hp: undefined,
    loadAsync,
    sceneSpecificInit,
    defaultPosition,
    projectileTarget,
    stopAllAnimations,
    walk,
    death,
    idle,
};

export default zombie;
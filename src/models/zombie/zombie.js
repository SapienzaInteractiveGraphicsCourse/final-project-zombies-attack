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
import walkanim from "./animations/zombieWalk"
import deathanim from "./animations/zombieDeath"
import attackanim from "./animations/zombieAttack"
import { options } from "../../options";

// CONSTANTS & PARAMETERS

/*
 * General attributes
 */
// a lunar-feeling name to contextualize the special attack,
// which also includes a "bad"-sounding word to remind the user it's an enemy
const name = "Zombie";

/**
 * The position where this character usually is.
 * Used as reference to position or point other objects or effects.
 */
const defaultPosition = new Vector3(-5, 0, -15);

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
    zombie.hp = 100;
    zombie.isAnimated = false;
    zombie.lastAttack = 0;
    if (options.difficulty.medium) {
        zombie.hp += 50;
    }
    else if (options.difficulty.hard) {
        zombie.hp += 100;
    }
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
 * Initliazation of the scene. It populates the mesh with the animation groups called by the functions.
 * @param {*} sceneInfo 
 */
function sceneSpecificInit(sceneInfo) {
    // Animation initialization
    attackanim.attack(sceneInfo, zombie.meshdata)
    walkanim.walk(zombie.meshdata)
    deathanim.death(zombie.meshdata)
}


// EXPORT

/**
 * The object to be exported.
 */
const zombie = {
    name,
    meshdata: {},
    hp: undefined,
    loadAsync,
    sceneSpecificInit,
    defaultPosition
};

export default zombie;
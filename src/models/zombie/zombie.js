import {
    Vector3
} from "@babylonjs/core";
import { loadZombieAsync } from "./zombieMeshData";
import walkanim from "./animations/zombieWalk"
import deathanim from "./animations/zombieDeath"
import attackanim from "./animations/zombieAttack"
import { options } from "../../options";

const name = "Zombie";
let damage = 5;
const defaultPosition = new Vector3(0, 0, 30);

function _initGame() {
    zombie.hp = 100;
    zombie.isAnimated = false;
    zombie.lastAttack = 0;
    zombie.damage = 5;
    zombie.speed = 0.025;
    if (options.difficulty.medium) {
        zombie.hp += 50;
    }
    else if (options.difficulty === 3) {
        zombie.hp += 100;
    }
}

async function loadAsync(scene) {
    _initGame();
    zombie.meshdata = await loadZombieAsync(scene);

    zombie.meshdata.mesh.position = defaultPosition;
}

function sceneSpecificInit(sceneInfo) {
    // Animation initialization
    attackanim.attack(sceneInfo, zombie.meshdata)
    walkanim.walk(zombie.meshdata)
    deathanim.death(zombie.meshdata)
}

const zombie = {
    name,
    meshdata: {},
    hp: undefined,
    loadAsync,
    sceneSpecificInit,
    defaultPosition,
    damage
};

export default zombie;
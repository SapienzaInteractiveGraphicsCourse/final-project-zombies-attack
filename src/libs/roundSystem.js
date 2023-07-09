/**
 * This file contains an object that keeps track of whose turn it is during
 * a battle and of the conditions to switch turns.
 * Also handles a number of events that happen between turns,
 * including ending the "defending" state for characters
 * and triggering a "battle end" event for the scene when a combatant runs out of HP.
 */

import { Vector3 } from "@babylonjs/core";

/**
 * A class of objects that keep track of whose turn it is during a battle.
 */
class RoundSystem {
    /**
     * Creates a new turn system.
     */
    constructor() {
        this.reset();  // <- see this for info about this object's attributes.
        /**
         * Checks the victory condition of the player for the battle.
         * @param {*} sceneInfo Scene Info object for the current scene
         * @returns true if the player won the battle, false otherwise
         */
        this.checkVictory = function(sceneInfo) {
            return sceneInfo.enemy.hp <= 0;  // default: enemy out of HP
        }

        /**
         * Checks the defeat condition of the player for the battle.
         * @param {*} sceneInfo Scene Info object for the current scene
         * @returns true if the player lost the battle, false otherwise
         */
        this.checkDefeat = function(sceneInfo) {
            return sceneInfo.player.hp <= 0;  // default: player out of HP
        }
    }

    /**
     * Resets the state of this turn system.
     */
    reset() {
        this.enemy_anim_done = false;  // is the enemy's animation done? a turn ends when both characters are done.
    }

    /**
     * Sets enemy_anim_done to true.
     * If sceneInfo is given, automatically starts the idle animation of the player.
     */
    enemy_done(sceneInfo) {
        this.enemy_anim_done = true;
        if (sceneInfo) {
            sceneInfo.enemy.walk(sceneInfo);
        }
    }

    /**
     * The attributes of this object can be accessed directly.
     * So for example other modules can check whose turn it is,
     * or some hypothetic special battle scene could alter the victory condition,
     * just by directly reading/writing the attributes, no getters/setters required.
     */

    /**
     * Adds an update event that passes the turn in the given scene if the condition applies,
     * and triggers some events happening between turns.
     * @param {*} sceneInfo Scene Info object for the current scene
     */
    addRoundObserver(sceneInfo) {
        sceneInfo.scene.onBeforeRenderObservable.add(() => {
            if (sceneInfo.enemy.meshdata && sceneInfo.enemy.hp > 0) {
                // Calcola la direzione dalla mesh alla telecamera
                const direction = sceneInfo.camera.position.subtract(sceneInfo.enemy.meshdata.mesh.position);
                direction.normalize();
                // Calcola la distanza tra la mesh e la telecamera
                const distance = Vector3.Distance(sceneInfo.enemy.meshdata.mesh.position, sceneInfo.camera.position);
                const ceilDistance = Math.ceil(distance)
                sceneInfo.enemy.distance = ceilDistance;
                if (ceilDistance > 4) {
                    if (!sceneInfo.enemy.isAnimated) {
                        sceneInfo.enemy.lastAttack = 0;
                        sceneInfo.enemy.isAnimated = true;
                    }
            
                    // Definisci una velocità di movimento
                    const speed = 0.01;
            
                    // Sposta la mesh lungo la direzione verso la telecamera
                    sceneInfo.enemy.meshdata.mesh.position.addInPlace(direction.scale(speed));
                    sceneInfo.enemy.meshdata.mesh.position.y = 0;
            
                    const target = sceneInfo.enemy.meshdata.mesh.position.subtract(direction)
                    target.y = 0;
                    // Imposta il target della mesh sulla direzione calcolata
                    sceneInfo.enemy.meshdata.mesh.lookAt(target);
                }
                else {
                    sceneInfo.enemy.lastAttack += 1;
                    if (sceneInfo.enemy.isAnimated && sceneInfo.enemy.lastAttack > 200) {
                        sceneInfo.enemy.attack(sceneInfo);
                        sceneInfo.enemy.isAnimated = false;
                    }
                }
              }
        });
    }
}

export { RoundSystem };
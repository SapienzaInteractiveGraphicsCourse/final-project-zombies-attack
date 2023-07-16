import {
    Vector3
} from "@babylonjs/core";

import defeat from "../HUD/defeat";
import { options } from "../options";

class RoundSystem {
    static flag = true;

    constructor() {
        this.checkDefeat = function(sceneInfo) {
            return sceneInfo.player.hp <= 0;  // default: player out of HP
        }
    }

    addRoundObserver(sceneInfo, engine) {
        sceneInfo.scene.onBeforeRenderObservable.add(() => {
            if (this.checkDefeat(sceneInfo)) {
                if (!sceneInfo.defeatHUD) {
                    sceneInfo.hud.dispose();
                    // Create the GUI for this scene
                    const defeatHUD = defeat.createHUD(sceneInfo);
                    sceneInfo.defeatHUD = defeatHUD;
                    sceneInfo.enemy.meshdata.mesh.dispose()
                    engine.exitPointerlock();
                    engine.exitFullscreen();
                    document.querySelector("canvas").height = window.innerHeight;
                    document.querySelector("canvas").width = window.innerWidth;
                }
            }
            else if (sceneInfo.enemy.meshdata && sceneInfo.enemy.hp > 0) {
                // Compute the direction from the mesh to the camera
                const direction = sceneInfo.camera.position.subtract(sceneInfo.enemy.meshdata.mesh.position);
                direction.normalize();
                // Compute the distance between the mesh and the camera
                const distance = Vector3.Distance(sceneInfo.enemy.meshdata.mesh.position, sceneInfo.camera.position);
                const ceilDistance = Math.ceil(distance)
                sceneInfo.enemy.distance = ceilDistance;
                if (ceilDistance > 3) {
                    if (!sceneInfo.enemy.isAnimated) {
                        sceneInfo.scene.getAnimationGroupByName("attack").stop();
                        sceneInfo.scene.getAnimationGroupByName("walk").start(true);
                        sceneInfo.enemy.lastAttack = 0;
                        sceneInfo.enemy.isAnimated = true;
                    }

                    // Move the mesh towards the camera position
                    sceneInfo.enemy.meshdata.mesh.position.addInPlace(direction.scale(sceneInfo.enemy.speed));
                    sceneInfo.enemy.meshdata.mesh.position.y = 0;
                }
                else {
                    if (sceneInfo.enemy.isAnimated) {
                        sceneInfo.scene.getAnimationGroupByName("walk").stop();
                        sceneInfo.scene.getAnimationGroupByName("attack").start(true);
                        sceneInfo.enemy.isAnimated = false;
                    }
                }

                // Rotate the mesh towards the camera
                const target = sceneInfo.enemy.meshdata.mesh.position.subtract(direction)
                target.y = 0;

                // Look at the camera
                sceneInfo.enemy.meshdata.mesh.lookAt(target);
            }
            else if (sceneInfo.enemy.hp <= 0){
                if(RoundSystem.flag){
                    RoundSystem.flag = false;
                    sceneInfo.scene.getAnimationGroupByName("walk").stop()
                    sceneInfo.scene.getAnimationGroupByName("attack").stop()
                    sceneInfo.scene.getAnimationGroupByName("death").play()
                    sceneInfo.scene.getAnimationGroupByName("death").onAnimationGroupEndObservable.addOnce(() => {
                        RoundSystem.flag = true;
                        // Dispose the parent mesh
                        sceneInfo.player.pts += 100 * sceneInfo.player.round;

                        sceneInfo.scene.getAnimationGroupByName("attack").stop()
                        sceneInfo.scene.getAnimationGroupByName("death").stop()
                        sceneInfo.scene.getAnimationGroupByName("walk").play(true)
                        
                        if (options.difficulty === 1) {
                            sceneInfo.enemy.hp = 100 * sceneInfo.player.round; // Set the initial HP for the new enemy
                        }
                        else if (options.difficulty === 2) {
                            sceneInfo.enemy.hp = 150 * sceneInfo.player.round; // Set the initial HP for the new enemy
                        }
                        else if (options.difficulty === 3) {
                            sceneInfo.enemy.hp = 200 * sceneInfo.player.round; // Set the initial HP for the new enemy
                        }
                        sceneInfo.enemy.damage = sceneInfo.player.round * 5; // Set the damage of the new enemy
                        sceneInfo.enemy.meshdata.mesh.position = new Vector3(0, 0, 30);
                        
                        // Assign speed based on the round
                        sceneInfo.enemy.speed = 0.025 + (sceneInfo.player.round / 80);

                        sceneInfo.player.round += 1;

                        // Modify the speed of the animation group in relation to the round
                        sceneInfo.scene.getAnimationGroupByName("walk").targetedAnimations.forEach((animation) => {
                            animation.animation.framePerSecond = 60 * sceneInfo.player.round;
                        })
                        sceneInfo.scene.getAnimationGroupByName("attack").targetedAnimations.forEach((animation) => {
                            animation.animation.framePerSecond = 60 * sceneInfo.player.round;
                        })
                    });
                    sceneInfo.scene.getAnimationGroupByName("death").onAnimationGroupEndObservable.remove();
                }
            }
            const direction = sceneInfo.camera.position.subtract(sceneInfo.enemy.meshdata.mesh.position);
            direction.normalize();
            // Compute the distance between the camera and the mesh
            const distance = Vector3.Distance(sceneInfo.ammoBox.mesh.position, sceneInfo.camera.position);
            const ceilDistance = Math.ceil(distance)

            if (ceilDistance <= 3) {
                sceneInfo.ammoBox.isNear = true;
            }
            else {
                sceneInfo.ammoBox.isNear = false;
            }
        });
    }
}

export { RoundSystem };
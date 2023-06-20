import { Animation } from "@babylonjs/core";

export default class Animations {
    shotAnimation

    constructor() {
        this.shotAnimation = this.Shot
    }

    Shot(scene, camera, gun) {
        const frameRate = 60;

        const shot = new Animation("Shot", "position.z", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);

        const shot_keys = []; 

        shot_keys.push({
            frame: 0,
            value: 0.2
        });

        shot_keys.push({
            frame: 0.1 * frameRate,
            value: 0.1
        });

        shot_keys.push({
            frame: 0.2 * frameRate,
            value: 0.2
        });

        shot.setKeys(shot_keys);
        gun.animations.push(shot)

        scene.beginAnimation(gun, 0, 2 * frameRate, true);
    }
}
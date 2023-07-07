/**
 * Name stands for "Miscellaneous Animations".
 * File contains all animations of the Samurai not related to its actions,
 * because they are pretty long.
 * EXPORTS an objects with the functions to trigger those animations.
 */

import * as MYANIM from "../../../libs/animation"
import { RotationFromDegrees } from "../../../libs/angles";
import { 
    PowerEase,
    Vector3,
    SineEase,
    EasingFunction,
    Animation,
    Quaternion,
    QuadraticEase
} from "@babylonjs/core";
/**
 * Reload animation
 */
const _animReload_frames = [0, 30, 50, 100];
const frameRate = 30;
const walkEase = new PowerEase(1.3);
walkEase.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

const _animReload_meshY_bab = new Animation("animReload_meshY", "position.y", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animReload_meshY_bab.setEasingFunction(walkEase);
const _animReload_meshY_keys = [
    {
        frame: _animReload_frames[0],
        value: -0.05
    },
    {
        frame: _animReload_frames[1],
        value: -0.2
    },
    {
        frame: _animReload_frames[3],
        value: -0.05
    }
];
const animReload_meshY = new MYANIM.Animation(_animReload_meshY_bab, _animReload_meshY_keys);

// the animation is triggered by this function
function reload(meshdata, scene, onAnimationEnd) {
    MYANIM.directAnimation(scene, meshdata, [animReload_meshY]);
}

/**
 * The exported object.
 */
const gunanims = {
    reload
};

export default gunanims;
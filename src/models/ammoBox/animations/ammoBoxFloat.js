/**
 * File that contains the floating animation of the ammo box
 */
import { 
    PowerEase,
    EasingFunction,
    Animation,
    AnimationGroup
} from "@babylonjs/core";
/**
 * Float animation
 */
const _animFloat_frames = [0, 40, 70];
const frameRate = 30;
const floatEase = new PowerEase(1.3);
floatEase.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

const _animFloat_meshY_bab = new Animation("animFloat_meshY", "position.y", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
_animFloat_meshY_bab.setEasingFunction(floatEase);
const _animFloat_meshY_keys = [
    {
        frame: _animFloat_frames[0],
        value: 0.7
    },
    {
        frame: _animFloat_frames[1],
        value: 1
    },
    {
        frame: _animFloat_frames[2],
        value: 0.7
    }
];
_animFloat_meshY_bab.setKeys(_animFloat_meshY_keys);

// the animation is triggered by this function
/**
 * 
 * @param {*} meshdata Meshdata of the object, such data have meshes and the primary mesh in it
 */
function float(meshdata) {
    const animationGroup = new AnimationGroup("float");

    animationGroup.addTargetedAnimation(_animFloat_meshY_bab, meshdata.mesh);
}


/**
 * The exported object.
 */
const floatanims = {
    float
};

export default floatanims;
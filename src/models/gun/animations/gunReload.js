import { 
    PowerEase,
    EasingFunction,
    Animation
} from "@babylonjs/core";
import animation from "../../../libs/animation"
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
const animReload_meshY = new animation.Animation(_animReload_meshY_bab, _animReload_meshY_keys);

function reload(meshdata, scene, onAnimationEnd) {
    animation.directAnimation(scene, meshdata, [animReload_meshY]);
}

const gunanims = {
    reload
};

export default gunanims;
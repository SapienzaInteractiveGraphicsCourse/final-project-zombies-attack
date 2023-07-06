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
 * Walk animation
 */
const _animWalk_frames = [0, 18, 33, 54, 63, 72, 78, 90, 102];
const frameRate = 30;
const walkEase = new PowerEase(1.3);
walkEase.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

const _animWalk_meshY_bab = new Animation("animWalk_meshY", "position.y", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_meshY_bab.setEasingFunction(walkEase);
const _animWalk_meshY_keys = [
    {
        frame: _animWalk_frames[0],
        value: 0
    },
    {
        frame: _animWalk_frames[1],
        value: -0.02
    },
    {
        frame: _animWalk_frames[3],
        value: 0.02
    },
    {
        frame: _animWalk_frames[5],
        value: -0.02
    },
    {
        frame: _animWalk_frames[7],
        value: 0.02
    },
    {
        frame: _animWalk_frames[8],
        value: 0
    }
];
const animWalk_meshY = new MYANIM.Animation(_animWalk_meshY_bab, _animWalk_meshY_keys);

const _animWalk_spine_1_bab = new Animation("animWalk_spine_1", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_spine_1_bab.setEasingFunction(walkEase);
const _animWalk_spine_1_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9550, -90.7844, -171.8719))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 30))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 30))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 30))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 30))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 30))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 30))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 30))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 13.1586))
    }
];
const animWalk_spine_1 = new MYANIM.Animation(_animWalk_spine_1_bab, _animWalk_spine_1_keys);

const _animWalk_spine_2_bab = new Animation("animWalk_spine_2", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_spine_2_bab.setEasingFunction(walkEase);
const _animWalk_spine_2_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -32))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -22.9940))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -12))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -22.9940))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -22.9940))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -22.9940))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -22.9940))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -22.9940))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -32))
    }
];
const animWalk_spine_2 = new MYANIM.Animation(_animWalk_spine_2_bab, _animWalk_spine_2_keys);

const _animWalk_neck_bab = new Animation("animWalk_neck", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_neck_bab.setEasingFunction(walkEase);
const _animWalk_neck_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2657, -1.1964, 18.6757))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2657, -1.1964, 30))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2657, -1.1964, 45))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2657, -1.1964, 23))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2657, -1.1964, 23))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2657, -1.1964, 23))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2657, -1.1964, 23))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2657, -1.1964, 23))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2657, -1.1964, 18.6757))
    }
];
const animWalk_neck = new MYANIM.Animation(_animWalk_neck_bab, _animWalk_neck_keys);

const _animWalk_head_bab = new Animation("animWalk_head", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_head_bab.setEasingFunction(walkEase);
const _animWalk_head_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2088, 2.0063, -33.7303))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2088, 2.0063, -33.7303))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2088, 2.0063, -23.7303))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2088, 2.0063, -23.7303))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2088, 2.0063, -23.7303))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2088, 2.0063, -23.7303))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2088, 2.0063, -18.7303))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2088, 2.0063, -18.7303))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2088, 2.0063, -33.7303))
    },
];
const animWalk_head = new MYANIM.Animation(_animWalk_head_bab, _animWalk_head_keys);

const _animWalk_L_collarbone_bab = new Animation("animWalk_L_collarbone", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_L_collarbone_bab.setEasingFunction(walkEase);
const _animWalk_L_collarbone_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, -20.4258))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, 25))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, 30))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, 20))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, 20))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, 20))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, 20))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, -20.4258))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, -20.4258))
    }
];
const animWalk_L_collarbone = new MYANIM.Animation(_animWalk_L_collarbone_bab, _animWalk_L_collarbone_keys);

const _animWalk_R_upperarm_bab = new Animation("animWalk_R_upperarm", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_R_upperarm_bab.setEasingFunction(walkEase);
const _animWalk_R_upperarm_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 70))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 95))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 100))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 75))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 75))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 60))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 70))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 75))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 70))
    }
];
const animWalk_R_upperarm = new MYANIM.Animation(_animWalk_R_upperarm_bab, _animWalk_R_upperarm_keys);

const _animWalk_R_palm_bab = new Animation("animWalk_R_palm", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_R_palm_bab.setEasingFunction(walkEase);
const _animWalk_R_palm_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(41.9339, 15.6189, -16.3430))
    }
];
const animWalk_R_palm = new MYANIM.Animation(_animWalk_R_palm_bab, _animWalk_R_palm_keys);

const _animWalk_L_thigh_bab = new Animation("animWalk_L_thigh", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_L_thigh_bab.setEasingFunction(walkEase);
const _animWalk_L_thigh_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 45))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 75))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 35))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 10))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 10))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 20))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 30))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 50))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 45))
    }
];
const animWalk_L_thigh = new MYANIM.Animation(_animWalk_L_thigh_bab, _animWalk_L_thigh_keys);

const _animWalk_L_calf_bab = new Animation("animWalk_L_calf", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_L_calf_bab.setEasingFunction(walkEase);
const _animWalk_L_calf_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -29.3089))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -60))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -45))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -45))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -25))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -60))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -80))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -90))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -29.3089))
    }
];
const animWalk_L_calf = new MYANIM.Animation(_animWalk_L_calf_bab, _animWalk_L_calf_keys);

const _animWalk_L_foot_bab = new Animation("animWalk_L_foot", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_L_foot_bab.setEasingFunction(walkEase);
const _animWalk_L_foot_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 89.0023))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 89.0023))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 89.0023))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 100))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 100))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 95))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 95))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 95))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 89.0023))
    }
];
const animWalk_L_foot = new MYANIM.Animation(_animWalk_L_foot_bab, _animWalk_L_foot_keys);

const _animWalk_L_digits_bab = new Animation("animWalk_L_digits", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_L_digits_bab.setEasingFunction(walkEase);
const _animWalk_L_digit_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 12.8010))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 12.8010))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 32.8010))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 32.8010))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 45))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 60))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 70))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 12.8010))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 12.8010))
    }
];
const animWalk_L_digits = new MYANIM.Animation(_animWalk_L_digits_bab, _animWalk_L_digit_keys);

const _animWalk_R_thigh_bab = new Animation("animWalk_R_thigh", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_R_thigh_bab.setEasingFunction(walkEase);
const _animWalk_R_thigh_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, -25))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, -45))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, -15))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, 15))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, 5))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, 10))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, 10))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, 0))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, -25))
    }
];
const animWalk_R_thigh = new MYANIM.Animation(_animWalk_R_thigh_bab, _animWalk_R_thigh_keys);

const _animWalk_R_calf_bab = new Animation("animWalk_R_calf", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_R_calf_bab.setEasingFunction(walkEase);
const _animWalk_R_calf_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, 0))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, 0))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, -5))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, -25))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, -15))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, -25))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, -25))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, -15))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, 0))
    }
];
const animWalk_R_calf = new MYANIM.Animation(_animWalk_R_calf_bab, _animWalk_R_calf_keys);

const _animWalk_R_foot_bab = new Animation("animWalk_R_foot", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_R_foot_bab.setEasingFunction(walkEase);
const _animWalk_R_foot_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    }
];
const animWalk_R_foot = new MYANIM.Animation(_animWalk_R_foot_bab, _animWalk_R_foot_keys);

const _animWalk_R_digits_bab = new Animation("animWalk_R_digits", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_R_digits_bab.setEasingFunction(walkEase);
const _animWalk_R_digit_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    }
];
const animWalk_R_digits = new MYANIM.Animation(_animWalk_R_digits_bab, _animWalk_R_digit_keys);

// the animation is triggered by this function
function walk(meshdata, scene, onAnimationEnd) {
    MYANIM.directAnimationLoop(scene, meshdata.mesh, [animWalk_meshY]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanSpine1_06"), [animWalk_spine_1]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanSpine2_00"), [animWalk_spine_2]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanNeck_08"), [animWalk_neck]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanHead_09"), [animWalk_head]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanLArmCollarbone_033"), [animWalk_L_collarbone]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRArmUpperarm_016"), [animWalk_R_upperarm]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRArmPalm_018"), [animWalk_R_palm]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanLLegThigh_051"), [animWalk_L_thigh]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanLLegCalf_052"), [animWalk_L_calf]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanLLegFoot_053"), [animWalk_L_foot]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanLLegDigit11_054"), [animWalk_L_digits]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRThigh_02"), [animWalk_R_thigh]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRCalf_03"), [animWalk_R_calf]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRFoot_04"), [animWalk_R_foot]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRDigit11_05"), [animWalk_R_digits]);
}





/**
 * The exported object.
 */
const miscanims = {
    walk,
};

export default miscanims;
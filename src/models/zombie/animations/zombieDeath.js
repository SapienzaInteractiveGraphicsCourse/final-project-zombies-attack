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

let lastPosition = new Vector3(0, 0, 0);

/**
 * Death animation
 */
const _animDeath_frames = [0, 18, 33, 54, 63, 72, 78, 90];
const frameRate = 30;
const deathEase = new PowerEase(1.3);
deathEase.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

const _animDeath_meshY_bab = new Animation("animDeath_meshY", "position.y", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_meshY_bab.setEasingFunction(deathEase);
const _animDeath_meshY_keys = [
    {
        frame: _animDeath_frames[0],
        value: lastPosition.y
    },
    {
        frame: _animDeath_frames[1],
        value: 0.18
    },
    {
        frame: _animDeath_frames[2],
        value: 0.18
    },
    {
        frame: _animDeath_frames[3],
        value: 0.22
    },
    {
        frame: _animDeath_frames[5],
        value: 0.18
    },
    {
        frame: _animDeath_frames[7],
        value: 0.22
    }
];
const animDeath_meshY = new MYANIM.Animation(_animDeath_meshY_bab, _animDeath_meshY_keys);

const _animDeath_spine_1_bab = new Animation("animDeath_spine_1", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_spine_1_bab.setEasingFunction(deathEase);
const _animDeath_spine_1_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 13.1586))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -23.1586))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -53.1586))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -53.1586))
    },
    {
        frame: _animDeath_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -53.1586))
    },
    {
        frame: _animDeath_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -53.1586))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -53.1586))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -53.1586))
    },
];
const animDeath_spine_1 = new MYANIM.Animation(_animDeath_spine_1_bab, _animDeath_spine_1_keys);

const _animDeath_spine_2_bab = new Animation("animDeath_spine_2", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_spine_2_bab.setEasingFunction(deathEase);
const _animDeath_spine_2_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -32))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -52))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -42))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -42))
    },
    {
        frame: _animDeath_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -42))
    },
    {
        frame: _animDeath_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -42))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -42))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -42))
    }
];
const animDeath_spine_2 = new MYANIM.Animation(_animDeath_spine_2_bab, _animDeath_spine_2_keys);

const _animDeath_neck_bab = new Animation("animDeath_neck", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_neck_bab.setEasingFunction(deathEase);
const _animDeath_neck_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2657, -1.1964, 18.6757))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-72.2657, -1.1964, 18.6757))
    }
];
const animDeath_neck = new MYANIM.Animation(_animDeath_neck_bab, _animDeath_neck_keys);

const _animDeath_head_bab = new Animation("animDeath_head", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_head_bab.setEasingFunction(deathEase);
const _animDeath_head_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2088, 2.0063, -33.7303))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-2.2088, 2.0063, -33.7303))
    }
];
const animDeath_head = new MYANIM.Animation(_animDeath_head_bab, _animDeath_head_keys);

const _animDeath_L_collarbone_bab = new Animation("animDeath_L_collarbone", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_L_collarbone_bab.setEasingFunction(deathEase);
const _animDeath_L_collarbone_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, -20.4258))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, -20.4258))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, -20.4258))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, -20.4258))
    },
    {
        frame: _animDeath_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, -20.4258))
    },
    {
        frame: _animDeath_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, -20.4258))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, -20.4258))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-15.9335, -101.0444, -20.4258))
    }
];
const animDeath_L_collarbone = new MYANIM.Animation(_animDeath_L_collarbone_bab, _animDeath_L_collarbone_keys);

const _animDeath_R_upperarm_bab = new Animation("animDeath_R_upperarm", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_R_upperarm_bab.setEasingFunction(deathEase);
const _animDeath_R_upperarm_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 70))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 95))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 100))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 75))
    },
    {
        frame: _animDeath_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 75))
    },
    {
        frame: _animDeath_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 60))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 70))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-5.4164, 62.9066, 75))
    }
];
const animDeath_R_upperarm = new MYANIM.Animation(_animDeath_R_upperarm_bab, _animDeath_R_upperarm_keys);

const _animDeath_R_palm_bab = new Animation("animDeath_R_palm", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_R_palm_bab.setEasingFunction(deathEase);
const _animDeath_R_palm_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(41.9339, 15.6189, -16.3430))
    }
];
const animDeath_R_palm = new MYANIM.Animation(_animDeath_R_palm_bab, _animDeath_R_palm_keys);

const _animDeath_L_thigh_bab = new Animation("animDeath_L_thigh", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_L_thigh_bab.setEasingFunction(deathEase);
const _animDeath_L_thigh_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 45))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 75))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 35))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 10))
    },
    {
        frame: _animDeath_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 10))
    },
    {
        frame: _animDeath_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 20))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 30))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.7885, -172.6846, 50))
    }
];
const animDeath_L_thigh = new MYANIM.Animation(_animDeath_L_thigh_bab, _animDeath_L_thigh_keys);

const _animDeath_L_calf_bab = new Animation("animDeath_L_calf", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_L_calf_bab.setEasingFunction(deathEase);
const _animDeath_L_calf_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -29.3089))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -60))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -45))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -45))
    },
    {
        frame: _animDeath_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -25))
    },
    {
        frame: _animDeath_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -60))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -80))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-1.9405, -0.0835, -90))
    }
];
const animDeath_L_calf = new MYANIM.Animation(_animDeath_L_calf_bab, _animDeath_L_calf_keys);

const _animDeath_L_foot_bab = new Animation("animDeath_L_foot", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_L_foot_bab.setEasingFunction(deathEase);
const _animDeath_L_foot_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 89.0023))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 89.0023))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 89.0023))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 100))
    },
    {
        frame: _animDeath_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 100))
    },
    {
        frame: _animDeath_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 95))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 95))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-11.3819, -9.5313, 95))
    }
];
const animDeath_L_foot = new MYANIM.Animation(_animDeath_L_foot_bab, _animDeath_L_foot_keys);

const _animDeath_L_digits_bab = new Animation("animDeath_L_digits", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_L_digits_bab.setEasingFunction(deathEase);
const _animDeath_L_digit_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 12.8010))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 12.8010))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 32.8010))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 32.8010))
    },
    {
        frame: _animDeath_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 45))
    },
    {
        frame: _animDeath_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 60))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 70))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9910, 4.4523, 12.8010))
    }
];
const animDeath_L_digits = new MYANIM.Animation(_animDeath_L_digits_bab, _animDeath_L_digit_keys);

const _animDeath_R_thigh_bab = new Animation("animDeath_R_thigh", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_R_thigh_bab.setEasingFunction(deathEase);
const _animDeath_R_thigh_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, -25))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, -45))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, -15))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, 15))
    },
    {
        frame: _animDeath_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, 5))
    },
    {
        frame: _animDeath_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, 10))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, 10))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.4117, 175.6522, 0))
    }
];
const animDeath_R_thigh = new MYANIM.Animation(_animDeath_R_thigh_bab, _animDeath_R_thigh_keys);

const _animDeath_R_calf_bab = new Animation("animDeath_R_calf", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_R_calf_bab.setEasingFunction(deathEase);
const _animDeath_R_calf_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, 0))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, 0))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, -5))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, -25))
    },
    {
        frame: _animDeath_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, -15))
    },
    {
        frame: _animDeath_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, -25))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, -25))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(1.9307, 0.0440, -15))
    }
];
const animDeath_R_calf = new MYANIM.Animation(_animDeath_R_calf_bab, _animDeath_R_calf_keys);

const _animDeath_R_foot_bab = new Animation("animDeath_R_foot", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_R_foot_bab.setEasingFunction(deathEase);
const _animDeath_R_foot_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    },
    {
        frame: _animDeath_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    },
    {
        frame: _animDeath_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(4.2713, 5.5953, 92.7111))
    }
];
const animDeath_R_foot = new MYANIM.Animation(_animDeath_R_foot_bab, _animDeath_R_foot_keys);

const _animDeath_R_digits_bab = new Animation("animDeath_R_digits", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_R_digits_bab.setEasingFunction(deathEase);
const _animDeath_R_digit_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    },
    {
        frame: _animDeath_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    },
    {
        frame: _animDeath_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9926, -4.5688, 12.8218))
    }
];
const animDeath_R_digits = new MYANIM.Animation(_animDeath_R_digits_bab, _animDeath_R_digit_keys);

// the animation is triggered by this function
function death(meshdata, scene, onAnimationEnd) {
    lastPosition = meshdata.mesh.position;
    
    MYANIM.directAnimationLoop(scene, meshdata.mesh, [animDeath_meshY]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanSpine1_06"), [animDeath_spine_1]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanSpine2_00"), [animDeath_spine_2]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanNeck_08"), [animDeath_neck]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanHead_09"), [animDeath_head]);
/*
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanLArmCollarbone_033"), [animDeath_L_collarbone]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRArmUpperarm_016"), [animDeath_R_upperarm]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRArmPalm_018"), [animDeath_R_palm]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanLLegThigh_051"), [animDeath_L_thigh]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanLLegCalf_052"), [animDeath_L_calf]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanLLegFoot_053"), [animDeath_L_foot]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanLLegDigit11_054"), [animDeath_L_digits]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRThigh_02"), [animDeath_R_thigh]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRCalf_03"), [animDeath_R_calf]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRFoot_04"), [animDeath_R_foot]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRDigit11_05"), [animDeath_R_digits]); */
    
}

/**
 * The exported object.
 */
const miscanims = {
    death,
};

export default miscanims;
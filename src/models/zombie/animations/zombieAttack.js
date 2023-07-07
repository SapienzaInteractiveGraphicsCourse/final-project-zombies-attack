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
 * Attack animation
 */
const _animAttack_frames = [0, 18, 33, 54, 63];
const frameRate = 30;
const attackEase = new PowerEase(1.3);
attackEase.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

const _animAttack_spine_2_bab = new Animation("animAttack_spine_2", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION);
_animAttack_spine_2_bab.setEasingFunction(attackEase);
const _animAttack_spine_2_keys = [
    {
        frame: _animAttack_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-22.9912, 0, 0))
    },
    {
        frame: _animAttack_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-22.9912, -50, 0))
    },
    {
        frame: _animAttack_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-22.9912, 30, 0))
    },
    {
        frame: _animAttack_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-22.9912, 0, 0))
    }
];
const animAttack_spine_2 = new MYANIM.Animation(_animAttack_spine_2_bab, _animAttack_spine_2_keys);

const _animAttack_head_bab = new Animation("animAttack_head", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION);
_animAttack_head_bab.setEasingFunction(attackEase);
const _animAttack_head_keys = [
    {
        frame: _animAttack_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.0000, 90.0000, 66.3139))
    },
    {
        frame: _animAttack_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.0000, 90.0000, 86.3139))
    },
    {
        frame: _animAttack_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.0000, 90.0000, 66.3139))
    }
];
const animAttack_head = new MYANIM.Animation(_animAttack_head_bab, _animAttack_head_keys);

const _animAttack_L_collarbone_bab = new Animation("animAttack_L_collarbone", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION);
_animAttack_L_collarbone_bab.setEasingFunction(attackEase);
const _animAttack_L_collarbone_keys = [
    {
        frame: _animAttack_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(10.6983, -23.4999, 73.8354))
    }
];
const animAttack_L_collarbone = new MYANIM.Animation(_animAttack_L_collarbone_bab, _animAttack_L_collarbone_keys); 

const _animAttack_L_upperarm_bab = new Animation("animAttack_L_upperarm", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION);
_animAttack_L_upperarm_bab.setEasingFunction(attackEase);
const _animAttack_L_upperarm_keys = [
    {
        frame: _animAttack_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(12.2255, 19.9400, -21.2424))
    },
    {
        frame: _animAttack_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(12.2255, 19.9400, -51.2424))
    },
    {
        frame: _animAttack_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(12.2255, 19.9400, -21.2424))
    }
];
const animAttack_L_upperarm = new MYANIM.Animation(_animAttack_L_upperarm_bab, _animAttack_L_upperarm_keys);

const _animAttack_R_collarbone_bab = new Animation("animAttack_R_collarbone", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION);
_animAttack_R_collarbone_bab.setEasingFunction(attackEase);
const _animAttack_R_collarbone_keys = [
    {
        frame: _animAttack_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(10.6983, 23.4999, -73.8354))
    },
    {
        frame: _animAttack_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(70.6983, -23.4999, -73.8354))
    },
    {
        frame: _animAttack_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(70.6983, -25.4999, -73.8354))
    },
    {
        frame: _animAttack_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(10.6983, 23.4999, -73.8354))
    }
];
const animAttack_R_collarbone = new MYANIM.Animation(_animAttack_R_collarbone_bab, _animAttack_R_collarbone_keys);

const _animAttack_R_upperarm_bab = new Animation("animAttack_R_upperarm", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION);
_animAttack_R_upperarm_bab.setEasingFunction(attackEase);
const _animAttack_R_upperarm_keys = [
    {
        frame: _animAttack_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(12.2255, -19.9400, 21.2424))
    },
    {
        frame: _animAttack_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(12.2255, -19.9400, 10.2424))
    },
    {
        frame: _animAttack_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(12.2255, -19.9400, 21.2424))
    }
];
const animAttack_R_upperarm = new MYANIM.Animation(_animAttack_R_upperarm_bab, _animAttack_R_upperarm_keys);

// the animation is triggered by this function
function attack(meshdata, scene, onAnimationEnd) {

    MYANIM.directAnimation(scene, meshdata.getNode("Base HumanSpine2_00"), [animAttack_spine_2]);

    MYANIM.directAnimation(scene, meshdata.getNode("Base HumanHead_09"), [animAttack_head]);

    MYANIM.directAnimation(scene, meshdata.getNode("Base HumanLArmCollarbone_033"), [animAttack_L_collarbone]);
    MYANIM.directAnimation(scene, meshdata.getNode("Base HumanLArmUpperarm_034"), [animAttack_L_upperarm]);

    MYANIM.directAnimation(scene, meshdata.getNode("Base HumanRArmCollarbone_015"), [animAttack_R_collarbone]);

    MYANIM.directAnimation(scene, meshdata.getNode("Base HumanRArmUpperarm_016"), [animAttack_R_upperarm]); 
    
}

/**
 * The exported object.
 */
const miscanims = {
    attack,
};

export default miscanims;
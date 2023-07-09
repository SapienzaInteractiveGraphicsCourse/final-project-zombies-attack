import * as MYANIM from "../../../libs/animation"
import { RotationFromDegrees } from "../../../libs/angles";
import { 
    PowerEase,
    Vector3,
    SineEase,
    EasingFunction,
    Animation,
    Quaternion,
    QuadraticEase,
    AnimationGroup
} from "@babylonjs/core";

/**
 * Attack animation
 */
const _animAttack_frames = [0, 18, 33, 54, 63];
const frameRate = 60;
const attackEase = new PowerEase(1.3);
attackEase.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

const _animAttack_spine_2_bab = new Animation("animAttack_spine_2", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
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
//Adding keys to the animation object
_animAttack_spine_2_bab.setKeys(_animAttack_spine_2_keys);

const _animAttack_head_bab = new Animation("animAttack_head", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
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
_animAttack_head_bab.setKeys(_animAttack_head_keys);

const _animAttack_L_collarbone_bab = new Animation("animAttack_L_collarbone", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animAttack_L_collarbone_bab.setEasingFunction(attackEase);
const _animAttack_L_collarbone_keys = [
    {
        frame: _animAttack_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(10.6983, -23.4999, 73.8354))
    }
];
_animAttack_L_collarbone_bab.setKeys(_animAttack_L_collarbone_keys);

const _animAttack_L_upperarm_bab = new Animation("animAttack_L_upperarm", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
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
_animAttack_L_upperarm_bab.setKeys(_animAttack_L_upperarm_keys);

const _animAttack_R_collarbone_bab = new Animation("animAttack_R_collarbone", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
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
_animAttack_R_collarbone_bab.setKeys(_animAttack_R_collarbone_keys);

const _animAttack_R_upperarm_bab = new Animation("animAttack_R_upperarm", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
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
_animAttack_R_upperarm_bab.setKeys(_animAttack_R_upperarm_keys);

// the animation is triggered by this function
function attack(sceneInfo, meshdata) {
    const animationGroup = new AnimationGroup("attack");
    
    animationGroup.addTargetedAnimation(_animAttack_spine_2_bab, meshdata.getNode("Base HumanSpine2_00"));
    animationGroup.addTargetedAnimation(_animAttack_head_bab, meshdata.getNode("Base HumanHead_09"));
    animationGroup.addTargetedAnimation(_animAttack_L_collarbone_bab, meshdata.getNode("Base HumanLArmCollarbone_033"));
    animationGroup.addTargetedAnimation(_animAttack_L_upperarm_bab, meshdata.getNode("Base HumanLArmUpperarm_034"));
    animationGroup.addTargetedAnimation(_animAttack_R_collarbone_bab, meshdata.getNode("Base HumanRArmCollarbone_015"));
    animationGroup.addTargetedAnimation(_animAttack_R_upperarm_bab, meshdata.getNode("Base HumanRArmUpperarm_016"));

    // Make sure to normalize animations to the same timeline
    animationGroup.normalize(0, 63);

    meshdata.mesh.animations.push(animationGroup)

    meshdata.mesh.animations[0].onAnimationGroupLoopObservable.add(()=>{
        sceneInfo.player.hp -= 5;
    });
}

/**
 * The exported object.
 */
const attackanims = {
    attack
};

export default attackanims;
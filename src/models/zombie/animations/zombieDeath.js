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

let lastPosition = new Vector3(0, 0, 0);

/**
 * Death animation
 */
const _animDeath_frames = [0, 18, 33, 54, 63, 72, 78, 90];
const frameRate = 60;
const deathEase = new QuadraticEase();
deathEase.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

const _animDeath_pelvis_1_bab = new Animation("animDeath_pelvis_1", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_pelvis_1_bab.setEasingFunction(deathEase);
const _animDeath_pelvis_1_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.0, 90.1999, 0.0))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.0, 90.1999, -90.0))
    }
];
_animDeath_pelvis_1_bab.setKeys(_animDeath_pelvis_1_keys);

const _animDeath_meshY_bab = new Animation("animDeath_meshY", "position.y", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_meshY_bab.setEasingFunction(deathEase);
const _animDeath_meshY_keys = [
    {
        frame: _animDeath_frames[0],
        value: lastPosition.y
    },
    {
        frame: _animDeath_frames[1],
        value: lastPosition.y - 0.1
    },
    {
        frame: _animDeath_frames[2],
        value: lastPosition.y - 0.3
    },
    {
        frame: _animDeath_frames[3],
        value: lastPosition.y - 0.5
    },
    {
        frame: _animDeath_frames[4],
        value: lastPosition.y - 0.7
    },
    {
        frame: _animDeath_frames[5],
        value: lastPosition.y - 0.8
    },
    {
        frame: _animDeath_frames[6],
        value: lastPosition.y - 0.9
    },
    {
        frame: _animDeath_frames[7],
        value: lastPosition.y - 1.3
    }
];
_animDeath_meshY_bab.setKeys(_animDeath_meshY_keys);

const _animDeath_spine_1_bab = new Animation("animDeath_spine_1", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_spine_1_bab.setEasingFunction(deathEase);
const _animDeath_spine_1_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(13.1455, -90.0000, 0.0000))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-40.1455, -90.0000, 0.0000))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-60.1455, -90.0000, 0.0000))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(13.1455, -90.0000, 0.0000))
    }
];
_animDeath_spine_1_bab.setKeys(_animDeath_spine_1_keys);

const _animDeath_spine_2_bab = new Animation("animDeath_spine_2", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_spine_2_bab.setEasingFunction(deathEase);
const _animDeath_spine_2_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-32.9912, 0, 0))
    },
    {
        frame: _animDeath_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-42.9912, 0, 0))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-52.9912, 0, 0))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-22.9912, 0, 0))
    }
];
_animDeath_spine_2_bab.setKeys(_animDeath_spine_2_keys);

const _animDeath_neck_bab = new Animation("animDeath_neck", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_neck_bab.setEasingFunction(deathEase);
const _animDeath_neck_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-23.6862, 0.0000, -180.0000))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-23.6862, 50.0000, -180.0000))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-23.6862, 50.0000, -180.0000))
    }
];
_animDeath_neck_bab.setKeys(_animDeath_neck_keys);

const _animDeath_head_bab = new Animation("animDeath_head", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_head_bab.setEasingFunction(deathEase);
const _animDeath_head_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.0000, 90.0000, 36.3139))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.0000, 90.0000, 16.3139))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.0000, 90.0000, 36.3139))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.0000, 90.0000, 66.3139))
    }
];
_animDeath_head_bab.setKeys(_animDeath_head_keys);

const _animDeath_L_collarbone_bab = new Animation("animDeath_L_collarbone", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_L_collarbone_bab.setEasingFunction(deathEase);
const _animDeath_L_collarbone_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(30.6983, -23.4999, 73.8354))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(70.6983, -43.4999, 73.8354))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(80.6983, -43.4999, 73.8354))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(30.6983, -43.4999, 73.8354))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(10.6983, -23.4999, 73.8354))
    }
];
_animDeath_L_collarbone_bab.setKeys(_animDeath_L_collarbone_keys);

const _animDeath_L_upperarm_bab = new Animation("animDeath_L_upperarm", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_L_upperarm_bab.setEasingFunction(deathEase);
const _animDeath_L_upperarm_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(82.2255, 19.9400, -21.2424))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(32.2255, 19.9400, -21.2424))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(12.2255, 19.9400, -21.2424))
    }
];
_animDeath_L_upperarm_bab.setKeys(_animDeath_L_upperarm_keys);

const _animDeath_R_collarbone_bab = new Animation("animDeath_R_collarbone", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_R_collarbone_bab.setEasingFunction(deathEase);
const _animDeath_R_collarbone_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(30.6983, 23.4999, -73.8354))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(70.6983, 43.4999, -73.8354))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(80.6983, 43.4999, -73.8354))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(30.6983, 43.4999, -73.8354))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(10.6984, 23.4999, -73.8354))
    }
];
_animDeath_R_collarbone_bab.setKeys(_animDeath_R_collarbone_keys);

const _animDeath_R_upperarm_bab = new Animation("animDeath_R_upperarm", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_R_upperarm_bab.setEasingFunction(deathEase);
const _animDeath_R_upperarm_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(82.2255, -19.9400, 21.2424))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(32.2255, -19.9400, 21.2424))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(12.2255, -19.9400, 21.2424))
    }
];
_animDeath_R_upperarm_bab.setKeys(_animDeath_R_upperarm_keys);

const _animDeath_L_thigh_bab = new Animation("animDeath_L_thigh", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_L_thigh_bab.setEasingFunction(deathEase);
const _animDeath_L_thigh_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-53.9550, -90.7844, -171.8719))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-73.9550, -90.7844, -171.8719))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-103.9550, -90.7844, -171.8719))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-120.9550, -90.7844, -171.8719))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9550, -90.7844, -171.8719))
    }
];
_animDeath_L_thigh_bab.setKeys(_animDeath_L_thigh_keys);

const _animDeath_L_calf_bab = new Animation("animDeath_L_calf", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_L_calf_bab.setEasingFunction(deathEase);
const _animDeath_L_calf_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-32.0456, -1.9191, -0.0246))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-42.0456, -1.9191, -0.0246))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-52.0456, -1.9191, -0.0246))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-32.0456, -1.9191, -0.0246))
    },
    {
        frame: _animDeath_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-42.0456, -1.9191, -0.0246))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-62.0456, -1.9191, -0.0246))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-12.0456, -1.9191, -0.0246))
    }
];
_animDeath_L_calf_bab.setKeys(_animDeath_L_calf_keys);

const _animDeath_R_thigh_bab = new Animation("animDeath_R_thigh", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_R_thigh_bab.setEasingFunction(deathEase);
const _animDeath_R_thigh_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(30.9550, -89.2314, 171.8719))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-73.9550, -89.2314, 171.8719))
    },
    {
        frame: _animDeath_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-103.9550, -89.2314, 171.8719))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-120.9550, -89.2314, 171.8719))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9550, -90.7844, 171.8719))
    }
];
_animDeath_R_thigh_bab.setKeys(_animDeath_R_thigh_keys);

const _animDeath_R_calf_bab = new Animation("animDeath_R_calf", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CONSTANT);
_animDeath_R_calf_bab.setEasingFunction(deathEase);
const _animDeath_R_calf_keys = [
    {
        frame: _animDeath_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-12.0425, 1.9203, 0.0199))
    },
    {
        frame: _animDeath_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-27.0425, 1.9203, 0.0199))
    },
    {
        frame: _animDeath_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-40.0425, 1.9203, 0.0199))
    },
    {
        frame: _animDeath_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-62.0425, 1.9203, 0.0199))
    },
    {
        frame: _animDeath_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-12.0425, 1.9203, 0.0199))
    }
];
_animDeath_R_calf_bab.setKeys(_animDeath_R_calf_keys);

// the animation is triggered by this function
function death(meshdata) {
    const animationGroup = new AnimationGroup("death");
    lastPosition = meshdata.mesh.position;

    animationGroup.addTargetedAnimation(_animDeath_meshY_bab, meshdata.mesh);
    animationGroup.addTargetedAnimation(_animDeath_pelvis_1_bab, meshdata.getNode("Base HumanPelvis_01"));

    animationGroup.addTargetedAnimation(_animDeath_spine_1_bab, meshdata.getNode("Base HumanSpine1_06"));
    animationGroup.addTargetedAnimation(_animDeath_spine_2_bab, meshdata.getNode("Base HumanSpine2_00"));

    animationGroup.addTargetedAnimation(_animDeath_neck_bab, meshdata.getNode("Base HumanNeck_08"));
    animationGroup.addTargetedAnimation(_animDeath_head_bab, meshdata.getNode("Base HumanHead_09"));

    animationGroup.addTargetedAnimation(_animDeath_L_collarbone_bab, meshdata.getNode("Base HumanLArmCollarbone_033"));
    animationGroup.addTargetedAnimation(_animDeath_L_upperarm_bab, meshdata.getNode("Base HumanLArmUpperarm_034"));

    animationGroup.addTargetedAnimation(_animDeath_R_collarbone_bab, meshdata.getNode("Base HumanRArmCollarbone_015"));
    animationGroup.addTargetedAnimation(_animDeath_R_upperarm_bab, meshdata.getNode("Base HumanRArmUpperarm_016"));

    animationGroup.addTargetedAnimation(_animDeath_L_thigh_bab, meshdata.getNode("Base HumanLLegThigh_051"));
    animationGroup.addTargetedAnimation(_animDeath_L_calf_bab, meshdata.getNode("Base HumanLLegCalf_052"));

    animationGroup.addTargetedAnimation(_animDeath_R_thigh_bab,  meshdata.getNode("Base HumanRThigh_02"));
    animationGroup.addTargetedAnimation(_animDeath_R_calf_bab, meshdata.getNode("Base HumanRCalf_03"));

    // Make sure to normalize animations to the same timeline
    animationGroup.normalize(0, 90);

    meshdata.mesh.animations.push(animationGroup)
}

/**
 * The exported object.
 */
const miscanims = {
    death,
};

export default miscanims;
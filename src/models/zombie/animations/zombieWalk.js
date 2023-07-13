/**
 * Name stands for "Miscellaneous Animations".
 * File contains all animations of the Samurai not related to its actions,
 * because they are pretty long.
 * EXPORTS an objects with the functions to trigger those animations.
 */
import { 
    PowerEase,
    EasingFunction,
    Animation,
    Quaternion,
    AnimationGroup
} from "@babylonjs/core";
import { RotationFromDegrees } from "../../../libs/angles";

/**
 * Walk animation
 */
const _animWalk_frames = [0, 18, 33, 54, 63, 72, 78, 90, 102];
const frameRate = 60;
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
        value: -0.3
    },
    {
        frame: _animWalk_frames[3],
        value: 0.05
    },
    {
        frame: _animWalk_frames[5],
        value: -0.3
    },
    {
        frame: _animWalk_frames[7],
        value: 0.05
    },
    {
        frame: _animWalk_frames[8],
        value: 0
    }
];
_animWalk_meshY_bab.setKeys(_animWalk_meshY_keys);

const _animWalk_spine_1_bab = new Animation("animWalk_spine_1", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_spine_1_bab.setEasingFunction(walkEase);
const _animWalk_spine_1_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(13.1455, -90.0000, 0.0000))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(46.9550, -90.0000, 0.0000))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(23.1455, -90.0000, 0.0000))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(18.1455, -90.0000, 0.0000))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(13.1455, -90.0000, 0.0000))
    }
];
_animWalk_spine_1_bab.setKeys(_animWalk_spine_1_keys);

const _animWalk_spine_2_bab = new Animation("animWalk_spine_2", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_spine_2_bab.setEasingFunction(walkEase);
const _animWalk_spine_2_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-32.9912, 0, 0))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-22.9912, 0, 0))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(12.9912, 0, 0))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-22.9912, 0, 0))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-32.9912, 0, 0))
    }
];
_animWalk_spine_2_bab.setKeys(_animWalk_spine_2_keys);

const _animWalk_neck_bab = new Animation("animWalk_neck", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_neck_bab.setEasingFunction(walkEase);
const _animWalk_neck_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-23.6862, 0.0000, -180.0000))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-43.6862, 0.0000, -180.0000))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-53.6862, 0.0000, -180.0000))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-23.6862, 0.0000, -180.0000))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-23.6862, 0.0000, -180.0000))
    }
];
_animWalk_neck_bab.setKeys(_animWalk_neck_keys);

const _animWalk_head_bab = new Animation("animWalk_head", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_head_bab.setEasingFunction(walkEase);
const _animWalk_head_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.0000, 90.0000, 36.3139))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.0000, 90.0000, 16.3139))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.0000, 90.0000, 6.3139))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.0000, 90.0000, -6.3139))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.0000, 90.0000, 16.3139))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.0000, 90.0000, 36.3139))
    },
];
_animWalk_head_bab.setKeys(_animWalk_head_keys);

const _animWalk_L_collarbone_bab = new Animation("animWalk_L_collarbone", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_L_collarbone_bab.setEasingFunction(walkEase);
const _animWalk_L_collarbone_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(30.6983, -23.4999, 73.8354))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(70.6983, -23.4999, 73.8354))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(80.6983, -23.4999, 73.8354))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(30.6983, -23.4999, 73.8354))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(30.6983, -23.4999, 73.8354))
    }
];
_animWalk_L_collarbone_bab.setKeys(_animWalk_L_collarbone_keys);

const _animWalk_L_upperarm_bab = new Animation("animWalk_L_upperarm", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_L_upperarm_bab.setEasingFunction(walkEase);
const _animWalk_L_upperarm_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(82.2255, 19.9400, -21.2424))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(82.2255, 19.9400, -21.2424))
    }
];
_animWalk_L_upperarm_bab.setKeys(_animWalk_L_upperarm_keys);

const _animWalk_R_collarbone_bab = new Animation("animWalk_R_collarbone", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_R_collarbone_bab.setEasingFunction(walkEase);
const _animWalk_R_collarbone_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(30.6983, 23.4999, -73.8354))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(70.6983, 23.4999, -73.8354))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(80.6983, 23.4999, -73.8354))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(30.6983, 23.4999, -73.8354))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(30.6983, 23.4999, -73.8354))
    }
];
_animWalk_R_collarbone_bab.setKeys(_animWalk_R_collarbone_keys);

const _animWalk_R_upperarm_bab = new Animation("animWalk_R_upperarm", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_R_upperarm_bab.setEasingFunction(walkEase);
const _animWalk_R_upperarm_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(82.2255, -19.9400, 21.2424))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(82.2255, -19.9400, 21.2424))
    }
];
_animWalk_R_upperarm_bab.setKeys(_animWalk_R_upperarm_keys);

const _animWalk_L_thigh_bab = new Animation("animWalk_L_thigh", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_L_thigh_bab.setEasingFunction(walkEase);
const _animWalk_L_thigh_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9550, -90.7844, -171.8719))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-33.9550, -90.7844, -171.8719))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-43.9550, -90.7844, -171.8719))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-33.9550, -90.7844, -171.8719))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9550, -90.7844, -171.8719))
    }, 
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(10.9550, -90.7844, -171.8719))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(20.9550, -90.7844, -171.8719))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(10.9550, -90.7844, -171.8719))
    }, 
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.9550, -90.7844, -171.8719))
    }
];
_animWalk_L_thigh_bab.setKeys(_animWalk_L_thigh_keys);

const _animWalk_L_calf_bab = new Animation("animWalk_L_calf", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_L_calf_bab.setEasingFunction(walkEase);
const _animWalk_L_calf_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.0456, -1.9191, -0.0246))
    }, 
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-29.0456, -1.9191, -0.0246))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-37.0456, -1.9191, -0.0246))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.0456, -1.9191, -0.0246))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-0.0456, -1.9191, -0.0246))
    }
];
_animWalk_L_calf_bab.setKeys(_animWalk_L_calf_keys);

const _animWalk_R_thigh_bab = new Animation("animWalk_R_thigh", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_R_thigh_bab.setEasingFunction(walkEase);
const _animWalk_R_thigh_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9550, -89.2314, 171.8719))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(5.9550, -89.2314, 171.8719))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(10.9550, -89.2314, 171.8719))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(5.9550, -89.2314, 171.8719))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9550, -89.2314, 171.8719))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-20.9550, -89.2314, 171.8719))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-40.9550, -89.2314, 171.8719))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-20.9550, -89.2314, 171.8719))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(0.9550, -89.2314, 171.8719))
    }
];
_animWalk_R_thigh_bab.setKeys(_animWalk_R_thigh_keys);

const _animWalk_R_calf_bab = new Animation("animWalk_R_calf", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_R_calf_bab.setEasingFunction(walkEase);
const _animWalk_R_calf_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-12.0425, 1.9203, 0.0199))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-27.0425, 1.9203, 0.0199))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-40.0425, 1.9203, 0.0199))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-35.0425, 1.9203, 0.0199))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-40.0425, 1.9203, 0.0199))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-25.0425, 1.9203, 0.0199))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-12.0425, 1.9203, 0.0199))
    }
];
_animWalk_R_calf_bab.setKeys(_animWalk_R_calf_keys);

// the animation is triggered by this function
function walk(meshdata) {
    const animationGroup = new AnimationGroup("walk");

    animationGroup.addTargetedAnimation(_animWalk_meshY_bab, meshdata.mesh);

    animationGroup.addTargetedAnimation(_animWalk_spine_1_bab, meshdata.getNode("Base HumanSpine1_06"));
    animationGroup.addTargetedAnimation(_animWalk_spine_2_bab, meshdata.getNode("Base HumanSpine2_00"));

    animationGroup.addTargetedAnimation(_animWalk_neck_bab, meshdata.getNode("Base HumanNeck_08"));
    animationGroup.addTargetedAnimation(_animWalk_head_bab, meshdata.getNode("Base HumanHead_09"));

    animationGroup.addTargetedAnimation(_animWalk_L_collarbone_bab, meshdata.getNode("Base HumanLArmCollarbone_033"));
    animationGroup.addTargetedAnimation(_animWalk_L_upperarm_bab, meshdata.getNode("Base HumanLArmUpperarm_034"));

    animationGroup.addTargetedAnimation(_animWalk_R_collarbone_bab, meshdata.getNode("Base HumanRArmCollarbone_015"));
    animationGroup.addTargetedAnimation(_animWalk_R_upperarm_bab, meshdata.getNode("Base HumanRArmUpperarm_016"));

    animationGroup.addTargetedAnimation(_animWalk_L_thigh_bab, meshdata.getNode("Base HumanLLegThigh_051"));
    animationGroup.addTargetedAnimation(_animWalk_L_calf_bab, meshdata.getNode("Base HumanLLegCalf_052"));

    animationGroup.addTargetedAnimation(_animWalk_R_thigh_bab,  meshdata.getNode("Base HumanRThigh_02"));
    animationGroup.addTargetedAnimation(_animWalk_R_calf_bab, meshdata.getNode("Base HumanRCalf_03"));

    // Make sure to normalize animations to the same timeline
    animationGroup.normalize(0, 102);

    meshdata.mesh.animations.push(animationGroup)
}


/**
 * The exported object.
 */
const walkanims = {
    walk
};

export default walkanims;
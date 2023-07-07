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
let walkAnimatable;
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
const animWalk_meshY = new MYANIM.Animation(_animWalk_meshY_bab, _animWalk_meshY_keys);

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
const animWalk_spine_1 = new MYANIM.Animation(_animWalk_spine_1_bab, _animWalk_spine_1_keys);

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
const animWalk_spine_2 = new MYANIM.Animation(_animWalk_spine_2_bab, _animWalk_spine_2_keys);

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
const animWalk_neck = new MYANIM.Animation(_animWalk_neck_bab, _animWalk_neck_keys);

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
const animWalk_head = new MYANIM.Animation(_animWalk_head_bab, _animWalk_head_keys);

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
const animWalk_L_collarbone = new MYANIM.Animation(_animWalk_L_collarbone_bab, _animWalk_L_collarbone_keys);

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
const animWalk_L_upperarm = new MYANIM.Animation(_animWalk_L_upperarm_bab, _animWalk_L_upperarm_keys);

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
const animWalk_R_collarbone = new MYANIM.Animation(_animWalk_R_collarbone_bab, _animWalk_R_collarbone_keys);

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
const animWalk_R_upperarm = new MYANIM.Animation(_animWalk_R_upperarm_bab, _animWalk_R_upperarm_keys);

const _animWalk_L_thigh_bab = new Animation("animWalk_L_thigh", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_L_thigh_bab.setEasingFunction(walkEase);
const _animWalk_L_thigh_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-53.9550, -90.7844, -171.8719))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-70.9550, -90.7844, -171.8719))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-42.9550, -90.7844, -171.8719))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-20.9550, -90.7844, -171.8719))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-10.9550, -90.7844, -171.8719))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-20.9550, -90.7844, -171.8719))
    },
    {
        frame: _animWalk_frames[6],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-40.9550, -90.7844, -171.8719))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-70.9550, -90.7844, -171.8719))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-53.9550, -90.7844, -171.8719))
    }
];
const animWalk_L_thigh = new MYANIM.Animation(_animWalk_L_thigh_bab, _animWalk_L_thigh_keys);

const _animWalk_L_calf_bab = new Animation("animWalk_L_calf", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_L_calf_bab.setEasingFunction(walkEase);
const _animWalk_L_calf_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-32.0456, -1.9191, -0.0246))
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
        value: Quaternion.FromEulerVector(RotationFromDegrees(-32.0456, -1.9191, -0.0246))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-57.0456, -1.9191, -0.0246))
    },
    {
        frame: _animWalk_frames[5],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-72.0456, -1.9191, -0.0246))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-47.0456, -1.9191, -0.0246))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-32.0456, -1.9191, -0.0246))
    }
];
const animWalk_L_calf = new MYANIM.Animation(_animWalk_L_calf_bab, _animWalk_L_calf_keys);

const _animWalk_R_thigh_bab = new Animation("animWalk_R_thigh", "rotationQuaternion", frameRate, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);
_animWalk_R_thigh_bab.setEasingFunction(walkEase);
const _animWalk_R_thigh_keys = [
    {
        frame: _animWalk_frames[0],
        value: Quaternion.FromEulerVector(RotationFromDegrees(30.9550, -89.2314, 171.8719))
    },
    {
        frame: _animWalk_frames[1],
        value: Quaternion.FromEulerVector(RotationFromDegrees(45.9550, -89.2314, 171.8719))
    },
    {
        frame: _animWalk_frames[2],
        value: Quaternion.FromEulerVector(RotationFromDegrees(15.9550, -89.2314, 171.8719))
    },
    {
        frame: _animWalk_frames[3],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-20.9550, -89.2314, 171.8719))
    },
    {
        frame: _animWalk_frames[4],
        value: Quaternion.FromEulerVector(RotationFromDegrees(-25.9550, -89.2314, 171.8719))
    },
    {
        frame: _animWalk_frames[7],
        value: Quaternion.FromEulerVector(RotationFromDegrees(10.9550, -89.2314, 171.8719))
    },
    {
        frame: _animWalk_frames[8],
        value: Quaternion.FromEulerVector(RotationFromDegrees(30.9550, -89.2314, 171.8719))
    }
];
const animWalk_R_thigh = new MYANIM.Animation(_animWalk_R_thigh_bab, _animWalk_R_thigh_keys);

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
const animWalk_R_calf = new MYANIM.Animation(_animWalk_R_calf_bab, _animWalk_R_calf_keys);

// the animation is triggered by this function
function walk(meshdata, scene, onAnimationEnd) {
    walkAnimatable = MYANIM.directAnimationLoop(scene, meshdata.mesh, [animWalk_meshY]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanSpine1_06"), [animWalk_spine_1]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanSpine2_00"), [animWalk_spine_2]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanNeck_08"), [animWalk_neck]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanHead_09"), [animWalk_head]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanLArmCollarbone_033"), [animWalk_L_collarbone]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanLArmUpperarm_034"), [animWalk_L_upperarm]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRArmCollarbone_015"), [animWalk_R_collarbone]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRArmUpperarm_016"), [animWalk_R_upperarm]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanLLegThigh_051"), [animWalk_L_thigh]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanLLegCalf_052"), [animWalk_L_calf]);

    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRThigh_02"), [animWalk_R_thigh]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Base HumanRCalf_03"), [animWalk_R_calf]);
}

/**
 * Returns a Promise that resolves the next time that the idle animation ends a loop.
 * It allows us to have all action animations start from the same pose
 * without having an abrupt, transitionless reset every time,
 * at the cost of potentially waiting less than 2 seconds at most between
 * enemy turn beginning and action execution.
 */
function endWalkGracefully() {
    return new Promise((resolve, reject) => {
        walkAnimatable.onAnimationLoopObservable.addOnce((res)=>{ 
            console.log(res)
            resolve()
        });
    });
}


/**
 * The exported object.
 */
const walkanims = {
    walk,
    endWalkGracefully
};

export default walkanims;
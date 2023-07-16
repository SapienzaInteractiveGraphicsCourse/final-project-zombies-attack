import {
    Vector3
} from "@babylonjs/core";

function deg2rad(alpha) {
    return alpha*Math.PI/180.0;
}

function rad2deg(alpha) {
    return alpha*180.0/Math.PI;
}

function RotationFromDegrees(x,y,z) {
    return new Vector3(deg2rad(x), deg2rad(y), deg2rad(z))
}

export {
    deg2rad,
    rad2deg,
    RotationFromDegrees,
};
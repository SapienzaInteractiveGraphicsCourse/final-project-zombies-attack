function _highestFrame(keys) {
    let max = 0;
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].frame > max) {
            max = keys[i].frame;
        }
    }
    return max;
}

class Animation {
    constructor(BabylonAnim, keys) {
        this.anim = BabylonAnim;
        this.anim.setKeys(keys);
        this.length = _highestFrame(keys);
    }
}

function directAnimation(scene, target, animations, onAnimationEnd=undefined, speedRatio=1, isAdditive=false) {
    let babylonAnimations = [];
    let maxlen = 0;
    for (let i = 0; i < animations.length; i++) {
        babylonAnimations.push(animations[i].anim);
        if (animations[i].length > maxlen) {
            maxlen = animations[i].length;
        }
    }
    return scene.beginDirectAnimation(target, babylonAnimations, 0, maxlen, false, speedRatio, onAnimationEnd, undefined, isAdditive);
}

export default { Animation, directAnimation };
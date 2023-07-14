/**
 * Small library of functions and constants useful to all scenes.
 */

import { options } from "../options";
import {
    ShadowGenerator,
    HemisphericLight,
    DirectionalLight,
    Vector3,
    Color3
} from "@babylonjs/core";

const DEFAULT_AMBIENT_INTENSITY = 1.8;

function createAmbientLight(scene) {
    // create an hemispheric light
    var light = new HemisphericLight("light", new Vector3(0.5, 1, 0.3), scene);
    // these ruins aren't brightly lit: set a lower intensity...
    light.intensity = DEFAULT_AMBIENT_INTENSITY;
    // ...and a dimmer diffuse color, so we can darken the dungeon a bit further w/o dimming specular reflections too much
    light.diffuse = new Color3(0.6, 0.6, 0.6);

    // return the light for future use
    return light;
}

function createDirectionalLight(scene, shadowcasters = []) {
    // create a directional light
    var light = new DirectionalLight("light", new Vector3(-1, -2, -1), scene);
    // these ruins aren't brightly lit: set a lower intensity...
    light.intensity = DEFAULT_AMBIENT_INTENSITY;
    // ...and a dimmer diffuse color, so we can darken the dungeon a bit further w/o dimming specular reflections too much
    light.diffuse = new Color3(0.8, 0.8, 0.8);
    light.position = new Vector3(20, 40, 20)
    light.shadowEnabled = true;

    if (options.shadows != 0) {
        let resolution;
            switch (options.shadows) {
                case 2:
                    resolution = 2048;
                    break;
                case 3:
                    resolution = 4096;
                    break;
                default:
                case 1:
                    resolution = 1024;
                    break;
            }
        const shadowgen = new ShadowGenerator(resolution, light);
        shadowcasters.forEach(element => {
            shadowgen.addShadowCaster(element);
        });

        shadowgen.setDarkness(-10.0);
        shadowgen.useContactHardeningShadow = true;
        shadowgen.useExponentialShadowMap = true;
        shadowgen.usePoissonSampling = true;
    }

    return light;
}

export default {
    DEFAULT_AMBIENT_INTENSITY,
    createAmbientLight,
    createDirectionalLight,
}
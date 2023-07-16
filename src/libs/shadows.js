import { options } from "../options";
import {
    ShadowGenerator,
    DirectionalLight,
    Vector3
} from "@babylonjs/core";

function createDirectionalLight(scene, shadowcasters = []) {
    var light = new DirectionalLight("light", new Vector3(-1, -2, -1), scene);
    light.intensity = 1.8;
    light.position = new Vector3(20, 40, 20)
    light.shadowEnabled = true;

    if (options.settings.shadows.enabled !== false) {
        let resolution;
            switch (options.settings.shadows.quality) {
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
            shadowgen.setDarkness(-10.0);
            shadowgen.useContactHardeningShadow = true;
            shadowgen.useExponentialShadowMap = true;
            shadowgen.usePoissonSampling = true;
        });
    }

    return light;
}

export default {
    createDirectionalLight,
}
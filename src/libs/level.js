import {
    Scene,
    Vector3,
    CubeTexture,
    MeshBuilder,
    UniversalCamera,
    SceneLoader,
    PBRMaterial,
    Mesh,
    Texture,
    Ray,
    Sound,
    Engine,
    Axis,
    Space,
    StandardMaterial,
    Color3,
    Quaternion,
    MotionBlurPostProcess,
    DirectionalLight,
    ShadowGenerator,
    HavokPlugin

} from "@babylonjs/core";
import HavokPhysics from "@babylonjs/havok"
import * as GUI from "@babylonjs/gui";
import "@babylonjs/loaders";
import { shotAnimation } from '../models/gun/animations/gunShot'
import { options } from "../options";
import enemy from "../models/zombie/zombie";
import ammoBox from "../models/ammoBox/ammoBox";
import hud from "../HUD/HUD";
import gunanims from "../models/gun/animations/gunReload";
import { RoundSystem } from "../libs/roundSystem";
import map1Builder from "./map1";
import map2Builder from "./map2";
import map3Builder from "./map3";


function rounding(sceneInfo, level) {

    enemy.loadAsync(sceneInfo.scene)

    enemy.meshdata.meshes.forEach((mesh) => {
        mesh.checkCollisions = true;
      })

    if (enemy.hp <= 0 && enemy.meshdata) {
        sceneInfo.scene.getAnimationGroupByName("walk").stop()
        sceneInfo.scene.getAnimationGroupByName("attack").stop()
        sceneInfo.scene.getAnimationGroupByName("death").play()
        sceneInfo.scene.getAnimationGroupByName("death").onAnimationGroupEndObservable.add(() => {
          bodyFall.play()
          // Dispose the parent mesh
          //enemy.meshdata = false;
          sceneInfo.player.pts += 100;
          setTimeout(() => {
            mesh.dispose();
          }, 1000);
           // Dispose the mesh after 1s when the death animation has finished
        })
        const hp = sceneInfo.enemy.hp;
          sceneInfo.enemy.hp = level*hp;
          sceneInfo.enemy.speed += 0.001;
          sceneInfo.enemy.damage +=5;
          level ++;
          enemy.loadAsync(sceneInfo.scene)
      }

    

}
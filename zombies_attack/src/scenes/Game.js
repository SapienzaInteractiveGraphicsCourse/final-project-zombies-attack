/**
 * File for the main menu of the game.
 */

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
    Engine
} from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import * as HUD from '../HUD/HUD.json'
import Animations from '../Animations'
import { options } from "../options";

async function createScene(canvas, engine) {
    const scene = new Scene(engine);

    scene.onPointerDown = (event) => {
        console.log(event, this)
        if (event.button === 0) {
            canvas.width = window.outerWidth;
            canvas.height = window.outerHeight;
            engine.enterPointerlock();
            engine.enterFullscreen();
        }
        if (event.button === 1) {
            canvas.width = this.width;
            canvas.height = this.height;
            engine.exitPointerlock();
            engine.exitFullscreen();
        }
    }

    HandleControl(engine)
  
    const framesPerSecond = 60;
    const gravity = -9.81;
    scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);
    scene.collisionsEnabled = true;


    const envTex = CubeTexture.CreateFromPrefilteredData('./environment/sky.env', scene)
    scene.environmentTexture = envTex

    scene.createDefaultSkybox(envTex, true)

    CreateHUD()
    CreateEnvironment(scene)
    const camera = CreateController(scene)
    const gun = await LoadGun(scene, camera)
    LoadZombie(scene)
    Shot(scene, camera, gun)

    return scene;
}

function CreateHUD() {
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    advancedTexture.parseSerializedObject(HUD, true)
}

async function CreateEnvironment(scene) {
    const ground = MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, scene)

    ground.material = CreateAsphalt(scene)
    
    ground.model = ground;

    ground.checkCollisions = true;
}

function CreateAsphalt(scene) {
    const pbr = new PBRMaterial('pbr', scene)
    pbr.albedoTexture = new Texture('./textures/asphalt/asphalt_diffuse.jpg', scene)

    pbr.bumpTexture = new Texture('./textures/asphalt/asphalt_normal.jpg', scene)
    pbr.invertNormalMapX = true
    pbr.invertNormalMapY = true

    pbr.useAmbientOcclusionFromMetallicTextureRed = true
    pbr.useRoughnessFromMetallicTextureGreen = true
    pbr.useMetallnessFromMetallicTextureBlue = true

    pbr.metallicTexture = new Texture('./textures/asphalt/asphalt_ao.jpg', scene)

    return pbr
}

function CreateController(scene) {
    const camera = new UniversalCamera("UniversalCamera", new Vector3(1, 1, 1), scene);
    camera.setTarget(new Vector3(0, 1, 0));

    camera.attachControl()
    camera.speed = 0.25

    camera.applyGravity = true;
    camera.checkCollisions = true;

    camera.ellipsoid = new Vector3(0.5, 2, 0.5);
    camera.ellipsoidOffset = new Vector3(0.0, 2, 0.0);

    camera.minZ = 0.01;
    camera.angularSensibility = 4000;

    camera.keysUp.push(87);
    camera.keysLeft.push(65);
    camera.keysDown.push(83);
    camera.keysRight.push(68);
    
    return camera
}

async function LoadGun(scene, camera) {
    SetupCrosshair()

    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/weapons/", "scene.glb", scene);

    // Set all other meshes invisible
    meshes.map((mesh) => {
      mesh.isVisible = false;
    })
    let gun;
    rest.transformNodes.map((node) => {
      console.log(node.name)
      if (node.name === 'AK-47') {
        const meshArray = []
        console.log(node)
        node._children.map((child) => {
          console.log(child)
          meshArray.push(child)
        })
        gun = Mesh.MergeMeshes(meshArray)
      }
    })
    console.log(gun)
    gun.isVisible = true;

    gun.parent = camera;
    gun.renderingGroupId = 1;

    gun.rotation = new Vector3(0, Math.PI * 0.2, 0)

    const gunSizes = getMeshSize(gun)
    const normalizedSizes = {
      x: 0.4150769884504415 / gunSizes.x,
      y: 0.34742774382110664 / gunSizes.y,
      z: 0.3060210653126232 / gunSizes.z,
    }
    console.log(normalizedSizes)
    gun.position = new Vector3(0.05 * normalizedSizes.x, -0.02 * normalizedSizes.y, 0.2 * normalizedSizes.z);
    
    return gun;
}

function SetupCrosshair() {
    const tex = GUI.AdvancedDynamicTexture.CreateFullscreenUI('FullscreenUI');

    const leftRect = new GUI.Rectangle('leftRect');
    leftRect.width = '10px';
    leftRect.height = '2px';
    leftRect.color = 'Green';
    leftRect.background = 'Green';
    leftRect._moveToProjectedPosition(new Vector3(-8, 0, 0));
    tex.addControl(leftRect);

    const rightRect = new GUI.Rectangle('rightRect');
    rightRect.width = '10px';
    rightRect.height = '2px';
    rightRect.color = 'Green';
    rightRect.background = 'Green';
    rightRect._moveToProjectedPosition(new Vector3(8, 0, 0));
    tex.addControl(rightRect);

    const topRect = new GUI.Rectangle('topRect');
    topRect.width = '2px';
    topRect.height = '10px';
    topRect.color = 'Green';
    topRect.background = 'Green';
    topRect._moveToProjectedPosition(new Vector3(0, 8, 0));
    tex.addControl(topRect);

    const bottomRect = new GUI.Rectangle('bottomRect');
    bottomRect.width = '2px';
    bottomRect.height = '10px';
    bottomRect.color = 'Green';
    bottomRect.background = 'Green';
    bottomRect._moveToProjectedPosition(new Vector3(0, -8, 0));
    tex.addControl(bottomRect);

    return tex;
}

function getMeshSize(parent) {
    const sizes = parent.getHierarchyBoundingVectors()
    const size = {
      x: sizes.max.x - sizes.min.x,
      y: sizes.max.y - sizes.min.y,
      z: sizes.max.z - sizes.min.z
    }
    return size
}

async function LoadZombie(scene) {
    const zombies = ['zombie1.glb', 'zombie2.glb', 'zombie3.glb', 'zombie4.glb'];
    for (const zombie of zombies) {
        const { meshes, ...rest } = await SceneLoader.ImportMeshAsync('', 'models/zombies/', zombie, scene)
        console.log(zombie, meshes)
        console.log(zombie, rest)

        meshes.map((mesh) => {
        mesh.checkCollisions = true;
        })

        /* for (let i = 0; i < 20; i++) {
        const mob = meshes[0].clone(`${zombie}_${i}`);
        mob.checkCollisions = true;
        mob.position = new Vector3(Math.random() * 50 - 50, 0, Math.random() * 50 - 50);
        } */
    }
}

function Shot(scene, camera, gun) {
    let id;
    const volume = options.settings.sound ? options.settings.soundPerc / 100 : 0;
    const gunshot = new Sound("gunshot", "./sounds/ak_shot.mp3", scene, null, {
      volume: volume,
    });

    onmousedown = ((event) => {
      gunshot.setVolume(volume); // Or Engine.audioEngine.setGlobalVolume(volume); for global volume
      Engine.audioEngine.unlock();
      Engine.audioEngine.audioContext?.resume();
      // First shot
      CheckShot(scene, camera, gun);
      gunshot.play();

      // Second shot (and sequent ones) after 75ms
      id = setInterval(()=>{
        CheckShot(scene, camera, gun);
        gunshot.play();
        console.log("holding...")
      }, 75)
    })
    onmouseup = () => {
      clearInterval(id)
      console.log("released...")
    }
}

function CheckShot(scene, camera, gun) {
    const origin = camera.globalPosition.clone();
    const forward = camera.getDirection(Vector3.Forward());
    const animation = new Animations;
    animation.shotAnimation(scene, camera, gun)

    if (camera.rotation.x > -0.30) {
      camera.rotation.x -= 0.02
    }

    const ray = new Ray(origin, forward, 200);
    
    const hit = scene.pickWithRay(ray, (mesh) => {
      return mesh.name.match(/^zombie+|Object_+/) !== null;
    });
    if (hit && hit.pickedMesh) {
      console.log(hit.pickedMesh)
      // Get the parent mesh node
      let mesh = hit.pickedMesh;
      while (mesh.parent !== null) {
        mesh = mesh.parent;
      }
      CountZombies(scene)
      // Dispose the parent mesh
      mesh.dispose();
    }
}

function CountZombies(scene) {
    const meshes = scene.meshes;
    let count = -21;
    meshes.map((mesh) => {
      if (mesh.name.match(/^BlindHunter_Blind Hunter_0+/)) {
        count++;
      }
    })
    console.log(count)
    return count
}

function HandleControl(engine) {
    // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
    const pointerlockchange = function (evt) {
      const controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;
      console.log(evt)
      // If the user is already locked
      if (!controlEnabled) {
        evt.target.activeElement.width = window.innerWidth;
        evt.target.activeElement.height = window.innerHeight;
        engine.exitPointerlock();
        engine.exitFullscreen();
      } 
    };

    // Attach events to the document
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
}

const sceneBuilder = {
    createScene,
}

export default sceneBuilder;
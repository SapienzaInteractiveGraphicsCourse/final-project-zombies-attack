import {
    Scene,
    Engine,
    FreeCamera,
    Vector3,
    HemisphericLight,
    CubeTexture,
    Texture,
    SceneLoader,
    Color3,
    UniversalCamera,
    Camera,
    Mesh,
    StandardMaterial,
    Ray,
    MeshBuilder,
    PBRMaterial,
    Sound
} from '@babylonjs/core'
import '@babylonjs/loaders'
import * as GUI from '@babylonjs/gui'
import * as HUD from './HUD/HUD.json'
import Animations from './Animations'
  
export class Test {
  scene
  engine
  canvas
  width
  height
  camera
  gun
  
  constructor(canvas) {
    this.canvas = canvas
    this.width = canvas.width
    this.height = canvas.height
    this.engine = new Engine(canvas, true)
    this.scene = this.CreateScene()

    this.engine.displayLoadingUI();

    this.CreateHUD()
    this.CreateEnvironment()
    this.CreateController()
    this.LoadGun(this.camera)
    this.LoadZombie()
    this.Shot()

    this.engine.runRenderLoop(() => {
      this.scene.render()
    })
  }
  
  CreateScene() {
    const scene = new Scene(this.engine)
    this.CreateLights();
    scene.onPointerDown = (event) => {
      console.log(event)
      if (event.button === 0) {
        console.log(this.width)
        this.canvas.width = window.outerWidth;
        this.canvas.height = window.outerHeight;
        this.engine.enterPointerlock();
        this.engine.enterFullscreen();
      }
      if (event.button === 2) {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.engine.exitPointerlock();
        this.engine.exitFullscreen();
      }
    }

    this.HandleControl()

    const framesPerSecond = 60;
    const gravity = -9.81;
    scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);
    scene.collisionsEnabled = true;


    const envTex = CubeTexture.CreateFromPrefilteredData('./environment/sky.env', scene)
    scene.environmentTexture = envTex

    scene.createDefaultSkybox(envTex, true)

    return scene
  }

  async CreateEnvironment() {
    const ground = MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, this.scene)

    ground.material = this.CreateAsphalt()
    
    this.model = ground;

    ground.checkCollisions = true;

    this.engine.hideLoadingUI();
  }

  CreateLights() {
    const hemiLight = new HemisphericLight('hemiLight', new Vector3(0, 1, 0), this.scene)
  }

  CreateHUD() {
    console.log(HUD)
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    advancedTexture.parseSerializedObject(HUD, true)
  }

  CreateController() {
    const camera = new UniversalCamera("UniversalCamera", new Vector3(1, 1, 1), this.scene);
    camera.setTarget(Vector3.Zero());

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
    
    this.camera = camera
  }

  async LoadGun(camera) {
    this.SetupCrosshair()

    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/weapons/", "scene.glb", this.scene);
    console.log(meshes)

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

    this.gun = gun

    const gunSizes = this.getMeshSize(gun)
    const normalizedSizes = {
      x: 0.4150769884504415 / gunSizes.x,
      y: 0.34742774382110664 / gunSizes.y,
      z: 0.3060210653126232 / gunSizes.z,
    }
    console.log(normalizedSizes)
    gun.position = new Vector3(0.05 * normalizedSizes.x, -0.05 * normalizedSizes.y, 0.2 * normalizedSizes.z);
  }

  getMeshSize(parent) {
    const sizes = parent.getHierarchyBoundingVectors()
    const size = {
      x: sizes.max.x - sizes.min.x,
      y: sizes.max.y - sizes.min.y,
      z: sizes.max.z - sizes.min.z
    }
    return size
  }

  Shot() {
    let id;
    const gunshot = new Sound("gunshot", "sounds/ak_shot.mp3", this.scene);

    onmousedown = ((event) => {
      Engine.audioEngine.unlock();
      Engine.audioEngine.audioContext?.resume();
      // First shot
      this.CheckShot();
      gunshot.play();

      // Second shot (and sequent ones) after 75ms
      id = setInterval(()=>{
        this.CheckShot();
        gunshot.play();
        console.log("holding...")
      }, 75)
    })
    onmouseup = () => {
      clearInterval(id)
      console.log("released...")
    }
  }

  CheckShot() {
    const origin = this.camera.globalPosition.clone();
    const forward = this.camera.getDirection(Vector3.Forward());
    const animation = new Animations;
    animation.shotAnimation(this.scene, this.camera, this.gun)

    console.log(this.camera.rotation.x)
    if (this.camera.rotation.x > -0.30) {
      this.camera.rotation.x -= 0.02
    }

    const ray = new Ray(origin, forward, 200);
    
    const hit = this.scene.pickWithRay(ray, (mesh) => {
      return mesh.name.match(/^BlindHunter_Blind Hunter_0+/) !== null;
    });
    if (hit && hit.pickedMesh) {
      this.CountZombies()
      hit.pickedMesh.dispose();
    }
  }

  async LoadZombie() {
    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync('', './models/', 'zombie_bind_hunter.glb', this.scene)
    console.log(meshes)
    console.log(rest)

    meshes.map((mesh) => {
      mesh.checkCollisions = true;
    })

    for (let i = 0; i < 20; i++) {
      const mob = meshes[0].clone(`BlindHunter_Blind Hunter_0${i}`);
      mob.checkCollisions = true;
      mob.position = new Vector3(Math.random() * 50 - 50, 0, Math.random() * 50 - 50);
    } 
  }

  CreateAsphalt() {
    const pbr = new PBRMaterial('pbr', this.scene)
    pbr.albedoTexture = new Texture('./textures/asphalt/asphalt_diffuse.jpg', this.scene)

    pbr.bumpTexture = new Texture('./textures/asphalt/asphalt_normal.jpg', this.scene)
    pbr.invertNormalMapX = true
    pbr.invertNormalMapY = true

    pbr.useAmbientOcclusionFromMetallicTextureRed = true
    pbr.useRoughnessFromMetallicTextureGreen = true
    pbr.useMetallnessFromMetallicTextureBlue = true

    pbr.metallicTexture = new Texture('./textures/asphalt/asphalt_ao.jpg', this.scene)

    return pbr
  }

  CountZombies() {
    const meshes = this.scene.meshes;
    let count = -21;
    meshes.map((mesh) => {
      if (mesh.name.match(/^BlindHunter_Blind Hunter_0+/)) {
        count++;
      }
    })
    console.log(count)
    return count
  }

  SetupCrosshair() {
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

  HandleControl() {
    // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
    const pointerlockchange = function (evt) {
      const controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;
      console.log(evt)
      // If the user is already locked
      if (!controlEnabled) {
        evt.target.params.canvas.width = evt.target.params.width;
        evt.target.params.canvas.height = evt.target.params.height;
        evt.target.params.engine.exitPointerlock();
        evt.target.params.engine.exitFullscreen();
      } 
    };

    // Attach events to the document
    document.params = this;
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
  }
}
  
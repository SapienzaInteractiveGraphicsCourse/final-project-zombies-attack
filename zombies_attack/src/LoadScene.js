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
    Viewport
} from '@babylonjs/core'
import '@babylonjs/loaders'
import * as GUI from '@babylonjs/gui'
import * as HUD from './HUD/HUD.json'
  
export class LoadScene {
  scene
  engine
  canvas
  width
  height
  camera
  
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
    this.LoadCharacter(this.camera)

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

    const envTex = CubeTexture.CreateFromPrefilteredData('./environment/sky.env', scene)
    scene.environmentTexture = envTex

    scene.createDefaultSkybox(envTex, true)

    return scene
  }

  async CreateEnvironment() {
    const { meshes } = await SceneLoader.ImportMeshAsync('', './models/', 'map.glb', this.scene)
    
    this.model = meshes;

    this.engine.hideLoadingUI();
  }

  CreateLights() {
    const hemiLight = new HemisphericLight('hemiLight', new Vector3(0, 1, 0), this.scene)
  }

  CreateHUD() {
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    advancedTexture.parseSerializedObject(HUD, true)
  }

  CreateController() {
    const fpsCamera = new UniversalCamera("fpsCamera", new Vector3(1, 1, 1), this.scene);
    fpsCamera.setTarget(new Vector3(0, 80, 50));

    fpsCamera.attachControl(this.canvas, true); // Controled by mouse movement;
    fpsCamera.speed = 0.25

    // Camera for observation
    const tpsCamera = new UniversalCamera("tpsCamera", new Vector3(80, 80, 80), this.scene);
    tpsCamera.setTarget(new Vector3(0, 80, 0));

    // Two Viewports
    tpsCamera.viewport = new Viewport(0.7, 0, 0.3, 0.3);
    fpsCamera.viewport = new Viewport(0, 0, 1, 1);
    this.scene.activeCameras.push(fpsCamera);
    this.scene.activeCameras.push(tpsCamera);

    onkeydown = ((event) => {
      let isJumping = true;
      if (event.keyCode === 32) {
        fpsCamera.onCollide = function(collidedMesh) {
          if(collidedMesh.uniqueId && isJumping) {
              //set the new camera position
              fpsCamera.cameraDirection.y += 0.5
              isJumping = false;
              return true;
          }
      } 
      } 
    })

    fpsCamera.minZ = 0.05;
    fpsCamera.angularSensibility = 4000;

    fpsCamera.keysUp.push(87);
    fpsCamera.keysLeft.push(65);
    fpsCamera.keysDown.push(83);
    fpsCamera.keysRight.push(68);
    
    this.camera = fpsCamera
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

  async LoadCharacter() {  
    const { meshes, skeletons } = await SceneLoader.ImportMeshAsync("", "./models/omen/", "scene.gltf", this.scene);
    console.log(meshes)
    console.log(skeletons)
    const bones = skeletons[0].bones;
    let head;
    bones.map((bone, index) => {
      if (bone.name === 'Head_end_063') {
        console.log(index)
        head = bone;
      }
    })
    const character = meshes[1];
    character.parent = this.camera;

    character.rotation = new Vector3(-1.57, -1.6, 0.0);
    character.scaling = new Vector3(0.05, 0.05, 0.05);
    character.position = new Vector3(0, -10, 5);
  }
}
  
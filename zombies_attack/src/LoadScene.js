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
    StandardMaterial
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
    this.LoadGun(this.camera)

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
    const { meshes } = await SceneLoader.ImportMeshAsync('', './models/', 'map.glb', this.scene)
    
    this.model = meshes;

    meshes.map((mesh) => {
      mesh.checkCollisions = true;
    })

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
    camera.ellipsoidOffset = new Vector3(0, 2, 0)

    camera.minZ = 0.05;
    camera.angularSensibility = 4000;

    camera.keysUp.push(87);
    camera.keysLeft.push(65);
    camera.keysDown.push(83);
    camera.keysRight.push(68);
    
    this.camera = camera
  }

  async LoadGun(camera) {
    this.CreateGunSight(this.scene);
  
    var gunMat = new StandardMaterial("mater", this.scene);
    gunMat.diffuseTexture = new Texture("src/crate.png", this.scene);
    const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/ak47/", "scene.gltf", this.scene);
    var gun = meshes[0];

    gun.renderingGroupId = 1;
    gun.material = gunMat;
    gun.parent = camera;

    gun.scaling.x = 0.05;
    gun.scaling.y = 0.05;
    gun.scaling.z = -0.05;
    gun.position = new Vector3(0.035, -0.075, 0.075);
  }

  CreateGunSight(scene) {
      if (scene.activeCameras.length === 0) {
          scene.activeCameras.push(scene.activeCamera);
      }

      var secondCamera = new FreeCamera("GunSightCamera", new Vector3(0, 0, -50), scene);
      secondCamera.mode = Camera.ORTHOGRAPHIC_CAMERA;
      secondCamera.layerMask = 0x20000000;
      scene.activeCameras.push(secondCamera);

      var meshes = [];
      var h = 250;

      const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
      advancedTexture.parseSerializedObject(HUD, true)

      var y1 = Mesh.CreateBox("y", h * .05, scene);
      y1.scaling = new Vector3(0.2, 1, 1);
      y1.position = new Vector3(0, -10, 0);
      meshes.push(y1);

      var y2 = Mesh.CreateBox("y", h * .05, scene);
      y2.scaling = new Vector3(0.2, 1, 1);
      y2.position = new Vector3(0, 10, 0);
      meshes.push(y2);

      var x1 = Mesh.CreateBox("x", h * .05, scene);
      x1.scaling = new Vector3(1, 0.2, 1);
      x1.position = new Vector3(10, 0, 0);
      meshes.push(x1);

      var x2 = Mesh.CreateBox("x", h * .05, scene);
      x2.scaling = new Vector3(1, 0.2, 1);
      x2.position = new Vector3(-10, 0, 0);
      meshes.push(x2);

      var gunSight = Mesh.MergeMeshes(meshes);
      gunSight.name = "gunSight";
      gunSight.layerMask = 0x20000000;
      gunSight.freezeWorldMatrix();

      var mat = new StandardMaterial("emissive mat", scene);
      mat.checkReadyOnlyOnce = true;
      mat.emissiveColor = new Color3(0, 1, 0);

      gunSight.material = mat;
  }
}
  
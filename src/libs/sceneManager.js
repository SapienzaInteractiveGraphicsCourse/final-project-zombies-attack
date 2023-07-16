class SceneManager {
    constructor(canvas, engine) {
        this.canvas = canvas;
        this.engine = engine;
        this.activeScene = undefined;
        this.activeSceneBuilder = undefined;
    }

    gotoScene(sceneBuilder, loadingText = "Loading...") {
        if (this.activeScene) {
            this.activeScene.dispose();
            this.activeScene = undefined;
            this.activeSceneBuilder = undefined;
        }
        this.engine.loadingUIText = loadingText;
        this.engine.displayLoadingUI();
        sceneBuilder.createScene(this.canvas, this.engine).then((scene) => {
            this.activeScene = scene;
            this.activeSceneBuilder = sceneBuilder;
            scene.loadedPromise.then(() => {
                this.engine.hideLoadingUI();
            }).catch(()=>{
                console.warn("Something happened while loading")
                this.engine.hideLoadingUI();
            })
        })
    }

    render() {
        if (this.activeScene) {
            this.activeScene.render();
        }
    }

    reloadActiveScene() {
        this.gotoScene(this.activeSceneBuilder);
    }
}

var SceneManagerInstance;

function CreateSceneManagerInstance(canvas, engine) {
    if (SceneManagerInstance) {
        console.warn("A SceneManager already exists, it will be replaced!");
    }
    SceneManagerInstance = new SceneManager(canvas, engine);
    return SceneManagerInstance;
}

export { SceneManagerInstance, CreateSceneManagerInstance };
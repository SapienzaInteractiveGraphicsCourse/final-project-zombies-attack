class SceneManager {
    constructor(canvas, engine) {
        // HTML5 canvas
        this.canvas = canvas;
        // engine for rendering
        this.engine = engine;
        // active babylon scene, the one to render
        this.activeScene = undefined;
        // the object exported by the module for the active scene,
        // in particular it contains the instructions to reload it
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
                // make sure that even on an error the game doesn't get stuck on the loading screen forever
                console.log("Something happened while loading, the console should have reported the error on its own")
                this.engine.hideLoadingUI();
            })
        })
    }

    gotoSceneGame(tpDest, loadingText = "Loading...") {
        if (this.activeScene) {
            this.activeScene.dispose();
            this.activeScene = undefined;
            this.activeSceneBuilder = undefined;
        }
        this.engine.loadingUIText = loadingText;
        this.engine.displayLoadingUI();
        tpDest.sceneBuilder.createScene(this.canvas, this.engine, tpDest.position, tpDest.target, tpDest.gunshot).then((scene) => {
            this.activeScene = scene;
            this.activeSceneBuilder = tpDest.sceneBuilder;
            scene.loadedPromise.then(() => {
                this.engine.hideLoadingUI();
            }).catch(()=>{
                // make sure that even on an error the game doesn't get stuck on the loading screen forever
                console.log("Something happened while loading, the console should have reported the error on its own")
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
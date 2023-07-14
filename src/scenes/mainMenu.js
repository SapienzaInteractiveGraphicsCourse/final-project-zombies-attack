import {
    Scene,
    ArcRotateCamera,
    Vector3
} from "@babylonjs/core";
import { SceneManagerInstance } from "../libs/sceneManager";
import * as GUI from "@babylonjs/gui";
import difficultyMenuBuilder from "./difficultyMenu";
import mapsMenuBuilder from "./mapsMenu";
import settingsMenuBuilder from "./settingsMenu"
import { options } from "../options";
import map1Builder from "./maps/map1";
import map2Builder from "./maps/map2";
import map3Builder from "./maps/map3";

async function createScene(canvas, engine) {
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("...", 0, 0, 1, Vector3.Zero(), scene);

    const adt = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
    const bg = new GUI.Image("bg", "./images/menu-background.jpg");
    adt.addControl(bg);
    const _bgLoadedPromise = new Promise((resolve, reject)=>{
        bg.onImageLoadedObservable.add(()=>{
            resolve();
        })
        bg.domImage.onerror = () => {
            reject();
        }
        // safety in case the observable has somehow been notified before this Promise even started
        if (bg.isLoaded) {
            resolve();
        }
    });

    const ui = new GUI.StackPanel();
    adt.addControl(ui);

    const grid = new GUI.Grid();

    grid.addColumnDefinition(480,true);
    grid.addColumnDefinition(1);
    grid.addRowDefinition(160,true);
    grid.addRowDefinition(1);
    grid.paddingLeft = "5%";

    adt.addControl(grid);

    const titleGrid = new GUI.Grid();
    titleGrid.addColumnDefinition(1);
    titleGrid.addRowDefinition(1);
    titleGrid.addRowDefinition(40, true);

    const title = new GUI.TextBlock("title", "ZOMBIE'S ATTACK");
    title.color = "white";
    title.fontSize = "48px"
    title.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    title.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    titleGrid.addControl(title, 0, 0)

    const currPath = new GUI.TextBlock("title", "MAIN MENU");
    currPath.color = "white";
    currPath.fontSize = "18px";
    currPath.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    currPath.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    titleGrid.addControl(currPath, 1, 0)

    //Attaching the panel to the grid on row #0 and column #0 cell
    grid.addControl(titleGrid, 0, 0);

    const selectionGrid = new GUI.Grid();
    selectionGrid.addColumnDefinition(1);
    selectionGrid.addRowDefinition(1);
    selectionGrid.addRowDefinition(100, true);
    selectionGrid.addRowDefinition(100, true);
    selectionGrid.addRowDefinition(100, true);
    selectionGrid.addRowDefinition(100, true);
    selectionGrid.addRowDefinition(1);

    const playBtn = GUI.Button.CreateSimpleButton("playBtn", "PLAY");
    playBtn.height = "80%";
    playBtn.color = "white";
    playBtn.fontSize = "32px";
    playBtn.background = "grey";
    playBtn.thickness = 0;
    playBtn.cornerRadius = 2;
    playBtn.hoverCursor = "pointer";
    playBtn.onPointerClickObservable.add(function() {
        if (options.map === 1) {
            SceneManagerInstance.gotoSceneGame({
                sceneBuilder: map1Builder,
                position: new Vector3(28*6, 2, 12*6),
                target: new Vector3(10*6, 0, 12*6),
            });
        }
        else if (options.map === 2) {
            SceneManagerInstance.gotoSceneGame({
                sceneBuilder: map2Builder,
                position: new Vector3(28*6, 2, 12*6),
                target: new Vector3(10*6, 0, 12*6),
            });
        }
        else if (options.map === 3) {
            SceneManagerInstance.gotoSceneGame({
                sceneBuilder: map3Builder,
                position: new Vector3(28*6, 2, 12*6),
                target: new Vector3(10*6, 0, 12*6),
            });
        }
    });
    selectionGrid.addControl(playBtn, 1, 0);

    const difficultyBtn = GUI.Button.CreateSimpleButton("playBtn", "DIFFICULTY");
    difficultyBtn.height = "80%";
    difficultyBtn.color = "white";
    difficultyBtn.fontSize = "32px";
    difficultyBtn.background = "grey";
    difficultyBtn.thickness = 0;
    difficultyBtn.cornerRadius = 2;
    difficultyBtn.hoverCursor = "pointer";
    difficultyBtn.onPointerClickObservable.add(function() {
        SceneManagerInstance.gotoScene(difficultyMenuBuilder);
    });
    selectionGrid.addControl(difficultyBtn, 2, 0);

    const mapsBtn = GUI.Button.CreateSimpleButton("playBtn", "MAPS");
    mapsBtn.height = "80%";
    mapsBtn.color = "white";
    mapsBtn.fontSize = "32px";
    mapsBtn.background = "grey";
    mapsBtn.thickness = 0;
    mapsBtn.cornerRadius = 2;
    mapsBtn.hoverCursor = "pointer";
    mapsBtn.onPointerClickObservable.add(function() {
        SceneManagerInstance.gotoScene(mapsMenuBuilder);
    });
    selectionGrid.addControl(mapsBtn, 3, 0);

    const settingsBtn = GUI.Button.CreateSimpleButton("playBtn", "SETTINGS");
    settingsBtn.height = "80%";
    settingsBtn.color = "white";
    settingsBtn.fontSize = "32px";
    settingsBtn.background = "grey";
    settingsBtn.thickness = 0;
    settingsBtn.cornerRadius = 2;
    settingsBtn.hoverCursor = "pointer";
    settingsBtn.onPointerClickObservable.add(function() {
        
        SceneManagerInstance.gotoScene(settingsMenuBuilder);
    });
    selectionGrid.addControl(settingsBtn, 4, 0);

    //Attaching the panel to the grid on row #1 and column #0 cell
    grid.addControl(selectionGrid, 1, 0);

    // NEW ATTRIBUTE
    // A Promise that resolves when everything in the scene has been loaded properly,
    // meaning that the SceneManager is free to remove any loading screens it may have activated.
    scene.loadedPromise = Promise.all([
        _bgLoadedPromise,
    ]);

    return scene;
}

const sceneBuilder = {
    createScene,
}

export default sceneBuilder;
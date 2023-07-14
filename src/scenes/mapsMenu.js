import {
    Scene,
    ArcRotateCamera,
    Vector3
} from "@babylonjs/core";
import { SceneManagerInstance } from "../libs/sceneManager";
import * as GUI from "@babylonjs/gui";
import menuSceneBuilder from './mainMenu';
import { options } from "../options";

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
    currPath.alpha = 0.5;
    currPath.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    currPath.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    titleGrid.addControl(currPath, 1, 0)

    const arrowPath = new GUI.TextBlock("title", ">");
    arrowPath.color = "white";
    arrowPath.fontSize = "18px";
    arrowPath.paddingLeft = "120px";
    arrowPath.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    arrowPath.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    titleGrid.addControl(arrowPath, 1, 0)

    const mapsPath = new GUI.TextBlock("title", "MAPS");
    mapsPath.color = "white";
    mapsPath.fontSize = "18px";
    mapsPath.paddingLeft = "150px";
    mapsPath.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    mapsPath.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    titleGrid.addControl(mapsPath, 1, 0)

    //Attaching the panel to the grid on row #0 and column #0 cell
    grid.addControl(titleGrid, 0, 0);

    const selectionGrid = new GUI.Grid();
    selectionGrid.addColumnDefinition(1);
    selectionGrid.addRowDefinition(1);
    selectionGrid.addRowDefinition(100, true);
    selectionGrid.addRowDefinition(100, true);
    selectionGrid.addRowDefinition(100, true);
    selectionGrid.addRowDefinition(100, true);
    selectionGrid.addRowDefinition(100, true);
    selectionGrid.addRowDefinition(1);

    const map1Btn = GUI.Button.CreateSimpleButton("map1Btn", "MAP 1");
    map1Btn.height = "80%";
    map1Btn.color = "white";
    map1Btn.fontSize = "32px";
    map1Btn.background = "grey";
    map1Btn.thickness = 0;
    map1Btn.cornerRadius = 2;
    map1Btn.hoverCursor = "pointer";
    map1Btn.onPointerClickObservable.add(function() {
        options.map = 1;
    });
    selectionGrid.addControl(map1Btn, 1, 0);

    const map2Btn = GUI.Button.CreateSimpleButton("map2Btn", "MAP 2");
    map2Btn.height = "80%";
    map2Btn.color = "white";
    map2Btn.fontSize = "32px";
    map2Btn.background = "grey";
    map2Btn.thickness = 0;
    map2Btn.cornerRadius = 2;
    map2Btn.hoverCursor = "pointer";
    map2Btn.onPointerClickObservable.add(function() {
        options.map = 2;
    });
    selectionGrid.addControl(map2Btn, 2, 0);

    const map3Btn = GUI.Button.CreateSimpleButton("map3Btn", "MAP 3");
    map3Btn.height = "80%";
    map3Btn.color = "white";
    map3Btn.fontSize = "32px";
    map3Btn.background = "grey";
    map3Btn.thickness = 0;
    map3Btn.cornerRadius = 2;
    map3Btn.hoverCursor = "pointer";
    map3Btn.onPointerClickObservable.add(function() {
        options.map = 3;
    });
    selectionGrid.addControl(map3Btn, 3, 0);

    const backBtn = GUI.Button.CreateSimpleButton("backBtn", "BACK");
    backBtn.height = "80%";
    backBtn.color = "white";
    backBtn.fontSize = "32px";
    backBtn.background = "grey";
    backBtn.thickness = 0;
    backBtn.cornerRadius = 2;
    backBtn.hoverCursor = "pointer";
    backBtn.onPointerClickObservable.add(function() {
        SceneManagerInstance.gotoScene(menuSceneBuilder);
    });
    selectionGrid.addControl(backBtn, 5, 0);

    //Attaching the panel to the grid on row #1 and column #0 cell
    grid.addControl(selectionGrid, 1, 0);
    
    scene.loadedPromise = Promise.all([
        _bgLoadedPromise,
    ]);

    // update button colors based on option choice
    scene.onBeforeRenderObservable.add(() => {
        map1Btn.alpha = options.map === 1 ? 1.0 : 0.6;
        map2Btn.alpha = options.map === 2 ? 1.0 : 0.6;
        map3Btn.alpha = options.map === 3 ? 1.0 : 0.6;
    })

    return scene;
}

const sceneBuilder = {
    createScene,
}

export default sceneBuilder;
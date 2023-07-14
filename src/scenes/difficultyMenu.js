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

    const difficultyPath = new GUI.TextBlock("title", "DIFFICULTY");
    difficultyPath.color = "white";
    difficultyPath.fontSize = "18px";
    difficultyPath.paddingLeft = "150px";
    difficultyPath.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    difficultyPath.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    titleGrid.addControl(difficultyPath, 1, 0)

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

    const easyBtn = GUI.Button.CreateSimpleButton("easyBtn", "EASY");
    easyBtn.height = "80%";
    easyBtn.color = "white";
    easyBtn.fontSize = "32px";
    easyBtn.background = "grey";
    easyBtn.thickness = 0;
    easyBtn.cornerRadius = 2;
    easyBtn.hoverCursor = "pointer";
    easyBtn.onPointerClickObservable.add(function() {
        options.difficulty = 1;
    });
    selectionGrid.addControl(easyBtn, 1, 0);

    const mediumBtn = GUI.Button.CreateSimpleButton("mediumBtn", "MEDIUM");
    mediumBtn.height = "80%";
    mediumBtn.color = "white";
    mediumBtn.fontSize = "32px";
    mediumBtn.background = "grey";
    mediumBtn.thickness = 0;
    mediumBtn.cornerRadius = 2;
    mediumBtn.hoverCursor = "pointer";
    mediumBtn.onPointerClickObservable.add(function() {
        options.difficulty = 2;
    });
    selectionGrid.addControl(mediumBtn, 2, 0);

    const hardBtn = GUI.Button.CreateSimpleButton("hardBtn", "HARD");
    hardBtn.height = "80%";
    hardBtn.color = "white";
    hardBtn.fontSize = "32px";
    hardBtn.background = "grey";
    hardBtn.thickness = 0;
    hardBtn.cornerRadius = 2;
    hardBtn.hoverCursor = "pointer";
    hardBtn.onPointerClickObservable.add(function() {
        options.difficulty = 3;
    });
    selectionGrid.addControl(hardBtn, 3, 0);

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

    // NEW ATTRIBUTE
    // A Promise that resolves when everything in the scene has been loaded properly,
    // meaning that the SceneManager is free to remove any loading screens it may have activated.
    scene.loadedPromise = Promise.all([
        _bgLoadedPromise,
    ]);

    // update button colors based on option choice
    scene.onBeforeRenderObservable.add(() => {
        easyBtn.alpha = options.difficulty === 1 ? 1.0 : 0.6;
        mediumBtn.alpha = options.difficulty === 2 ? 1.0 : 0.6;
        hardBtn.alpha = options.difficulty === 3 ? 1.0 : 0.6;
    })

    return scene;
}

const sceneBuilder = {
    createScene,
}

export default sceneBuilder;
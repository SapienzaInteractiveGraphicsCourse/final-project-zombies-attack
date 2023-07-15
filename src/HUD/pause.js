import * as GUI from "@babylonjs/gui";
import { SceneManagerInstance } from "../libs/sceneManager";
import menuSceneBuilder from '../scenes/mainMenu';

function createHUD(sceneInfo, engine) {
    const adt = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, sceneInfo.scene);

    const ui = new GUI.StackPanel();
    adt.addControl(ui);

    // Create a grid for the whole game ui
    const grid = new GUI.Grid();
    grid.paddingBottom = "5%";
    grid.paddingLeft = "5%";
    grid.paddingRight = "5%";

    grid.addColumnDefinition(400,true);
    grid.addColumnDefinition(1);
    grid.addColumnDefinition(400,true);
    grid.addRowDefinition(1);

    // Add it to the adt
    adt.addControl(grid);

    // Create the grid on the center (the player's points)
    const selectionGrid = new GUI.Grid();
    selectionGrid.addColumnDefinition(1);
    selectionGrid.addRowDefinition(1);
    selectionGrid.addRowDefinition(80, true);
    selectionGrid.addRowDefinition(80, true);
    selectionGrid.addRowDefinition(1);

    const resumeGame = GUI.Button.CreateSimpleButton("resumeGameBtn", "RESUME");
    resumeGame.height = "80%";
    resumeGame.color = "white";
    resumeGame.fontSize = "32px";
    resumeGame.background = "grey";
    resumeGame.thickness = 0;
    resumeGame.cornerRadius = 2;
    resumeGame.hoverCursor = "pointer";
    resumeGame.onPointerClickObservable.add(function() {
        adt.dispose();
        const canvas = document.querySelector("canvas");
        canvas.width = window.outerWidth;
        canvas.height = window.outerHeight;
        engine.enterPointerlock();
        engine.enterFullscreen();
    });
    selectionGrid.addControl(resumeGame, 1, 0);

    const mainMenu = GUI.Button.CreateSimpleButton("mainMenuBtn", "MAIN MENU");
    mainMenu.height = "80%";
    mainMenu.color = "white";
    mainMenu.fontSize = "32px";
    mainMenu.background = "grey";
    mainMenu.thickness = 0;
    mainMenu.cornerRadius = 2;
    mainMenu.hoverCursor = "pointer";
    mainMenu.onPointerClickObservable.add(function() {
        SceneManagerInstance.gotoScene(menuSceneBuilder);
    });
    selectionGrid.addControl(mainMenu, 2, 0);

    grid.addControl(selectionGrid, 1, 1);

    return adt;
}

const pause = {
    createHUD,
}

export default pause;
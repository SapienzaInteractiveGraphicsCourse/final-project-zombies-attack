import * as GUI from "@babylonjs/gui";
import { SceneManagerInstance } from "../libs/sceneManager";
import menuSceneBuilder from '../scenes/mainMenu';

function createHUD(sceneInfo) {
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

    const points = new GUI.TextBlock("score", "You have scored 0 PTS!");
    points.color = "white";
    points.fontSize = "28px";
    points.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    points.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    selectionGrid.addControl(points, 1, 0);

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

    sceneInfo.scene.onBeforeRenderObservable.add(() => {
        points.text = `You have scored ${sceneInfo.player.pts} PTS!`;
    });

    return adt;
}

const defeat = {
    createHUD,
}

export default defeat;
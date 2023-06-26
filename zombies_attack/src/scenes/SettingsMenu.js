/**
 * File for the main menu of the game.
 */

import {
    Scene,
    ArcRotateCamera,
    Vector3,
    Color3
} from "@babylonjs/core";
import { SceneManagerInstance } from "./SceneManager";
import * as GUI from "@babylonjs/gui";
import menuSceneBuilder from './MainMenu';
import { options } from "../options";

async function createScene(canvas, engine) {
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("...", 0, 0, 1, Vector3.Zero(), scene);

    const adt = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
    const bg = new GUI.Image("bg", "./images/menu-background.jpg");
    adt.addControl(bg);

    const ui = new GUI.StackPanel();
    adt.addControl(ui);

    const grid = new GUI.Grid();

    grid.addColumnDefinition(480,true);
    grid.addColumnDefinition(1);
    grid.addRowDefinition(160,true);
    grid.addRowDefinition(100,true);
    grid.addRowDefinition(1);
    grid.addRowDefinition(100,true);
    grid.addRowDefinition(100,true);
    grid.addRowDefinition(86,true);
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

    const difficultyPath = new GUI.TextBlock("title", "SETTINGS");
    difficultyPath.color = "white";
    difficultyPath.fontSize = "18px";
    difficultyPath.paddingLeft = "150px";
    difficultyPath.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    difficultyPath.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    titleGrid.addControl(difficultyPath, 1, 0)

    //Attaching the panel to the grid on row #0 and column #0 cell
    grid.addControl(titleGrid, 0, 0);

    const panel = new GUI.StackPanel("panel");   
    panel.width = 1; 
    panel.height = 1.0;
    grid.addControl(panel, 2, 0);

    const sv = new GUI.ScrollViewer("sv");
    sv.width = "100%";
    sv.height = "287px";
    sv.thickness = 0;
    sv.barSize = 5;
    panel.addControl(sv)

    const svcontainer = new GUI.StackPanel("svcontainer");   
    sv.addControl(svcontainer);

    const panel1 = new GUI.StackPanel("panel1"); 
    panel1.width = 0.95;
    svcontainer.addControl(panel1);   

    const fullscreenBtn = GUI.Button.CreateSimpleButton("fullscreenBtn", "FULLSCREEN");
    fullscreenBtn.color = "white";
    fullscreenBtn.fontSize = "32px";
    fullscreenBtn.background = "grey";
    fullscreenBtn.thickness = 0;
    fullscreenBtn.cornerRadius = 2;
    fullscreenBtn.hoverCursor = "pointer";
    fullscreenBtn.height = "80px";
    fullscreenBtn.thickness = 0;
    fullscreenBtn.onPointerClickObservable.add(function() {
        options.settings.fullscreen = !options.settings.fullscreen;
    });
    panel1.addControl(fullscreenBtn);  

    const panel2 = new GUI.StackPanel("panel2"); 
    panel2.paddingTop = "20px";
    panel2.width = 0.95;
    svcontainer.addControl(panel2);   

    const mbBtn = GUI.Button.CreateSimpleButton("mbBtn", "MOTION BLUR");
    mbBtn.height = "80%";
    mbBtn.color = "white";
    mbBtn.fontSize = "32px";
    mbBtn.background = "grey";
    mbBtn.thickness = 0;
    mbBtn.cornerRadius = 2;
    mbBtn.hoverCursor = "pointer";
    mbBtn.height = "80px";
    mbBtn.thickness = 0;
    mbBtn.onPointerClickObservable.add(function() {
        options.settings.mb = !options.settings.mb;
    });
    panel2.addControl(mbBtn);  

    const panel3 = new GUI.StackPanel("panel2"); 
    panel3.paddingTop = "20px";
    panel3.width = 0.95;
    svcontainer.addControl(panel3);   

    const shadowsBtn = GUI.Button.CreateSimpleButton("shadowsBtn", "SHADOWS");
    shadowsBtn.height = "80%";
    shadowsBtn.color = "white";
    shadowsBtn.fontSize = "32px";
    shadowsBtn.background = "grey";
    shadowsBtn.thickness = 0;
    shadowsBtn.cornerRadius = 2;
    shadowsBtn.hoverCursor = "pointer";
    shadowsBtn.height = "80px";
    shadowsBtn.thickness = 0;
    shadowsBtn.onPointerClickObservable.add(function() {
        options.settings.shadows = !options.settings.shadows;
    });
    panel3.addControl(shadowsBtn);  

    const panel4 = new GUI.StackPanel("panel2"); 
    panel4.paddingTop = "20px";
    panel4.width = 0.95;
    svcontainer.addControl(panel4);   

    const soundBtn = GUI.Button.CreateSimpleButton("soundBtn", "SOUND");
    soundBtn.height = "80%";
    soundBtn.color = "white";
    soundBtn.fontSize = "32px";
    soundBtn.background = "grey";
    soundBtn.cornerRadius = 2;
    soundBtn.hoverCursor = "pointer";
    soundBtn.height = "80px";
    soundBtn.thickness = 0;
    soundBtn.onPointerClickObservable.add(function() {
        options.settings.sound = !options.settings.sound;
    });
    panel4.addControl(soundBtn);  

    const panel5 = new GUI.StackPanel("panel5"); 
    panel5.paddingTop = "20px";
    panel5.width = 0.95;
    svcontainer.addControl(panel5);   

    const soundHeader = new GUI.TextBlock();
    soundHeader.text = `Sound ${options.settings.soundPerc}%`;
    soundHeader.height = "40px";
    soundHeader.color = "white";
    soundHeader.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    soundHeader.paddingTop = "10px";
    panel5.addControl(soundHeader); 

    const soundSlider = new GUI.Slider("soundSlider");
    soundSlider.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    soundSlider.step = 1;
    soundSlider.minimum = 0;
    soundSlider.maximum = 100;
    soundSlider.color = "white";
    soundSlider.value = options.settings.soundPerc;
    soundSlider.height = "80%";
    soundSlider.cornerRadius = 200;
    soundSlider.hoverCursor = "pointer";
    soundSlider.height = "20px";
    soundSlider.background = "grey";
    soundSlider.onValueChangedObservable.add(function(value) {
        options.settings.soundPerc = value;
        soundHeader.text = `Sound ${value}%`;
    });
    panel5.addControl(soundSlider); 

    const panel6 = new GUI.StackPanel("panel26"); 
    panel6.paddingTop = "20px";
    panel6.width = 0.95;
    svcontainer.addControl(panel6);   

    const sensHeader = new GUI.TextBlock();
    sensHeader.text = `Sensibility ${options.settings.sensibility}`;
    sensHeader.height = "40px";
    sensHeader.color = "white";
    sensHeader.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    sensHeader.paddingTop = "10px";
    panel6.addControl(sensHeader); 

    const sensSlider = new GUI.Slider("sensSlider");
    sensSlider.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    sensSlider.step = 10;
    sensSlider.minimum = 100;
    sensSlider.maximum = 4000;
    sensSlider.color = "white";
    sensSlider.value = options.settings.sensibility;
    sensSlider.height = "80%";
    sensSlider.cornerRadius = 200;
    sensSlider.hoverCursor = "pointer";
    sensSlider.height = "20px";
    sensSlider.background = "grey";
    sensSlider.onValueChangedObservable.add(function(value) {
        options.settings.sensibility = value;
        sensHeader.text = `Sensibility ${value}`;
    });
    panel6.addControl(sensSlider); 

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
    grid.addControl(backBtn, 4, 0);

    // update button colors based on option choice
    scene.onBeforeRenderObservable.add(() => {
        fullscreenBtn.textBlock.text = options.settings.fullscreen ? "FULLSCREEN" : "WINDOWED";
        mbBtn.alpha = options.settings.mb ? 1.0 : 0.6;
        shadowsBtn.alpha = options.settings.shadows ? 1.0 : 0.6;
        soundBtn.alpha = options.settings.sound ? 1.0 : 0.6;
        soundSlider.value = options.settings.soundPerc
        sensSlider.value = options.settings.sensibility
    })

    return scene;
}

const sceneBuilder = {
    createScene,
}

export default sceneBuilder;
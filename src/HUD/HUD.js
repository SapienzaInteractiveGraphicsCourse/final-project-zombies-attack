import * as GUI from "@babylonjs/gui";
import { deg2rad } from "../libs/angles";

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

    // Create the grid on the left (the player's status)
    const hpGrid = new GUI.Grid();
    hpGrid.addColumnDefinition(1);
    hpGrid.addRowDefinition(1);
    hpGrid.addRowDefinition(30, true);
    hpGrid.addRowDefinition(30, true);

    const bar = new GUI.Rectangle("bar");
    bar.background = "white";
    bar.height = "10px";
    bar.width = "200px";
    bar.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    bar.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    hpGrid.addControl(bar, 1, 0)

    const hp = new GUI.TextBlock("hp", "100 HP");
    hp.color = "white";
    hp.fontSize = "18px";
    hp.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    hp.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    hpGrid.addControl(hp, 2, 0)

    grid.addControl(hpGrid, 1, 0);

    // Create the grid on the center (the player's points)
    const infoGrid = new GUI.Grid();
    infoGrid.addColumnDefinition(1);
    infoGrid.addRowDefinition(80, true);
    infoGrid.addRowDefinition(80, true);
    infoGrid.addRowDefinition(1);
    infoGrid.addRowDefinition(80, true);

    const currentRound = new GUI.TextBlock("round", "Round 1");
    currentRound.color = "white";
    currentRound.fontSize = "24px";
    currentRound.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    currentRound.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    infoGrid.addControl(currentRound, 0, 0)

    const points = new GUI.TextBlock("points", "0 PTS");
    points.color = "white";
    points.fontSize = "30px";
    points.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    points.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    infoGrid.addControl(points, 1, 0)

    const info = new GUI.TextBlock("info", "Press R to reload");
    info.color = "white";
    info.fontSize = "20px";
    info.alpha = 0;
    info.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    info.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    infoGrid.addControl(info, 3, 0)

    grid.addControl(infoGrid, 1, 1);

    // Create the grid on the right (the player's gun info)
    const gunGrid = new GUI.Grid();
    gunGrid.addColumnDefinition(1);
    gunGrid.addColumnDefinition(70, true);
    gunGrid.addRowDefinition(1);
    gunGrid.addRowDefinition(140, true);

    grid.addControl(gunGrid, 1, 2);

    const iconsGrid = new GUI.Grid();
    iconsGrid.addColumnDefinition(1);
    iconsGrid.addRowDefinition(1);
    iconsGrid.addRowDefinition(50, true);
    iconsGrid.addRowDefinition(40, true);

    const gunIcon = new GUI.Image("gun", "./images/ak47_icon.png");
    gunIcon.width = "200px";
    gunIcon.height = "120px";
    gunIcon.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    iconsGrid.addControl(gunIcon, 1, 0);
    const _gunLoadedPromise = new Promise((resolve, reject) => {
        gunIcon.onImageLoadedObservable.add(() => {
            resolve();
        })
        gunIcon.domImage.onerror = () => {
            reject();
        }
        // safety in case the observable has somehow been notified before this Promise even started
        if (gunIcon.isLoaded) {
            resolve();
        }
    })

    const ammoIcon = new GUI.Image("gun", "./images/ammo_icon.png");
    ammoIcon.alpha = 0.7;
    ammoIcon.width = "40px";
    ammoIcon.height = "30px";
    ammoIcon.rotation = deg2rad(90);
    ammoIcon.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    ammoIcon.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    iconsGrid.addControl(ammoIcon, 2, 0);

    gunGrid.addControl(iconsGrid, 1, 0);

    const _ammoLoadedPromise = new Promise((resolve, reject) => {
        ammoIcon.onImageLoadedObservable.add(() => {
            resolve();
        })
        ammoIcon.domImage.onerror = () => {
            reject();
        }
        // safety in case the observable has somehow been notified before this Promise even started
        if (ammoIcon.isLoaded) {
            resolve();
        }
    })

    const ammoGrid = new GUI.Grid();
    ammoGrid.addColumnDefinition(1);
    ammoGrid.addRowDefinition(1);
    ammoGrid.addRowDefinition(40, true);
    ammoGrid.addRowDefinition(40, true);

    const rounds = new GUI.TextBlock("rounds", "30");
    rounds.color = "white";
    rounds.fontSize = "30px";
    rounds.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    rounds.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    ammoGrid.addControl(rounds, 1, 0)

    const magazines = new GUI.TextBlock("magazines", "0");
    magazines.color = "white";
    magazines.alpha = 0.7;
    magazines.fontSize = "18px";
    magazines.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    magazines.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    ammoGrid.addControl(magazines, 2, 0)
    
    gunGrid.addControl(ammoGrid, 1, 1);

    // NEW ATTRIBUTE
    // A Promise that resolves when everything in the UI has been loaded properly,
    // meaning that the scene can consider it loaded.
    adt.loadedPromise = Promise.all([
        _gunLoadedPromise,
        _ammoLoadedPromise,
    ]);

    sceneInfo.scene.onBeforeRenderObservable.add(() => {
        //update HP and charge of the characters
        hp.text = `${Math.floor(sceneInfo.player.hp)} HP`;
        points.text = `${sceneInfo.player.pts} PTS`;
        currentRound.text = `Round ${sceneInfo.player.round}`;

        if (sceneInfo.player.ammo === 0 && !sceneInfo.ammoBox.isNear && sceneInfo.player.magazines !== 0) {
            info.text = "Press R to reload";
            info.alpha = 1;
        }
        else if (sceneInfo.player.ammo === 0 && sceneInfo.ammoBox.isNear && sceneInfo.player.magazines === 210) {
            info.text = "Press R to reload";
            info.alpha = 1;
        }
        else if (sceneInfo.player.ammo !== 0 && sceneInfo.ammoBox.isNear && sceneInfo.player.magazines < 210) {
            info.text = "Press F to pick up ammo";
            info.alpha = 1;
        }
        else if (sceneInfo.player.ammo === 0 && !sceneInfo.ammoBox.isNear && sceneInfo.player.magazines === 0) {
            info.text = "Find some ammo box";
            info.alpha = 1;
        }
        else if (sceneInfo.player.ammo === 0 && sceneInfo.ammoBox.isNear && sceneInfo.player.magazines === 0) {
            info.text = "Press F to pick up ammo";
            info.alpha = 1;
        }
        else if (sceneInfo.player.ammo === 0 && sceneInfo.ammoBox.isNear && sceneInfo.player.magazines < 210) {
            info.text = "Press R to reload\n Press F to pick up ammo";
            info.alpha = 1;
        }
        else {
            info.alpha = 0;
        }
        
        rounds.text = sceneInfo.player.ammo;
        magazines.text = sceneInfo.player.magazines;
        if (sceneInfo.player.hp > 0) {
            bar.width = `${sceneInfo.player.hp * 200 / 100}px`
        }
        else {
            bar.width = `0px`
        }
    });

    return adt;
}

const hud = {
    createHUD,
}

export default hud;
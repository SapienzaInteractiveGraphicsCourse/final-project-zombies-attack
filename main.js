import './style.css'
import { Engine } from '@babylonjs/core';
import menuSceneBuilder from './src/scenes/mainMenu';
import { SceneManagerInstance, CreateSceneManagerInstance } from './src/libs/sceneManager';

const canvas = document.getElementById('app');
const engine = new Engine(canvas, true);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (canvas) {
  CreateSceneManagerInstance(canvas, engine)

  SceneManagerInstance.gotoScene(menuSceneBuilder);
  // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function () {
    SceneManagerInstance.render();
  });
}
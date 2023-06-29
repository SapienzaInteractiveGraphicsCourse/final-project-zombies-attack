import * as GUI from '@babylonjs/gui';
import { Vector3 } from '@babylonjs/core';

export function setupCrosshair() {
    const tex = GUI.AdvancedDynamicTexture.CreateFullscreenUI('FullscreenUI');
  
    const leftRect = new GUI.Rectangle('leftRect');
    leftRect.width = '10px';
    leftRect.height = '2px';
    leftRect.color = 'Green';
    leftRect.background = 'Green';
    leftRect._moveToProjectedPosition(new Vector3(-8, 0, 0));
    tex.addControl(leftRect);
  
    const rightRect = new GUI.Rectangle('rightRect');
    rightRect.width = '10px';
    rightRect.height = '2px';
    rightRect.color = 'Green';
    rightRect.background = 'Green';
    rightRect._moveToProjectedPosition(new Vector3(8, 0, 0));
    tex.addControl(rightRect);
  
    const topRect = new GUI.Rectangle('topRect');
    topRect.width = '2px';
    topRect.height = '10px';
    topRect.color = 'Green';
    topRect.background = 'Green';
    topRect._moveToProjectedPosition(new Vector3(0, 8, 0));
    tex.addControl(topRect);
  
    const bottomRect = new GUI.Rectangle('bottomRect');
    bottomRect.width = '2px';
    bottomRect.height = '10px';
    bottomRect.color = 'Green';
    bottomRect.background = 'Green';
    bottomRect._moveToProjectedPosition(new Vector3(0, -8, 0));
    tex.addControl(bottomRect);
  
    return tex;
}
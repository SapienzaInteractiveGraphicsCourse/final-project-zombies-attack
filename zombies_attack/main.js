import './style.css'
import { LoadScene } from './src/LoadScene';
import { Test } from './src/Test';

const canvas = document.getElementById('app');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (canvas) {
  new Test(canvas)
}
import './style.css'
import { LoadScene } from './src/LoadScene';

const canvas = document.getElementById('app');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (canvas) {
  new LoadScene(canvas)
}
import Canvas from "../canvas";
import { Position } from "../art/interface";

let measurePlainCanvas: HTMLCanvasElement | null;

export const painter = {
  wipe: () =>
    Canvas.drawingContext.clearRect(
      0,
      0,
      Canvas.size.width,
      Canvas.size.height
    ),

  circle: (point: Position, { size = 10, color = "white" }) => {
    Canvas.drawingContext.beginPath();
    Canvas.drawingContext.arc(point.x, point.y, size, 0, Math.PI * 2);
    Canvas.drawingContext.fillStyle = color;
    Canvas.drawingContext.fill();
    Canvas.drawingContext.closePath();
  },

  line: (from: Position, to: Position, { color = "white", size = 12 }) => {
    Canvas.drawingContext.beginPath();
    Canvas.drawingContext.moveTo(from.x, from.y);
    Canvas.drawingContext.lineTo(to.x, to.y);
    Canvas.drawingContext.stroke();
    Canvas.drawingContext.strokeStyle = color;
    Canvas.drawingContext.lineWidth = size;
    Canvas.drawingContext.closePath();
  },

  letter: (letter: string, color: string, position: Position, size: number) => {
    Canvas.drawingContext.fillStyle = color;
    Canvas.drawingContext.font = `${size + 8}px Verdana`;
    Canvas.drawingContext.fillText(letter, position.x, position.y);
  },

  imageData: (bitmap: ImageBitmap) => {
    measurePlainCanvas ||= document.querySelector('#measure-plain');

    if (!measurePlainCanvas) { throw new Error('Could not find "measure-plain" cavnas'); }
    
    measurePlainCanvas.width = bitmap.width;
    measurePlainCanvas.height = bitmap.height;

    Canvas.drawingContext.drawImage(bitmap, 0, 0);

    const imageData = Canvas.drawingContext.getImageData(
        0,
        0,
        measurePlainCanvas.width,
        measurePlainCanvas.height
    );

    return imageData;
  }
};

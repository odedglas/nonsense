import Canvas from "../../canvas";
import { Position } from "../interface";

export let hue = 0;
export let allowInteraction = true;
export const mouse = {
  x: 0,
  y: 0,
};

export const setAllowInteraction = (interacting = true) =>
  (allowInteraction = interacting);

export const increaseHue = () => (hue += 0.5);

export const setMousePosition = ({ x, y }: Position) =>
  Object.assign(mouse, {
    x: x - Canvas.canvasPositionAdjustment.x,
    y: y - Canvas.canvasPositionAdjustment.y,
  });

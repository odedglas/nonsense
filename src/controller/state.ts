import Canvas from "../canvas";
import { Position } from "../art/interface";

export let allowInteraction = true;
export const mouse = {
  x: 0,
  y: 0,
};

export const setAllowInteraction = (interacting = true) =>
  (allowInteraction = interacting);

export const setMousePosition = ({ x, y }: Position) =>
  Object.assign(mouse, {
    x: x - Canvas.canvasPositionAdjustment.x,
    y: y - Canvas.canvasPositionAdjustment.y,
  });

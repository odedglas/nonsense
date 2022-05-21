export interface Position {
  x: number;
  y: number;
}

export interface ArtItem {
  title: string;
  boardClassName: string;
  init: (arg1: any) => void;
  destroy: () => void;
  draw: () => void;
  onMouseMove: (event: MouseEvent) => void;
  renderControls: () => JSX.Element | undefined;
}

export abstract class AbstractArt implements ArtItem {
  stopped = false;
  abstract title: string;
  abstract boardClassName: string;
  abstract draw: () => void;
  onMouseMove = () => {};
  init = (arg1: any) => {};
  destroy = () => {};
  renderControls = () => undefined;
}

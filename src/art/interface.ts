export interface Position {
  x: number;
  y: number;
}

export interface ArtItem {
  title: string;
  boardClassName: string;
  init: () => void;
  destroy: () => void;
  draw: () => void;
}

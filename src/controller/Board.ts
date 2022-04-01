import Canvas from "../canvas";
import { ArtItem } from "../art/interface";
import { setMousePosition, setAllowInteraction } from "./state";

class BoardController {
  activeArt?: ArtItem;
  idleTimer = 0;

  init() {
    Canvas.init();
  }

  start(art: ArtItem) {
    this.activeArt = art;

    art.init();

    art.draw();

    Canvas.toggleBoardClass(art.boardClassName);

    Canvas.canvas.addEventListener("mousemove", this.handleMouseMove);
  }

  stop() {
    Canvas.destroy();

    this.activeArt?.destroy();

    Canvas.toggleBoardClass(this.activeArt?.boardClassName || "");

    Canvas.canvas.removeEventListener("mousemove", this.handleMouseMove);
  }

  private handleMouseMove = (event: MouseEvent) => {
    setMousePosition(event);
    setAllowInteraction();
    this.idleTimer && clearTimeout(this.idleTimer);

    this.idleTimer = setTimeout(() => setAllowInteraction(false), 1500);
  };
}

export * from "./state";

export default new BoardController();

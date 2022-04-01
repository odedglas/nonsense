import Canvas from "../canvas";
import { ArtItem } from "../art/interface";

class BoardController {
  activeArt?: ArtItem;

  init() {
    Canvas.init();
  }

  start(art: ArtItem) {
    this.activeArt = art;

    art.init();

    art.draw();

    Canvas.toggleBoardClass(art.boardClassName);
  }

  stop() {
    Canvas.destroy();

    this.activeArt?.destroy();

    Canvas.toggleBoardClass(this.activeArt?.boardClassName || "");
  }
}

export default new BoardController();

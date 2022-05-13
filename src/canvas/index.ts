class Canvas {
  _canvas?: HTMLCanvasElement;

  get canvas() {
    if (!this._canvas) {
      throw new Error("Canvas was not initialized");
    }

    return this._canvas;
  }

  get size() {
    return { width: this.canvas.width, height: this.canvas.height };
  }

  init() {
    this._canvas = document.getElementById("board") as HTMLCanvasElement;

    window.addEventListener("resize", this.fitCanvas, false);

    this.fitCanvas();
  }

  toggleBoardClass(className= '', remove = false) {
    if (!className) {
      return;
    }

    const toggleMethod = remove ? 'remove': 'add';
    this.canvas.classList[toggleMethod](className);
  }

  get drawingContext() {
    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not find canvas drawing context");
    }

    return context;
  }

  get canvasPositionAdjustment() {
    return {
      x: this.canvas.offsetLeft,
      y: this.canvas.offsetTop,
    };
  }

  destroy() {
    window.removeEventListener("resize", this.fitCanvas, false);
  }

  fitCanvas = () => {
    const container = document.querySelector("main");
    if (!container) {
      throw new Error("Cannot find canvas main container");
    }

    this.canvas.width = container.clientWidth - 48;
    this.canvas.height = Math.max(container.clientHeight - 24, 500);
  };
}

export default new Canvas();

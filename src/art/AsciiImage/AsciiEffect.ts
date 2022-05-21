import { painter } from '../../painter';

/**
 * The cell class represents each acscii bit.
 */
class Cell {
    constructor(
        private x: number,
        private y: number,
        private rgb: string,
        private symbol: string,
        private size: number
    ) {}

    draw() {
        painter.letter(
            this.symbol,
            this.rgb,
            {
                x: this.x,
                y: this.y,
            },
            this.size
        );
    }
}

export class AsciiEffect {
    imageCells: Cell[] = [];

    constructor(private imageData: ImageData) {}

    rgbToSymbol(value: number) {
        if (value > 240) {
            return '!';
        } else if (value > 220) {
            return '@';
        } else if (value > 200) {
            return '$';
        } else if (value > 180) {
            return '#';
        } else if (value > 160) {
            return '%';
        } else if (value > 140) {
            return '^';
        } else if (value > 120) {
            return '&';
        } else if (value > 100) {
            return '*';
        } else if (value > 80) {
            return 'X';
        } else if (value > 60) {
            return 'Y';
        } else if (value > 40) {
            return 'Q';
        } else {
            return 'A';
        }
    }

    scanImage(cellSize: number) {
        const { height, width, data: imageData } = this.imageData;
        this.imageCells = [];

        for (let y = 0; y < height; y += cellSize) {
            for (let x = 0; x < width; x += cellSize) {
                const yPos = y * 4;
                const xPos = x * 4;

                // Each cell represented by 4 items (r, g, b, a)
                const cellStartPosition = width * yPos + xPos;

                // Min opacity which cell is considered as visible.
                const hasMinOpacity = imageData[cellStartPosition + 3] > 66;

                if (hasMinOpacity) {
                    const red = imageData[cellStartPosition];
                    const green = imageData[cellStartPosition + 1];
                    const blue = imageData[cellStartPosition + 2];

                    const totalRgb = red + green + blue;

                    const color = `rgb(${red}, ${green}, ${blue})`;
                    const symbol = this.rgbToSymbol(totalRgb / 3);

                    // Min visible none dim cell
                    if (totalRgb > 15) {
                        this.imageCells.push(new Cell(x, y, color, symbol, cellSize));
                    }
                }
            }
        }
    }

    apply(cellSize = 1) {
        
        this.scanImage(cellSize);

        painter.wipe();

        this.imageCells.forEach((cell) => cell.draw());
    }
}

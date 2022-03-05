import Canvas from '../../canvas';
import { painter } from '../../painter';
import { ArtItem, Position } from '../interface';
import { Particle } from './Particle';
import { increaseHue, setAllowInteraction, setMousePosition } from './state';

export class ParticleText implements ArtItem {
    stopped = false;
    title = 'Particle Text';
    boardClassName = 'particle-text';
    particles: Particle[] = [];
    idleTimer: number = 0;

    init(text = 'Heya') {
        this.stopped = false;
        Canvas.canvas.addEventListener('mousemove', this.handleMouseMove);

        const coordinates = ParticleText.generateTextCoordinates(text);
        coordinates.forEach((coordinate) => {
            this.addParticle(coordinate);
            increaseHue();
        });

        this.draw();
    }

    draw = () => {
        if (this.stopped) { return; }

        painter.wipe();

        this.particles.forEach((particle, index) => {
            particle.update();
            particle.draw();

            const rest = this.particles.slice(
                index + 1,
                this.particles.length - 1
            );

            particle.connect(rest);
        });

        requestAnimationFrame(this.draw);
    }

    destroy() {
        this.stopped = true;
        this.particles = [];
        this.idleTimer && clearTimeout(this.idleTimer);

        Canvas.canvas.removeEventListener('mousemove', this.handleMouseMove);
    }

    private handleMouseMove = (event: MouseEvent) => {
        setMousePosition(event);
        setAllowInteraction();
        this.idleTimer && clearTimeout(this.idleTimer);

        this.idleTimer = setTimeout(
            () => setAllowInteraction(false),
            1500
        );
    }

    private addParticle = (position: Position) => {
        const particle = new Particle(
            position.x,
            position.y
        );

        this.particles.push(particle);
    };

    private static generateTextCoordinates(text: string): Position[] {
        let coordinates: Position[] = [];
        const positionAdjustement = 20;
        const positionMultiplier = 10;
        const drawingArea = {
            width: 100,
            height: 100,
        };
        // Opacity is represented inside a clamped array, 255 is 1, so 128 marks ~50%
        const minPixelOpacity = 128;

        // Stylinng
        Canvas.drawingContext.fillStyle = 'white';
        Canvas.drawingContext.font = '24px Verdana';
        Canvas.drawingContext.fillText(text, 0, 30);

        // The Uint8ClampedArray
        const imageData = Canvas.drawingContext.getImageData(
            0,
            0,
            drawingArea.width,
            drawingArea.height
        );

        // Iterate over data grid, 100x100
        // Each pixel represented in rgba ( 4 items inside the array )
        const opacityRepresentationIndex = 3;

        for (
            let y = 0;
            y < drawingArea.height;
            y++
        ) {
            for (
                let x = 0;
                x < drawingArea.width;
                x++
            ) {
                const yOpacityIndex = y * 4;
                const xOpacityIndex = x * 4;
                // The current pixel opacity index representationn
                const opacityIndex =
                    drawingArea.height * yOpacityIndex +
                    xOpacityIndex +
                    opacityRepresentationIndex;

                // The current pixel opacity value
                const pixelOpacity = imageData.data[opacityIndex];

                // If not transparent, adds coordinate
                if (pixelOpacity > minPixelOpacity) {
                    coordinates.push({
                        x: x * positionMultiplier + positionAdjustement,
                        y: y * positionMultiplier + positionAdjustement,
                    });
                }
            }
        }
        return coordinates;
    }
}
import { mouse } from "../../controller/state";
import { painter } from "../../painter";
import { Position } from "../interface";
import { PARTCILE_MIN_SIZE, PARTICLE_MAX_SIZE, PARTICLE_SPEED } from "./constants";

const getParticleAxisSpeed = () =>
    Math.random() * (PARTICLE_SPEED * 2) - PARTICLE_SPEED;

export class Particle {
    size: number;
    private speedX: number;
    private speedY: number;
    private position: Position;
    private color: string;

    constructor(hue: number) {
        this.position = { x: mouse.x, y: mouse.y }; // Initial position by current mouse

        this.speedX = getParticleAxisSpeed(); // Random speed for each axis
        this.speedY = getParticleAxisSpeed();

        this.size = Math.random() * PARTICLE_MAX_SIZE + 1; // Random particle size

        const opacity = 50 + Math.random() * 50;
        this.color = `hsl(${hue}, ${opacity}%, 50%)`;
    }

    update() {
        const { x, y } = this.position;

        this.position = {
            x: x + this.speedX,
            y: y + this.speedY,
        };

        if (this.size > PARTCILE_MIN_SIZE) {
            this.size -= 0.2;
        }
    }

    connectByDistance(other: Particle) {
        const otherPosition = other.position;

        const dx = this.position.x - otherPosition.x;
        const dy = this.position.y - otherPosition.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 75) {
            painter.line(this.position, other.position, {
                color: this.color,
                size: 0.2,
            });
        }
    }

    draw() {
        painter.circle(this.position, { size: this.size, color: this.color });
    }
}

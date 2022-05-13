import { AbstractArt } from "../interface";
import { ART_TITLE } from "../constants";
import { painter } from "../../painter";
import { Particle } from './Particle';
import { PARTCILE_MIN_SIZE } from "./constants";

let hue = 0;

const increaseHue = () => (hue += 1);

export class MouseTracker extends AbstractArt {
    title = ART_TITLE.MOUSE_TRACKER;
    boardClassName = 'black-board'
    particles: Particle[] = [];

    draw = () => {
        if (this.stopped) {
            return;
        }

        painter.wipe();

        this.handleParticlesMovment();

        increaseHue();

        requestAnimationFrame(this.draw);
    };

    handleParticlesMovment() {
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            // Transition properties
            particle.update();

            // Draw current state
            particle.draw();

            // Removes particle once it's reduced to it's min size
            if (particle.size < PARTCILE_MIN_SIZE) {
                this.particles.splice(i, 1);
                i--;
            } else {
                // Check for near by partcile lines
                const otherParticles = this.particles.slice(i, this.particles.length - 1);

                otherParticles.forEach((otherParticle) => {
                    particle.connectByDistance(otherParticle);
                });
            }
        }
    }

    onMouseMove = () => {
        this.particles.push(
            new Particle(hue)
        );
    };
}
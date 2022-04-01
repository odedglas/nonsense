import { allowInteraction, mouse } from "../../controller/Board";
import { Position } from "../interface";
import { INTERACTION_RADIUS } from "./constants";
import { painter } from "../../painter";

let hue = 0;

export const increaseHue = () => (hue += 0.5);

export class Particle {
  private readonly position: Position;
  private readonly basePosition: Position;
  private readonly density: number;
  private readonly baseHue: number;
  private interacting = false;
  private size = 3;
  private color?: string;

  constructor(private x: number, private y: number) {
    this.position = { x, y };
    this.basePosition = { x, y };
    this.density = Math.random() * 15 + 1;
    this.baseHue = hue;
  }

  update() {
    const { x, y } = this.position;

    const dx = x - mouse.x;
    const dy = y - mouse.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    // movement towards mouse point
    const movementX = dx / distance;
    const movementY = dy / distance;

    // Gravitation around mouse point further they are, faster they are pulled
    const gravitation = (INTERACTION_RADIUS - distance) / INTERACTION_RADIUS;

    // The movement multiplier to add to a given particle once in interaction range.
    const movementMultiplier = this.density * gravitation;

    if (distance < INTERACTION_RADIUS && allowInteraction) {
      this.position.x += movementX * movementMultiplier;
      this.position.y += movementY * movementMultiplier;
      this.interacting = true;
    } else {
      // Opposite movement towards base point
      this.moveToBasePosition();
      this.interacting = false;
    }

    const relativeOpacityRatio = INTERACTION_RADIUS / distance;
    const opacity = 75 + Math.min(relativeOpacityRatio * 5, 25);
    //
    this.color = `hsl(${this.baseHue}, ${opacity}%, ${
      this.interacting ? 50 : 100
    }%)`;
  }

  moveToBasePosition() {
    const { x, y } = this.position;

    const dx = x - this.basePosition.x;
    const dy = y - this.basePosition.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) {
      return;
    }

    if (x != this.basePosition.x) {
      const movementX = Math.abs(dx) > 1 ? dx / 20 : dx;
      this.position.x -= movementX;
    }

    if (y != this.basePosition.y) {
      const movementY = Math.abs(dy) > 1 ? dy / 20 : dy;
      this.position.y -= movementY;
    }
  }

  draw() {
    painter.circle(this.position, {
      size: this.size,
      color: this.color,
    });
  }

  connect(other: Particle[]) {
    const connectDistance = 25;

    other.forEach((other: Particle) => {
      const otherPosition = other.position;

      const dx = this.position.x - otherPosition.x;
      const dy = this.position.y - otherPosition.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectDistance) {
        painter.line(this.position, other.position, {
          color: this.color,
          size: 0.4,
        });
      }
    });
  }
}

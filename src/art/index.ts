import { ArtItem } from "./interface";
import { ParticleText } from "./ParticleText";
import { MouseTracker } from "./MouseTracker";
import { AsciiImage } from "./AsciiImage";

export const arts: ArtItem[] = [
    new ParticleText(),
    new MouseTracker(),
    new AsciiImage(),
];

import React from 'react';
import Slider from '@mui/material/Slider';
import { painter } from '../../painter';
import { ART_TITLE } from "../constants";
import { AbstractArt } from "../interface";
import { AsciiEffect } from './AsciiEffect';

const fetchImageBitmap = async () => {
    const imageData = await fetch(
        'https://newsletter.gradle.com/images/gradle-400x400.png'
    );

    const blob = await imageData.blob();

    return await createImageBitmap(blob);
};

let effect: AsciiEffect | null;
const defaultCellResoulution = 5;

export class AsciiImage extends AbstractArt {
    title = ART_TITLE.ASCII_IMAGE;
    boardClassName = 'black-board';
    init = async() => {
        const bitmap = await fetchImageBitmap();

        const imageData = painter.imageData(bitmap);

        effect = new AsciiEffect(imageData);

        effect.apply(defaultCellResoulution);
    };

    destroy = () => {
        effect = null;
    };

    draw = () => {

    };

    drawAsciiImage = (event: Event) => {
        effect?.apply(event?.target?.value);
    }

    renderControls = () => {
        return (
            <>
                <Slider defaultValue={defaultCellResoulution}
                    max={20}
                    min={1}
                    marks={[
                        { value: 1, label: 'Original image' },
                        { value: 20, label: 'Pixelated' }
                    ]}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    onChange={this.drawAsciiImage}/>
            </>
        )
    }
}
import React from 'react';
import { ArtItem } from '../art/interface';

export const Controlls: React.FC<{ art: ArtItem }> = ({ art }) => {
    console.log('Render', art.renderControls)
    return (
        <div className="controls">
            {art.renderControls()}
        </div>
    );
}

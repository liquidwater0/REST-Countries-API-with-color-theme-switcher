import React from 'react';

export default function TextField({ icon = undefined, ...props }) {
    return (
        <div className="text-field shadow">
            { icon }
            <input type="text" { ...props } />
        </div>
    );
}
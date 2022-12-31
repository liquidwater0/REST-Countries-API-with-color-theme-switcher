import React from 'react';

export default function SelectOption({ label, ...props }) {
    return (
        <li 
            className='option' 
            label={label} 
            { ...props }
        >
            { label }
        </li>
    );
}
import React from 'react';

export default function SelectOption({ optionLabel, optionValue, ...props }) {
    return (
        <li 
            className='option' 
            option-label={optionLabel} 
            option-value={optionValue}
            { ...props }
        >
            { optionLabel }
        </li>
    );
}
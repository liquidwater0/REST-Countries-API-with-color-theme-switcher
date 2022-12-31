import React, { useState, useEffect, useRef } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';

export default function Select({ children, onOptionSelect }) {
    const selectOptions = useRef();
    const [selected, setSelected] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.addEventListener("click", ({ target }) => {
            if (target.classList.contains("selected-option")) return;
            setIsOpen(false);
        });
        selectOptions.current.addEventListener("click", handleClick);
        setSelected(selectOptions.current.children[0].getAttribute("label"));
    }, []);

    function handleClick({ target }) {
        if (!target.classList.contains("option")) return;
        
        const label = target.getAttribute("label");
        const value = target.getAttribute("value");

        setSelected(label);
        onOptionSelect && onOptionSelect(value);
    }

    return (
        <div 
            className='select' 
            data-state={isOpen ? "open" : "closed"}
        >
            <div 
                className='selected-option shadow'
                onClick={() => setIsOpen(prev => !prev)}
            >
                { selected }
                <div className="arrow"><KeyboardArrowDown/></div>
            </div>

            <ul className="options shadow" ref={selectOptions}>
                { children }
            </ul>
        </div>
    );
}
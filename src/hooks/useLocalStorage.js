import { useState, useEffect } from "react";

function getStorageValue(key, initialValue) {
    const storageItem = localStorage.getItem(key);
    if (storageItem === null) return initialValue;
    return JSON.parse(storageItem);
}

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => getStorageValue(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}
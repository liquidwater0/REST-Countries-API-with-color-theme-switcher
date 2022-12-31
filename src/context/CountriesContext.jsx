import React, { useState, useContext, useEffect } from "react";

const CountriesContext = React.createContext();

export function useCountries() {
    return useContext(CountriesContext);
}

export default function CountriesProvider({ children }) {
    const [countries, setCountries] = useState([]);
    const [renderedCountries, setRenderedCountries] = useState([]);

    const allRegions = [];
    countries.forEach(({ region }) => allRegions.push(region));
    const regions = [...new Set(allRegions)];

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then(data => data.json())
            .then(res => {
                setCountries(res);
                setRenderedCountries(res);
            });
    }, []);

    function getFilteredCountries(searchQuery, regionFilter) {
        const filtered = [...countries].filter(({ name, region }) => {
            const hasSearchQuery = name.common.toLowerCase().includes(searchQuery.toLowerCase());
            const hasRegionFilter = region.toLowerCase() === regionFilter;
            
            if (regionFilter === "") {
                return hasSearchQuery;
            } else {
                return hasSearchQuery && hasRegionFilter;
            }
        });

        setRenderedCountries(filtered);
    }

    function getCountryDetails(cca3String) {
        return [...countries].find(country => country.cca3 === cca3String);
    }

    return (
        <CountriesContext.Provider value={{ countries, renderedCountries, regions, getCountryDetails, getFilteredCountries }}>
            { children }
        </CountriesContext.Provider>
    );
}
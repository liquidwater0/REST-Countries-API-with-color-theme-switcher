import React, { useState, useEffect } from 'react';
import { useCountries } from '../context/CountriesContext';
import { Search } from '@mui/icons-material';
import CountryCard from '../components/CountryCard';
import TextField from '../components/TextField';
import Select from '../components/Select';
import SelectOption from '../components/SelectOption';

export default function Home() {
    const { renderedCountries, regions, getFilteredCountries } = useCountries();
    const [searchQuery, setSearchQuery] = useState("");
    const [regionFilter, setRegionFilter] = useState("");

    useEffect(() => {
        let timeout = setTimeout(() => {
            getFilteredCountries(searchQuery, regionFilter);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [searchQuery]);

    useEffect(() => {
        getFilteredCountries(searchQuery, regionFilter);
    }, [regionFilter]);

    return (
        <div className="home-page container">
            <form 
                onSubmit={(event) => event.preventDefault()} 
                className="filter-section"
            >
                <TextField 
                    placeholder="Search for a country..."
                    icon={ <Search/> }
                    value={searchQuery}
                    onChange={({ target }) => setSearchQuery(target.value)}
                />
                <Select onOptionSelect={value => setRegionFilter(value)}>
                    <SelectOption optionLabel="Filter by Region" optionValue=""/>
                    {
                        regions.map((region, index) => {
                            return (
                                <SelectOption
                                    key={`${region}-${index}`}
                                    optionLabel={region}
                                    optionValue={region.toLowerCase()}
                                />
                            );
                        })
                    }
                </Select>
            </form>
            
            <div className="country-grid">
                {
                    renderedCountries.map((country, index) => {
                        return (
                            <CountryCard
                                key={`${country.name.common}-${index}`}
                                country={country}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}
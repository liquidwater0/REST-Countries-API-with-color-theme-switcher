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
        getFilteredCountries(searchQuery, regionFilter);
    }, [searchQuery, regionFilter]);

    return (
        <div className="home-page container">
            <div className="filter-section">
                <TextField 
                    placeholder="Search for a country..."
                    icon={ <Search/> }
                    value={searchQuery}
                    onChange={({ target }) => setSearchQuery(target.value)}
                />
                <Select onOptionSelect={value => setRegionFilter(value)}>
                    <SelectOption label="Filter by Region" value=""/>
                    {
                        regions.map((region, index) => {
                            return (
                                <SelectOption
                                    key={`${region}-${index}`}
                                    label={region}
                                    value={region.toLowerCase()}
                                />
                            );
                        })
                    }
                </Select>
            </div>
            
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
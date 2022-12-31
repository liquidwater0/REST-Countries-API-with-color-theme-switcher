import React from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useCountries } from '../context/CountriesContext';
import { ArrowBack } from '@mui/icons-material';
import Button from "../components/Button";
import formatNumber from "../formatNumber";

export default function CountryDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getCountryDetails } = useCountries();
    const country = getCountryDetails(id);

    if (!country) return <Navigate to="/"/>;

    const {
        name,
        population,
        region,
        subregion,
        capital,
        tld,
        currencies,
        flags,
        languages,
        borders
    } = country;

    return (
        <div className='country-details container'>
            <div className="navigation-section">
                <Button onClick={() => navigate("/")}>
                    <ArrowBack/>
                    Back
                </Button>
            </div>

            <div className="country-details-grid">
                <div>
                    <div className="image-container">
                        <img src={flags.png} alt="country flag"/>
                    </div>
                </div>

                <div className='details-container'>
                    <h1 className='country-name'>{ name.common }</h1>

                    <ul>
                        <li>
                            <p><span className='fw-600'>Native Name:</span> { Object.values(name.nativeName)[0].common }</p>
                        </li>
                        <li>
                            <p><span className='fw-600'>Population:</span> { formatNumber(population) }</p>
                        </li>
                        <li>
                            <p><span className='fw-600'>Region:</span> { region }</p>
                        </li>
                        <li>
                            <p><span className='fw-600'>Sub Region:</span> { subregion }</p>
                        </li>
                        <li>
                            <p><span className='fw-600'>Capital:</span> { capital }</p>
                        </li>
                    </ul>

                    <ul>
                        <li>
                            <p><span className='fw-600'>Top Level Domain:</span> { tld[0] }</p>
                        </li>
                        <li>
                            <p>
                                <span className='fw-600'>Currencies: </span> 
                                {
                                    Object.values(currencies)
                                        .map(({ name }) => name)
                                        .join(", ")
                                }
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className='fw-600'>Languages: </span> 
                                { Object.values(languages).join(", ") }
                            </p>
                        </li>
                    </ul>

                    {
                        borders &&
                        <div className="bordered-countries-section">
                            <p><span className='fw-600'>Border Countries:</span></p>
                            <div className='country-buttons'>
                                {
                                    borders.map((cca3String, index) => {
                                        const borderCountry = getCountryDetails(cca3String);
                                        const { name, cca3 } = borderCountry;

                                        return (
                                            <Button 
                                                key={`${cca3String}-${index}`}
                                                onClick={() => navigate(`/country/${cca3}`)}
                                            >
                                                { name.common }
                                            </Button>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
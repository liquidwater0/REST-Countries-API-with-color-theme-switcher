import React from 'react';
import { useNavigate } from 'react-router-dom';
import formatNumber from '../formatNumber';

export default function CountryCard({ country }) {
    const navigate = useNavigate();
    const {
        name = "Name",
        population = 0,
        region = "Region",
        capital = "Capital",
        flags = "",
        cca3 = ""
    } = country;

    return (
        <div 
            className='card shadow'
            onClick={() => navigate(`/country/${cca3}`)}
        >
            <div className="image-container">
                <img src={flags.png} />
            </div>
            <div className="card-body">
                <div>
                    <p className='card-title'>{ name.common }</p>
                    <p><span className='fw-600'>Population:</span> { formatNumber(population) }</p>
                    <p><span className='fw-600'>Region:</span> { region }</p>
                    <p><span className='fw-600'>Capital:</span> { capital[0] }</p>
                </div>
            </div>
        </div>
    );
}
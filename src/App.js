import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import InfoBox from './components/infoBox';
import './App.css';

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState('Worldwide');

	const API_ENDPOINT = 'https://disease.sh/v3/covid-19/countries';

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch(API_ENDPOINT)
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));
					setCountries(countries);
				});
		};
		getCountriesData();
	});

	const onCountryChange = (e) => {
    e.preventDefault();
    const countryCode = e.target.value;
		setCountry(countryCode);
	};

	return (
		<div className='App'>
			<div className='App_header'>
				<h1>Covid 19 tracker</h1>

				<FormControl className='App_dropdown'>
					<Select variant='outlined' value={country} onChange={onCountryChange}>
						<MenuItem value='Worldwide'>Worldwide</MenuItem>
						{countries.map((country) => (
							<MenuItem value={country.value}>{country.name}</MenuItem>
						))}
					</Select>
				</FormControl>
      </div>
      
      <div className='App_stats'>
        <InfoBox title='CoronaVirus Cases' total={1000} cases={1}/>
        <InfoBox title='Recoveries'  total={1000} cases={1} />
        <InfoBox title= 'Deaths'  total={1000} cases={1} />
      </div>
      
		</div>
	);
}

export default App;

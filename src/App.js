import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import './App.css';

function App() {
	const [countries, setCountries] = useState([]);

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
	});

	return (
		<div className='App'>
			<div className='App_header'>
				<h1>Covid 19 tracker</h1>

				<FormControl className='App_dropdown'>
					<Select labelId='label' id='select' value='20'>
						<MenuItem value='10'>Ten</MenuItem>
						<MenuItem value='20'>Twenty</MenuItem>
					</Select>
				</FormControl>
			</div>
		</div>
	);
}

export default App;

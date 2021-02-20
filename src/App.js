import React, { useState, useEffect } from 'react';
import {
	FormControl,
	Select,
	MenuItem,
	Card,
	CardContent,
} from '@material-ui/core';
import InfoBox from './components/infoBox';
import Map from './components/Map';
import './App.css';

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState('Worldwide');
	const [countryInfo, setCountryInfo] = useState({});

	// const API_ENDPOINT = 'https://disease.sh/v3/covid-19/countries';

   useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);


	useEffect(() => {
		const getCountriesData = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
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

	const onCountryChange = async (e) => {
		e.preventDefault();
		const countryCode = e.target.value;
		setCountry(countryCode);

		const url =
			countryCode === 'Worldwide'
				? 'https://disease.sh/v3/covid-19/all'
				: `https://disease.sh/v3/covid-19/${countryCode}`;

		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCountry(countryCode);
				setCountryInfo(data);
			});
	};

	return (
		<div className='App'>
			<div className='App_left'>
				<div className='App_header'>
					<h1>Covid 19 tracker</h1>

					<FormControl className='App_dropdown'>
						<Select
							variant='outlined'
							value={country}
							onChange={onCountryChange}>
							<MenuItem value='Worldwide'>Worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>{country.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				<div className='App_stats'>
					<InfoBox title='CoronaVirus Cases' total={1000} cases={1} />
					<InfoBox title='Recoveries' total={1000} cases={1} />
					<InfoBox title='Deaths' total={1000} cases={1} />
				</div>

				<Map />
			</div>

			<Card className='App_right'>
				<CardContent>
					<h2>Table</h2>
					<h2>Graph</h2>
				</CardContent>
			</Card>
		</div>
	);
}

export default App;

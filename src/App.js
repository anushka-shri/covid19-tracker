import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Table from './components/Table';
import './App.css';
import {
	MenuItem,
	FormControl,
	Select,
	Card,
	CardContent,
} from '@material-ui/core';
import InfoBox from './components/infoBox';
import Line from './components/LineGraph'
import { sortData } from './components/Utils/utils';
import 'leaflet/dist/leaflet.css'

const App = () => {
	const [country, setInputCountry] = useState('worldwide');
	const [countryInfo, setCountryInfo] = useState({});
	const [countries, setCountries] = useState([]);
	const [tableData, setTabledata] = useState([]);

	useEffect(() => {
		fetch('https://disease.sh/v3/covid-19/all')
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);

	useEffect(() => {
		const getCountriesData = async () => {
			fetch('https://disease.sh/v3/covid-19/countries')
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));

					const sortedData = sortData(data);
					setCountries(countries);
					setTabledata(sortedData);
				});
		};

		getCountriesData();
	}, []);

	const onCountryChange = async (e) => {
		const countryCode = e.target.value;

		const url =
			countryCode === 'worldwide'
				? 'https://disease.sh/v3/covid-19/all'
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;
		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setInputCountry(countryCode);
				setCountryInfo(data);
			});
	};

	return (
		<div className='App'>
			<div className='App_left'>
				<div className='App_header'>
					<h1>COVID-19 Tracker</h1>
					<FormControl className='App_dropdown'>
						<Select
							variant='outlined'
							value={country}
							onChange={onCountryChange}>
							<MenuItem value='worldwide'>Worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>{country.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className='App_stats'>
					<InfoBox
						title='Coronavirus Cases'
						cases={countryInfo.todayCases}
						total={countryInfo.cases}
					/>
					<InfoBox
						title='Recovered'
						cases={countryInfo.todayRecovered}
						total={countryInfo.recovered}
					/>
					<InfoBox
						title='Deaths'
						cases={countryInfo.todayDeaths}
						total={countryInfo.deaths}
					/>
				</div>
				<Map />
			</div>

			<Card className='App_right'>
				<CardContent>
					<h2>Live Cases by country</h2>
					<Table countries={tableData} />
					<h2>Trends in past 3months</h2>
					<Line />
				</CardContent>
			</Card>
		</div>
	);
};

export default App;

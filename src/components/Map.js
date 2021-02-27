import React from 'react'
import './Css/Map.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function Map({center, zoom}) {
	return (
		<div className='Map'>
			<MapContainer center={center} zoom={zoom}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
			</MapContainer>
		</div>
	);
}

export default Map

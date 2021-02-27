import React from 'react';
import './Css/InfoBox.css'
import { Card, CardContent, Typography } from '@material-ui/core';

function infoBox({ title, total,active,isRed, cases, ...props }) {
	return (
		<Card className={`InfoBox && ${active && 'InfoBox--selected'} && ${isRed && 'infoBox--red'}`}
		onClick={props.onClick}>
			<CardContent>
				<Typography className='infoBox_title'>
					<h4 className='title'>{title}</h4>
					<h4>
                    {cases}
                </h4>
				</Typography>

                

                <Typography className='infoBox_total'>
					<h4 className='title'>Total:</h4>
					<h4>{total}</h4>
                </Typography>
			</CardContent>
		</Card>
	);
}

export default infoBox;

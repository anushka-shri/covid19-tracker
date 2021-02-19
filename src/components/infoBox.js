import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function infoBox({ title, total, cases }) {
	return (
		<Card>
			<CardContent>
				<Typography className='infoBox_title' color='textSecondary'>
					{title}
				</Typography>

                <h3 className='infoBox_cases'>
                    {cases}
                </h3>

                <Typography className='infoBox_total'>
                    total:{total}
                </Typography>
			</CardContent>
		</Card>
	);
}

export default infoBox;

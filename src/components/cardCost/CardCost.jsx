import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BigNumber from 'bignumber.js';

const useStyles = makeStyles({
	root: {
		minWidth: 225,
		width: 250,
		maxHeight: 225,
		marginRight: 'none',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

function CardCost(props) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					{props.name}
				</Typography>
				<Typography variant="h5" component="h4">
					{new BigNumber(props.price).toFormat()}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
}

CardCost.defaultProps = {
	price: 0,
};

export default CardCost;

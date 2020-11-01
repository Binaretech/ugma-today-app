import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import BigNumber from 'bignumber.js';
import { trans } from '../../trans/trans';

const useStyles = makeStyles({
	root: {
		minWidth: 225,
		width: 250,
		maxHeight: 225,
		marginRight: 'none',
	},
	title: {
		fontSize: 14,
	},
	modalCard: {
		width: 250,
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

function CardCost(props) {
	const classes = useStyles();
	const [openModal, setOpenModal] = useState(false);

	const modalBody = (
		<Fade in={openModal} style={{ outline: 0 }}>
			<Card className={classes.modalCard}>
				<CardContent>
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						{props.name}
					</Typography>
					<Typography variant="h5" component="h4">
						{`${props.currencyName} ${new BigNumber(props.price).toFormat()}`}
					</Typography>
					<Typography>{props.comment}</Typography>
				</CardContent>
			</Card>
		</Fade>
	);

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
					{`${props.currencyName} ${new BigNumber(props.price).toFormat()}`}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" onClick={() => setOpenModal(true)}>
					{trans('Components.cardCost.detailsButton')}
				</Button>
			</CardActions>
			<Modal
				className={classes.modal}
				open={openModal}
				onClose={() => setOpenModal(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				{modalBody}
			</Modal>
		</Card>
	);
}

CardCost.defaultProps = {
	price: 0,
};

export default CardCost;

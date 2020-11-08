import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';

import drawerContent from './drawerContent';
import paths from '../../routes/paths';
import { ListItemLink } from '../listItemLink/ListItemLink';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { trans } from '../../trans/trans';
import { useSelector } from 'react-redux';
import { setLogout } from '../../redux/actions/sessionActions';
import { useDispatch } from 'react-redux';
import styles from './Scaffold.module.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	linksContainer: {
		display: 'flex',
		alignItems: 'center',
		paddingRight: '10px',
		minWidth: 190,
		justifyContent: 'space-between',
		'& button': {
			color: 'white',
			fontSize: '15px',
		},
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
		marginTop: '55px',
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

export default function Scaffold(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();
	const history = useHistory();
	const userId = useSelector((state) => state.sessionReducer?.id);
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	function logout() {
		dispatch(setLogout());
		history.push(paths.home);
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						{trans('Components.scaffold.title')}
					</Typography>
				</Toolbar>
				<div className={classes.linksContainer} id={styles.linksContainer}>
					{!userId ? (
						<>
							<Link
								component="button"
								onClick={() => history.push(paths.login)}
							>
								{trans('Components.scaffold.login')}
							</Link>
							<Link
								component="button"
								onClick={() => history.push(paths.register)}
							>
								{trans('Components.scaffold.register')}
							</Link>
						</>
					) : (
						<Link component="button" onClick={() => logout()}>
							{trans('Components.scaffold.logOut')}
						</Link>
					)}
				</div>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					{drawerContent(userId).map((list, index) => (
						<React.Fragment key={index}>
							{list.map((content) => (
								<ListItemLink key={content.title} to={content.to}>
									<ListItemIcon>
										<content.icon.type />
									</ListItemIcon>
									<ListItemText primary={content.title} />
								</ListItemLink>
							))}
							<Divider />
						</React.Fragment>
					))}
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				{props.children}
			</main>
		</div>
	);
}

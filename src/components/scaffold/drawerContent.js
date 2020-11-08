import { trans } from '../../trans/trans';
// import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import paths from '../../routes/paths';

export default (userId) => [
	[
		{
			title: trans('Components.drawer.home'),
			icon: HomeIcon,
			to: paths.home,
		},
		...(!userId ? hideAfterLogin : []),
		// {
		//     title: trans('Components.drawer.listPrices'),
		//     icon: MonetizationOnIcon,
		//     to: paths.costList
		// },
	],
];

const hideAfterLogin = [
	{
		title: trans('Components.scaffold.login'),
		icon: PersonIcon,
		to: paths.login,
	},
	{
		title: trans('Components.scaffold.register'),
		icon: PersonAddIcon,
		to: paths.register,
	},
];

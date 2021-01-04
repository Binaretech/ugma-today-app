import { trans } from '../../trans/trans';
import HomeIcon from '@material-ui/icons/Home';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import paths from '../../routes/paths';
import { useLogout } from '../../utils/customHooks';
export default (userId) => {
  const privateWithLogout = [
    ...privateOptions,
    {
      title: trans('Components.scaffold.logout'),
      to: paths.login,
      icon: ExitToAppIcon,
      action: useLogout(),
    },
  ];

  return [
    [
      {
        title: trans('Components.drawer.home'),
        icon: HomeIcon,
        to: paths.home,
      },
      {
        title: trans('Components.drawer.news'),
        icon: AnnouncementOutlinedIcon,
        to: paths.news,
      },
      ...(!userId ? hideAfterLoginOptions : privateWithLogout),
      // {
      //     title: trans('Components.drawer.listPrices'),
      //     icon: MonetizationOnIcon,
      //     to: paths.costList
      // },
    ],
  ];
};

const privateOptions = [];

const hideAfterLoginOptions = [
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

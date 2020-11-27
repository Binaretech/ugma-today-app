import { lazy } from "react";
import paths from "./paths";

const Login = lazy(() => import("../screens/login/Login"));
const NotFound = lazy(() => import("../screens/notFound/NotFound"));
const Home = lazy(() => import("../screens/home/Home"));
const Register = lazy(() => import("../screens/register/Register"));
const News = lazy(() => import("../screens/news"));

export default (id) => {
  return [
    ...publicRoutes,
    ...(!id ? hideAfterLogin : []),
    ...(id ? privateRoutes : []),
    {
      path: "*",
      component: NotFound,
    },
  ];
};

const publicRoutes = [
  {
    path: paths.home,
    exact: true,
    component: Home,
  },
  {
    path: paths.news,
    exact: true,
    component: News,
  },
];

const privateRoutes = [];

const hideAfterLogin = [
  {
    path: paths.login,
    exact: true,
    component: Login,
  },
  {
    path: paths.register,
    exact: true,
    component: Register,
  },
];

import { lazy } from "react";
import paths from "./paths";

const Login = lazy(() => import("../screens/login/Login"));
const NotFound = lazy(() => import("../screens/notFound/NotFound"));
const Home = lazy(() => import("../screens/home/Home"));
const Register = lazy(() => import("../screens/register/Register"));
const News = lazy(() => import("../screens/news"));
const NewsView = lazy(() => import("../screens/newsView"));

const routes = (id) => {
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

export default routes;

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
  {
    path: paths.newsDetails,
    exact: true,
    component: NewsView,
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

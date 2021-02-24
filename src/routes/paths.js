const path = {
  home: '/',
  login: '/login',
  createCost: '/create-cost',
  costList: '/cost-list',
  register: '/register',
  posts: '/posts',
  news: '/news',
  newsDetails: '/news/:id',
  profile: '/profile',
};

export default path;

export function formatPath(path, params = {}) {
  Object.keys(params).forEach((key) => {
    path = path.replace(`:${key}`, params[key]);
  });

  return path;
}

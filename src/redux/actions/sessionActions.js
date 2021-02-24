export const sessionActions = {
  LOGIN: 'LOGIN',
  LOADING_LOGIN: 'LOADING_LOGIN',
  ERROR_LOGIN: 'ERROR_LOGIN',
  REMOVE_SESSION: 'REMOVE_SESSION',
  LOGOUT: 'LOGOUT',
};

export function loading() {
  return {
    type: sessionActions.LOADING_LOGIN,
  };
}

export function error(error) {
  return {
    type: sessionActions.ERROR_LOGIN,
    payload: error,
  };
}

export function setLogin(payload) {
  localStorage.setItem('utd', JSON.stringify(payload || {}));
  return {
    type: sessionActions.LOGIN,
    payload,
  };
}

export function removeSession() {
  localStorage.removeItem('utd');
  return {
    type: sessionActions.REMOVE_SESSION,
  };
}

export function setUserData(payload) {
  let utd = JSON.parse(localStorage.getItem('utd'));
  localStorage.removeItem('utd');
  utd = { ...utd, ...payload.data };
  localStorage.setItem('utd', JSON.stringify(utd || {}));
  return {
    type: sessionActions.LOGIN,
    payload: payload.data,
  };
}

export function setLogout() {
  localStorage.removeItem('utd');
  return {
    type: sessionActions.LOGOUT,
  };
}

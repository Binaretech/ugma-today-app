import React, { useEffect } from 'react';
import Scaffold from '../scaffold/Scaffold';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/actions/sessionActions';
import { useHistory } from 'react-router-dom';
import paths from '../../routes/paths';
import { loadUserData } from '../../utils/functions';

function Root({ children }) {
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    const data = loadUserData();
    if (data) {
      dispatch(setLogin(data));
      return;
    }
    history.push(paths.home);
  }, [dispatch, history]);

  return <Scaffold>{children}</Scaffold>;
}

export default Root;

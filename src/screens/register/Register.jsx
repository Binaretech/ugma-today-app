import React, { useState } from 'react';
import Input from '../../components/input/Input';
import Button from '@material-ui/core/Button';
import Loader from '../../components/loader/Loader';

import apiEndpoints from '../../apiEndpoints';
import paths from '../../routes/paths';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/actions/sessionActions';
import { useHistory } from 'react-router-dom';
import { snackbarMessage } from '../../redux/actions/snackbarActions';
import { useXhr } from '../../utils/xhr/hook';
import { useDataManager } from '../../utils/customHooks';
import { trans } from '../../trans/trans';
import styles from './Register.module.css';

function Register() {
  const [loading, setLoading] = useState(false);
  const inputValues = {};
  const manager = useDataManager(inputValues);
  const dispatch = useDispatch();
  const history = useHistory();
  const [send] = useXhr({
    url: apiEndpoints.register,
    method: 'POST',
    showErrorSnackbar: true,
  });

  const passwordRulesMessages = [
    'minimunCharacters',
    'maximunCharacters',
    'incorrectPatron',
    'include',
  ];

  function onSubmit() {
    if (manager.hasErrors()) return;

    setLoading(true);
    send({
      body: { ...manager.getData() },
    })
      .then((res) => {
        setLoading(false);
        dispatch(setLogin(res.data));
        history.push(paths.home);
      })
      .catch((err) => {
        setLoading(false);
        dispatch(snackbarMessage(err.message));
        console.error(err);
      });
  }

  return (
    <div className={styles.container}>
      {(loading && <Loader fullscreen />) || (
        <form className={styles.form}>
          <Input
            label={trans('words.name')}
            name="name"
            variant="outlined"
            value={inputValues.name}
            rules={['required', 'min:3']}
            setValue={manager.setValue}
            setError={manager.setError}
          />
          <Input
            label={trans('words.lastname')}
            name="lastname"
            variant="outlined"
            value={inputValues.lastname}
            rules={['required', 'min:3']}
            setValue={manager.setValue}
            setError={manager.setError}
          />
          <Input
            label={trans('words.user')}
            name="username"
            variant="outlined"
            value={inputValues.username}
            rules={['required']}
            setValue={manager.setValue}
            setError={manager.setError}
          />
          <Input
            label={trans('words.email')}
            name="email"
            variant="outlined"
            value={inputValues.email}
            rules={['required', 'email']}
            setValue={manager.setValue}
            setError={manager.setError}
          />
          <Input
            label={trans('words.password')}
            name="password"
            type="password"
            variant="outlined"
            value={inputValues.password}
            rules={[
              'required',
              'min:6',
              'max:45',
              {
                message: trans('validation.notRegex'),
                validation: (value) => validateSecuenceInPassword(value),
              },
            ]}
            setValue={manager.setValue}
            setError={manager.setError}
          />
          <div className={styles.passwordRules}>
            {passwordRulesMessages.map((message) => (
              <p key={message}>{trans(`Screens.Register.${message}`)}</p>
            ))}
          </div>
          <Input
            label={trans('words.confirmPassword')}
            name="password_confirmation"
            type="password"
            variant="outlined"
            value={inputValues.password}
            rules={[
              'required',
              {
                message: trans('Screens.Register.confirmPassword'),
                validation: (value) =>
                  confirmedPassword(value, manager.getData()?.password),
              },
            ]}
            setValue={manager.setValue}
            setError={manager.setError}
          />
          <Button variant="contained" onClick={onSubmit}>
            {trans('Screens.Register.registerButton')}
          </Button>
        </form>
      )}
    </div>
  );
}

export default Register;

function confirmedPassword(value, valueToConfirm) {
  return value === valueToConfirm;
}

function validateSecuenceInPassword(value) {
  if (value === '123456' || value === 'abcdef') return false;
  return true;
}

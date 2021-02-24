import React, { useState } from 'react';
import Input from '../../components/input/Input';
import Button from '@material-ui/core/Button';
import Loader from '../../components/loader/Loader';

import apiEndpoints from '../../apiEndpoints';
import { snackbarMessage } from '../../redux/actions/snackbarActions';
import { useDataManager } from '../../utils/customHooks';
import { trans } from '../../trans/trans';
import { useDispatch, useSelector } from 'react-redux';
import { useXhr } from '../../utils/xhr/hook';
import styles from './Profile.module.css';
import {
  confirmedPassword,
  validateSecuenceInPassword,
} from '../../utils/validator/validatorRules';
import { setUserData } from '../../redux/actions/sessionActions';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const inputValues = {};
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.sessionReducer);
  const manager = useDataManager(inputValues);
  const [getUserData] = useXhr({
    url: `${apiEndpoints.user}/${userInfo.id}`,
    method: 'GET',
    showErrorSnackbar: true,
  });

  const [sendUpdateUserData] = useXhr({
    url: apiEndpoints.user,
    method: 'PUT',
    showErrorSnackbar: true,
  });

  const passwordRulesMessages = [
    'minimunCharacters',
    'maximunCharacters',
    'incorrectPatron',
    'include',
  ];

  const handleCatch = (err) => {
    setLoading(false);
    dispatch(snackbarMessage(err.message));
    console.error(err);
  };

  function onSubmit() {
    if (manager.hasErrors()) return;

    setLoading(true);
    sendUpdateUserData({
      body: { ...manager.getData() },
    })
      .then((_) => {
        manager.cleanData();

        getUserData()
          .then((res) => {
            setLoading(false);
            dispatch(setUserData(res));
          })
          .catch(handleCatch);
      })
      .catch(handleCatch);
  }

  return (
    <div>
      {(loading && <Loader fullscreen />) || (
        <form className={styles.form}>
          <Input
            label={trans('words.name')}
            name="name"
            variant="outlined"
            value={inputValues.name}
            rules={['min:3']}
            defaultValue={userInfo.profile?.name}
            setValue={manager.setValue}
            setError={manager.setError}
          />
          <Input
            label={trans('words.lastname')}
            name="lastname"
            variant="outlined"
            value={inputValues.lastname}
            rules={['min:3']}
            defaultValue={userInfo.profile?.lastname}
            setValue={manager.setValue}
            setError={manager.setError}
          />
          <Input
            label={trans('words.user')}
            name="username"
            variant="outlined"
            value={inputValues.username}
            defaultValue={userInfo.username}
            setValue={manager.setValue}
            setError={manager.setError}
          />
          <Input
            label={trans('words.email')}
            name="email"
            variant="outlined"
            value={inputValues.email}
            rules={['email']}
            defaultValue={userInfo.profile?.email}
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
              'nullable',
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
              'nullable',
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
            {trans('Screens.Profile.updateButton')}
          </Button>
        </form>
      )}
    </div>
  );
}

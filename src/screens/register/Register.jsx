import React, { useState } from 'react';
import Input from '../../components/input/Input';
import Button from '@material-ui/core/Button';
import Loader from '../../components/loader/Loader';

import apiEndpoints from '../../apiEndpoints';
import { snackbarMessage } from '../../redux/actions/snackbarActions';
import { useXhr } from '../../utils/xhr/hook';
import { useDataManager } from '../../utils/customHooks';
import { trans } from '../../trans/trans';
import styles from './Register.module.css';

function Register() {
	const [loading] = useState(false);
	const inputValues = {};
	const manager = useDataManager(inputValues);
	const [send] = useXhr({
		url: apiEndpoints.register,
		method: 'POST',
		showErrorSnackbar: true,
	});

	function onSubmit() {
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
						rules={['required']}
						setValue={manager.setValue}
						setError={manager.setError}
					/>
					<Input
						label={trans('words.confirmPassword')}
						name="password_confirmation"
						type="password"
						variant="outlined"
						value={inputValues.confirmPassword}
						rules={['required']}
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

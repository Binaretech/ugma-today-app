import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Register';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

describe('Register view Component', () => {
	const registerWithProvider = () => (
		<Provider store={store()}>
			<Register />
		</Provider>
	);

	const component = renderer.create(registerWithProvider());

	test('should snapshot renders', () => {
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('should render', () => {
		const div = document.createElement('div');
		ReactDOM.render(registerWithProvider(), div);
	});

	test('should render 6 inputs', () => {
		render(registerWithProvider());
		const elements = screen.getAllByText('', {
			selector: 'input',
		});

		expect(elements.length).toBe(6);
	});
});

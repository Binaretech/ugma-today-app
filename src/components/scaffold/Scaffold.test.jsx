import React from 'react';
import renderer from 'react-test-renderer';
import Scaffold from './Scaffold';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { render } from '../../utils/test-utils';
import { trans } from '../../trans/trans';
import { BrowserRouter as Router } from 'react-router-dom';

const ScaffoldWithProvider = () => (
	<Provider store={store()}>
		<Scaffold>
			<p>Test</p>
		</Scaffold>
	</Provider>
);

test('should renders Scaffold component', () => {
	const scaffold = renderer.create(
		<Router>
			<ScaffoldWithProvider />
		</Router>
	);

	expect(scaffold.toJSON()).toMatchSnapshot();
});

test('should find title in appbar', async () => {
	const { getByText } = render(
		<Router>
			<ScaffoldWithProvider />
		</Router>
	);

	expect(getByText(trans('Components.scaffold.title'))).toBeInTheDocument();
});

test('should find child', async () => {
	const { getByText } = render(
		<Router>
			<ScaffoldWithProvider />
		</Router>
	);

	expect(getByText('Test')).toBeInTheDocument();
});


import React from 'react';
import CostsList from './CostsList';
import { render } from '../../utils/test-utils';

test('should render CostsList component', () => {
	const element = render(<CostsList />);

	expect(element).toMatchSnapshot();
});

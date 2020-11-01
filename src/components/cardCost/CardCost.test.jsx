import React from 'react';
import { render } from '../../utils/test-utils';
import CardCost from './CardCost';

test('should render CardCost component', () => {
	const cost = {
		comment:
			"CURTSEYING as you're falling through the neighbouring pool--she could hear him sighing as if she had never before seen a.",
		currency: 1,
		currencyName: 'USD',
		id: 1,
		name: 'Odontología',
		price: '1.23',
	};

	const element = render(
		<CardCost
			id={cost?.id}
			name={cost?.name}
			price={cost?.price}
			comment={cost?.comment}
			currencyName={cost?.currencyName}
		/>
	);

	expect(element).toMatchSnapshot();
});

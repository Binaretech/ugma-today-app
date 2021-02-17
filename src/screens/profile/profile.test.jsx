import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './Profile';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

describe('Profile screen', () => {
  const ProfileWithProvider = () => (
    <Provider store={store()}>
      <Profile />
    </Provider>
  );

  const component = renderer.create(ProfileWithProvider());

  test('Should match profile screen snapshot', () => {
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Should render profile screen', () => {
    const div = document.createElement('div');

    ReactDOM.render(<ProfileWithProvider />, div);
  });

  test('Should render all the inputs in the view', () => {
    render(<ProfileWithProvider />);
    const elements = screen.getAllByText('', {
      selector: 'input',
    });

    expect(elements.length).toBe(6);
  });
});

import React from 'react';
import CommentBox from './commentBox';
import { render, fireEvent, act } from '@testing-library/react';

test('should render without crash', () => {
  render(<CommentBox />);
});

test('should update value and handle onClick event', async () => {
  const onClick = jest
    .fn()
    .mockReturnValueOnce(new Promise((resolve) => resolve()));

  const utils = render(<CommentBox onClick={onClick} />);
  const textarea = utils.getByLabelText('markdown-field');
  const button = utils.getByLabelText('submit-comment');
  fireEvent.change(textarea, { target: { value: '# Hello world' } });

  await act(async () => {
    fireEvent.click(button);
  });

  expect(onClick.mock.calls[0][0]).toBe('# Hello world');
});

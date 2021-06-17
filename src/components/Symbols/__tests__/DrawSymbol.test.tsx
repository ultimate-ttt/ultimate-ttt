import * as React from 'react';
import { render } from '../../../test-utils';
import { DrawSymbol } from '../DrawSymbol';

test('renders draw', () => {
  // This is a hack and should not be used in tests where we can queryByRole or other!
  const { container } = render(<DrawSymbol />);
  const draw = container.querySelector('svg');
  expect(draw).not.toBeNull();
  expect(draw!.classList.value).toMatch(/animatedraw/i);
});

test('renders draw animated', () => {
  // This is a hack and should not be used in tests where we can queryByRole or other!
  const { container } = render(<DrawSymbol shouldAnimate={true} />);
  const draw = container.querySelector('svg');
  expect(draw).not.toBeNull();
  expect(draw!.classList.value).toMatch(/animatedraw/i);
});

test('renders draw not animated', () => {
  // This is a hack and should not be used in tests where we can queryByRole or other!
  const { container } = render(<DrawSymbol shouldAnimate={false} />);
  const draw = container.querySelector('svg');
  expect(draw).not.toBeNull();
  expect(draw!.classList.value).not.toMatch(/animatedraw/i);
});

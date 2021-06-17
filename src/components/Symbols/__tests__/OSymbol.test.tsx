import * as React from 'react';
import { render } from '../../../test-utils';
import { OSymbol } from '../OSymbol';
import { XSymbol } from '../XSymbol';

test('renders o', () => {
  // This is a hack and should not be used in tests where we can queryByRole or other!
  const { container } = render(<OSymbol />);
  const o = container.querySelector('svg');
  expect(o).not.toBeNull();
  expect(o!.classList.value).toMatch(/animateo/i);
});

test('renders o animated', () => {
  // This is a hack and should not be used in tests where we can queryByRole or other!
  const { container } = render(<OSymbol shouldAnimate={true} />);
  const o = container.querySelector('svg');
  expect(o).not.toBeNull();
  expect(o!.classList.value).toMatch(/animateo/i);
});

test('renders o not animated', () => {
  // This is a hack and should not be used in tests where we can queryByRole or other!
  const { container } = render(<XSymbol shouldAnimate={false} />);
  const o = container.querySelector('svg');
  expect(o).not.toBeNull();
  expect(o!.classList.value).not.toMatch(/animateo/i);
});

import * as React from 'react';
import { render } from '../../../test-utils';
import { XSymbol } from '../XSymbol';

test('renders x', () => {
  // This is a hack and should not be used in tests where we can queryByRole or other!
  const { container } = render(<XSymbol />);
  const x = container.querySelector('svg');
  expect(x).not.toBeNull();
  expect(x!.classList.value).toMatch(/animatex/i);
});

test('renders x animated', () => {
  // This is a hack and should not be used in tests where we can queryByRole or other!
  const { container } = render(<XSymbol shouldAnimate={true} />);
  const x = container.querySelector('svg');
  expect(x).not.toBeNull();
  expect(x!.classList.value).toMatch(/animatex/i);
});

test('renders x not animated', () => {
  // This is a hack and should not be used in tests where we can queryByRole or other!
  const { container } = render(<XSymbol shouldAnimate={false} />);
  const x = container.querySelector('svg');
  expect(x).not.toBeNull();
  expect(x!.classList.value).not.toMatch(/animatex/i);
});

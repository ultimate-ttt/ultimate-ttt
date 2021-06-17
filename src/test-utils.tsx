// See: https://testing-library.com/docs/react-testing-library/setup#custom-render
import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { IconProvider } from './components/Icons';
import '@testing-library/jest-dom'; // https://github.com/testing-library/jest-dom/issues/282#issuecomment-660034778
import { MemoryRouter } from 'react-router-dom';

const AllTheProviders: FC = ({ children }) => {
  return (
    <IconProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </IconProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };

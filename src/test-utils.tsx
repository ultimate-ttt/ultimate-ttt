// See: https://testing-library.com/docs/react-testing-library/setup#custom-render
import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { IconProvider } from './components/Icons';
import '@testing-library/jest-dom'; // https://github.com/testing-library/jest-dom/issues/282#issuecomment-660034778
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { configureStore, rootReducer } from './state/configureStore';
import { AppState } from './state/AppState';

const AllTheProviders: FC = ({ children }) => {
  return (
    <IconProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </IconProvider>
  );
};

const StoreProviderCreator = (store: any): FC<{}> => {
  return ({ children }) => (
    <Provider store={store}>
      <AllTheProviders>{children}</AllTheProviders>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

const renderWithState = (
  ui: ReactElement,
  initialState?: Partial<AppState>,
  options?: Omit<RenderOptions, 'queries'>,
) => {
  const store = createStore(rootReducer, initialState);
  return render(ui, { wrapper: StoreProviderCreator(store), ...options });
};

const renderWithStore = (
  ui: ReactElement,
  initialState?: Partial<AppState>,
  options?: Omit<RenderOptions, 'queries'>,
) =>
  render(ui, { wrapper: StoreProviderCreator(configureStore()), ...options });

export * from '@testing-library/react';

export { customRender as render, renderWithState, renderWithStore };

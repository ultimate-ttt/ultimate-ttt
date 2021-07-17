import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { register } from './serviceWorker';
import { configureStore } from './state/configureStore';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { IconProvider } from './components/Icons';
import './styles';

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IconProvider>
        <App />
      </IconProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
register();

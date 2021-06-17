import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './components/App';
import { register } from './serviceWorker';
import { configureStore } from './state/configureStore';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { IconProvider } from './components/Icons';
import './index.css';

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IconProvider>
          <App />
        </IconProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);
register();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './state/configureStore';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import { RMWCProvider } from '@rmwc/provider';

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RMWCProvider
        icon={{
          strategy: 'className',
          basename: '',
          prefix: 'icon-',
        }}
      >
        <App />
      </RMWCProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import persistStore from 'redux-persist/es/persistStore';
import store from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const persistedStore = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
           <App />
        </PersistGate>
    </Provider>
    
  </React.StrictMode>
);
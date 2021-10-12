import React, { createContext } from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { Store } from './store/store';

interface IStore {
  store: Store;
}

const store = new Store();

export const ContextStore = createContext<IStore>({ store });

ReactDOM.render(
  <React.StrictMode>
    <ContextStore.Provider value={{ store }}>
      <App />
    </ContextStore.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

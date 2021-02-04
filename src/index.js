import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Apollo Cache Persist
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

// Local Storage Util
import { persistLocalCartStateToLS } from './graphql/local-storage.utils';

// Apollo Client
// -- Config components & functions
import { ApolloClient, ApolloProvider, gql } from '@apollo/client';
// -- Cache
import { cache } from './graphql/cache';

import './index.css'; // Must be imported before AppContainer
import { default as App } from './App/App.container';

// ----- Data Persistence -----
// --- Persist Local Cache ---
const persistApolloClientCache = async () =>
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });

persistApolloClientCache();

/**
 * --- Persist Reactive Vars to LS ---
 * Reactive vars are used to set the local state in the application
 * They're Apollo Client's equivalent of React's useState hook
 
 * LINK ./graphql/local-storage.utils.js:30
 */
persistLocalCartStateToLS();

// ----- ApolloClient Configuration -----
/**
 * --- Type Definitions ---
 * extend Item type to include quantity field
 */
const typeDefs = gql`
  extend type Item {
    quantity: Int
  }
`;

// --- Instantiate Apollo Client ---
const client = new ApolloClient({
  uri: 'https://crwn-clothing.com',
  cache,
  typeDefs,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

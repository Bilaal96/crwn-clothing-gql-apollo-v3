import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Apollo Cache Persist
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

// Apollo Client
// -- Config components & functions
import { ApolloClient, ApolloProvider, gql } from '@apollo/client';
// -- Cache
import { cache } from './graphql/cache';

import './index.css'; // Must be imported before AppContainer
import { default as App } from './App/App.container';

// ----- ApolloClient Configuration -----
// --- Persist Local Cache ---
const persistApolloClientCache = async () =>
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });

persistApolloClientCache();

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

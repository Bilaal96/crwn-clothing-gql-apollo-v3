import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// ! TBD - Replace with Apollo3 Cache Persist or manually set Local Storage
// import { persistCache } from 'apollo-cache-persist';

// Apollo Client
import { ApolloClient, ApolloProvider, gql } from '@apollo/client';

import { cache } from './graphql/cache';

import './index.css'; // Must be imported before AppContainer
import { default as App } from './App/App.container';

// ----- ApolloClient Configuration -----

// ! TBD - Replace with Apollo3 Cache Persist or manually set Local Storage
// Persist Local Cache
/* 
const persistApolloClientCache = async () =>
  await persistCache({ cache, storage: window.localStorage });

persistApolloClientCache(); 
*/

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

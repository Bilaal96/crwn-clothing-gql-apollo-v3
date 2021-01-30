import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Apollo Cache Persist
import { persistCache } from 'apollo-cache-persist';

// Apollo Client
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Apollo Cache
import { typeDefs, resolvers } from './graphql/resolvers';
import INITIAL_DATA from './graphql/initial-data';

import './index.css'; // Must be imported before AppContainer
import { default as App } from './App/App.container';

// ApolloClient Config
const httpLink = createHttpLink({ uri: 'https://crwn-clothing.com' });
const cache = new InMemoryCache();

// Persist Local Cache
const persistApolloClientCache = async () =>
  await persistCache({ cache, storage: window.localStorage });

persistApolloClientCache();

// Instantiate Apollo Client
const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});

// Set Initial Values for In-Memory Cache
cache.writeData({
  data: INITIAL_DATA,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

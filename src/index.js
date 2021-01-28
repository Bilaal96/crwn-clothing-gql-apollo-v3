import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { store, persistor } from './redux/store';
import { typeDefs, resolvers } from './graphql/resolvers';

import './index.css';
import App from './App';

// ApolloClient Config
const httpLink = createHttpLink({ uri: 'https://crwn-clothing.com' });
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});

// Set Initial Values for In-Memory Cache after instantiation of Client
client.writeData({
  data: {
    isCartHidden: true,
    cartItems: [],
    itemCount: 0,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

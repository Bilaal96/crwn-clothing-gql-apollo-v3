import React from 'react';
import { Query } from '@apollo/client/react/components';

import App from './App';

// GraphQL Operations
import { GET_CURRENT_USER } from '../graphql/queries';

const AppContainer = () => (
  <Query query={GET_CURRENT_USER}>
    {({ data }) => {
      const { currentUser } = data;

      return <App currentUser={currentUser} />;
    }}
  </Query>
);

export default AppContainer;

import React from 'react';
import { Query, Mutation } from 'react-apollo';

import App from './App';

// GraphQL Operations
import { GET_CURRENT_USER } from '../graphql/queries';
import { SET_CURRENT_USER } from '../graphql/mutations';

const AppContainer = () => (
  <Mutation mutation={SET_CURRENT_USER}>
    {(setCurrentUser) => (
      <Query query={GET_CURRENT_USER}>
        {({ data }) => {
          const { currentUser } = data;

          return (
            <App
              currentUser={currentUser}
              setCurrentUser={(user) => setCurrentUser({ variables: { user } })}
            />
          );
        }}
      </Query>
    )}
  </Mutation>
);

export default AppContainer;

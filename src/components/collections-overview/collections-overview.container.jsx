import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';

const GET_COLLECTIONS = gql`
  query {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionsOverviewContainer = () => {
  return (
    <Query query={GET_COLLECTIONS}>
      {({ data, loading, error }) => {
        if (loading) return <Spinner />;
        if (error) return <h2>Error: {error.message}</h2>;

        return (
          data &&
          data.collections && (
            <CollectionsOverview collections={data.collections} />
          )
        );
      }}
    </Query>
  );
};

export default CollectionsOverviewContainer;

import React from 'react';
import { Query } from '@apollo/client/react/components';

import CollectionPage from './collection.component';
import Spinner from '../../components/spinner/spinner.component';

// GraphQL Operations
import { GET_COLLECTION_BY_TITLE } from '../../apollo-client/queries';

const CollectionPageContainer = ({ match }) => {
  return (
    <Query
      query={GET_COLLECTION_BY_TITLE}
      variables={{ title: match.params.collectionId }}
    >
      {({ data, loading, error }) => {
        if (loading) return <Spinner />;
        if (error) return <h2>Error: {error.message}</h2>;

        return (
          data &&
          data.getCollectionsByTitle && (
            <CollectionPage collection={data.getCollectionsByTitle} />
          )
        );
      }}
    </Query>
  );
};

export default CollectionPageContainer;

import React from 'react';
import { useQuery } from '@apollo/client';

import CollectionPage from './collection.component';
import Spinner from '../../components/spinner/spinner.component';

// GraphQL Operations
import { GET_COLLECTION_BY_TITLE } from '../../apollo-client/queries';

const CollectionPageContainer = ({ match }) => {
  const { data, loading, error } = useQuery(GET_COLLECTION_BY_TITLE, {
    variables: {
      title: match.params.collectionId,
    },
  });

  if (loading) return <Spinner />;
  if (error) return <h2>Error: {error.message}</h2>;

  const { getCollectionsByTitle } = data;

  return <CollectionPage collection={getCollectionsByTitle} />;
};

export default CollectionPageContainer;

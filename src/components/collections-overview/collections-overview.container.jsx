import React from 'react';
import { useQuery } from '@apollo/client';

import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';

// GraphQL Operations
import { GET_COLLECTIONS } from '../../apollo-client/queries';

const CollectionsOverviewContainer = () => {
  const { loading, error, data } = useQuery(GET_COLLECTIONS);

  if (loading) return <Spinner />;
  if (error) return <h2>Error: {error.message}</h2>;

  const { collections } = data;

  return <CollectionsOverview collections={collections} />;
};

export default CollectionsOverviewContainer;

import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionPage from './collection.component';
import Spinner from '../../components/spinner/spinner.component';

const GET_COLLECTION_BY_TITLE = gql`
  query GetCollectionByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
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

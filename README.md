# CRWN Clothing App - Migration From Redux to Apollo Client v2

## Project Aims

The aims of this project were to:

- learn the benefits of using a GraphQL API over a REST API
- learn the differences between the paradigms / patterns GraphQL & REST APIs
- draw parallels between Redux & Apollo Client
- learn how to use GraphQL & Apollo
- migrate the local state-management in CRWN Clothing app's frontend from Redux To Apollo Client

## How Project Aims Were Achieved

### CRWN Clothing With React & Redux

The CRWN Clothing application is an online shop for clothes. I built the main version of the CRWN Clothing application with React & Redux.
_Links to this project are provided at the end of this README file._

Note from here on out:

- I will refer to the "main" project as **CRWN-Redux**
- I will refer to the project in this repo as **CRWN-Apollo**
- CRWN-Redux is the most up-to-date iteration of this app and now uses Redux Sagas.

### CRWN Clothing With GraphQL & Apollo

For this project (CRWN-Apollo), I started with an earlier version of CRWN-Redux; that precedes the Redux-Sagas implementation in CRWN-Redux.
This early version of CWRN-Clothing used core features of React & Redux. It had the following functionalities:

- User Authentication (Sign-in & Sign-out) with Google's Firebase
- Populate ShopPage with data fetched from Firestore
- Persistence of Redux Store
- Add items to Shopping Cart (including multiples instances of a single item)
- Track total no. of items in Shopping Cart
- At Checkout, calculate total price of items in Shopping Cart
- At Checkout, add, remove and clear items; doing so would dynamically update the total price of items in the Shopping Cart

After instantiating the Apollo Client in the CRWN-Apollo app, I began to migrate each of the features (listed above) from Redux to Apollo.
To help achieve this migration I followed various tutorials on GraphQL & Apollo and used the official GraphQL & Apollo Docs.

### Apollo Client v2 Concepts Explored

- Server-side Queries
- Using Apollo's cache for local state-management
- Directives & Client-side Schemas, Queries & Mutations
- Render-props with Query & Mutation components
- Creating Containers to handle interactions with Apollo Client's cache

### Data Persistence

In CRWN-Apollo, data persistence was achieved by using the [apollo-cache-persist](https://github.com/apollographql/apollo-cache-persist/tree/0.2.1) library to persist Apollo Client's local cache.

## Next Steps: Migrating from Apollo Client v2 to v3

Apollo Client 3 introduces some new concepts. Some of these concepts replace (now deprecated) features from Apollo Client 2; for example:

- Local Resolvers are now deprecated and the new Field Policies are favoured
- With React's focus shifting towards hooks, the useQuery & useMutation hooks are now favoured over the Query & Mutation components

Additionally, [apollo3-cache-persist](https://github.com/apollographql/apollo-cache-persist) was released for data persistence with Apollo Client 3 cache implementations.

As a result of this, the next step is to migrate the project in this repo from Apollo Client v2 to v3 and include Apollo React Hooks.
The GitHub Repo link for the Apollo Client 3 integration is: [crwn-clothing-gql-apollo-v3](https://github.com/Bilaal96/crwn-clothing-gql-apollo-v3)

## CRWN Clothing: React-Redux Project Links

Links to the CRWN-Redux application:

- live application hosted with Heroku: [CRWN Clothing Live Website](http://crown-clothing-live-app.herokuapp.com/)
- GitHub Repo: [crwn-clothing](https://github.com/Bilaal96/crwn-clothing)

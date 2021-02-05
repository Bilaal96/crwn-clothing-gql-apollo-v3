# CRWN Clothing App - Migration From Apollo Client 2 to Apollo Client 3

## Project Overview

This project is my solution for:

- a migration from Apollo Client 2 to Apollo Client 3 for the CRWN Clothing app; a fictional online clothing store.

### Related Projects

- To see the repo we're migrating from visit: [CRWN Clothing - React & Apollo Client 2](https://github.com/Bilaal96/crwn-clothing-gql-apollo-v2)
- For the main CRWN Clothing project that uses React & Redux-Sagas visit: [CRWN Clothing - React & Redux](https://github.com/Bilaal96/crwn-clothing)
- GraphQL Server for this application: [crwn-clothing-prisma](https://github.com/ZhangMYihua/crwn-clothing-prisma)

## A Quick Summary of Changes From Apollo Client 2 to 3

The main Apollo Client 3 changes of concern for our app are summarised in the table below.

<br/>
<table>
  <tbody>
    <!-- Headers -->
    <tr>
      <th></th>
      <th align="center">Apollo Client 2</th>
      <th align="center">Apollo Client 3</th>
    </tr>
    <!-- Row 1 -->
    <tr>
      <td><strong>Initialising Local State Values</strong></td>
      <td>
        client.writeData() method
      </td>
      <td>
        Choice between:
          <ul>
            <li>Reactive Variables</li>
            <li>Local Cache via client.writeQuery() method</li>
					</ul>	
      </td>
    </tr>
    <!-- Row 2 -->
    <tr>
      <td><strong>Mutating Local State</strong></td>
      <td>
        Local Resolvers
        <ul>
          <li>An object of resolver functions</li>
          <li>Resembles resolvers used on the GraphQL Server</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Reactive Vars → pass new value as argument</li>
          <br/>
          <li>In cache, define TypePolicy for Mutation type</li>
          <li>In TypePolicy define Local Fields</li>
          <li>For each Local Field, write a merge function that determines the new value of the Local Field</li>
        </ul>
      </td>
    </tr>
    <!-- Row 3 -->
    <tr>
      <td><strong>Executing Queries</strong></td>
      <td>
        Query component
        <ul>
          <li>Client-side queries are resolved by Local Resolvers</li>
        </ul>
      </td>
      <td>
        useQuery() Hook
        <ul>
          <li>Note: @client directive tells Apollo to Query the Local Fields </li>
        </ul>
      </td>
    </tr>
    <!-- Row 4 -->
    <tr>
      <td><strong>Executing Mutations</strong></td>
      <td>
        Mutation component
        <ul>
          <li>Client-side mutations are resolved by Local Resolvers</li>
        </ul>
      </td>
      <td>
        useMutation() Hook
        <ul>
          <li>Note: @client directive tells Apollo execute Mutations via the Local Fields </li>
        </ul>
        <br/>
        Alternatively, we can use:
        <ul>
          <li>Reactive Variables, which strongly resemble the useState() hook from React - in functionality </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Data Peristence Solutions

### Apollo 3 Cache Persist - For Cached Data On Clothing Collections

- The [CRWN Clothing - React & Apollo Client 2](https://github.com/Bilaal96/crwn-clothing-gql-apollo-v2) project used [apollo-cache-persist](https://github.com/apollographql/apollo-cache-persist/tree/0.2.1) to persist the application's state
- [apollo3-cache-persist](https://github.com/apollographql/apollo-cache-persist) was released for data persistence with Apollo Client 3 cache implementations

The collections data (i.e. categories for clothing items) is queried from the GraphQL Server and cached locally in Apollo Client's cache. Caching this data ensures that load times are reduced when users refresh or revisit the app; as data is pulled from the cache instead of executing queries for the same data again.

### Local Storage - For Persisting Shopping Cart-related State

With the migration to Apollo Client 3, the CRWN Clothing app uses Reactive Variables to handle local state-management. These variables are not cached by apollo and as a result any cart data would disappear on refresh/re-renders. To persist the data, we have to leverage Local Storage.

In this repo at filepath _/src/utils/local-storage.utils.js_, you can find a few helper functions that I created in order to persist the values of the necessary Reactive Variables.

# CRWN Clothing App - Migration From Redux to Apollo Client v2

---

## Project Aims

---

The aims of this project were to:

- learn the benefits of using a GraphQL API over a REST API
- learn the paradigm differences between GraphQL & REST APIs
- learn how to use GraphQL & Apollo
- draw parallels between Redux & Apollo Client
- migrate the Red

## How Project Goals Were Achieved

---

### CRWN Clothing With React & Redux

The CRWN Clothing application is an online shop for clothes. I built the main version of the CRWN Clothing application with React & Redux. _Links to this project are provided at the end of this README file._

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

## CRWN Clothing: React-Redux Project Links

---

Links to the CRWN-Redux application:

- live application hosted with Heroku: [CRWN Clothing Live Website](http://crown-clothing-live-app.herokuapp.com/)
- GitHub Repo: [crwn-clothing](https://github.com/Bilaal96/crwn-clothing)

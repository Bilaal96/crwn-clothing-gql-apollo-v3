import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Reactive Vars
import { currentUserVar } from '../graphql/cache';

// Components
import { default as Header } from '../components/header/header.container';

// Pages
import HomePage from '../pages/homepage/homepage.component';
import ShopPage from '../pages/shop/shop.component';
import SignInAndSignUpPage from '../pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { default as CheckoutPage } from '../pages/checkout/checkout.container';

import { auth, createUserProfileDocument } from '../firebase/firebase.utils';

import './App.css';
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          currentUserVar({
            id: snapShot.id,
            ...snapShot.data(),
          });
          console.log('Logged In', currentUserVar());
        });
      } else {
        // No user, set currentUser to null
        currentUserVar(userAuth);
        console.log('No User', currentUserVar());
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;

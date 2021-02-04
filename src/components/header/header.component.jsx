import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { default as CartIcon } from '../cart-icon/cart-icon.container';
import { default as CartDropdown } from '../cart-dropdown/cart-dropdown.container';

// Logo
import { ReactComponent as Logo } from '../../assets/crown.svg';

// Firebase Auth
import { auth } from '../../firebase/firebase.utils';

// Cart Utils
import { clearAllCartItems } from '../../graphql/cart.utils';
import { clearLocalCartStateFromLS } from '../../graphql/local-storage.utils';

import './header.styles.scss';

const Header = ({ currentUser, isCartHidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div
          className="option"
          onClick={() => {
            auth.signOut();
            clearAllCartItems();
            clearLocalCartStateFromLS();
          }}
        >
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {isCartHidden ? null : <CartDropdown />}
  </div>
);

export default Header;

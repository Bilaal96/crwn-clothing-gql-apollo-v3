// Reactive Vars
import {
  isCartHiddenVar,
  cartItemsVar,
  cartTotalVar,
  itemCountVar,
} from './cache';

// Utility Functions for updating Reactive Vars related to Cart
export const toggleCartHidden = () => {
  isCartHiddenVar(!isCartHiddenVar());
  console.log('CART TOGGLED');
};

export const calculateCartItemCount = (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
    0
  );

export const calculateCartTotal = (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  );

// Updates Apollo Cache Local Fields related to cartItems when cartItems is modified
const updateCartItemsLocalFields = (newCartItems) => {
  // Calculate new itemCount & cartTotal values
  const newItemCount = calculateCartItemCount(newCartItems);
  const newCartTotal = calculateCartTotal(newCartItems);

  // Update Reactive Variables with calculated values
  cartItemsVar(newCartItems);
  itemCountVar(newItemCount);
  cartTotalVar(newCartTotal);

  console.log('CART LOCAL FIELDS UPDATED');

  return newCartItems;
};

export const addItemToCart = (cartItemToAdd) => {
  // Get cartItems
  const cartItems = cartItemsVar();

  // Check if cartItemToAdd exists in cartItems
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  // Increase quantity if cartItemToAdd already exists in cartItems Array
  if (existingCartItem) {
    const newCartItems = cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );

    console.log('ADDED EXISTING ITEM TO CART');

    return updateCartItemsLocalFields(newCartItems);
  }

  // For non-existant items, add cartItemToAdd to cartItems array with quanity of 1
  const newCartItems = [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  console.log('ADDED NEW ITEM TO CART');

  return updateCartItemsLocalFields(newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const clearItemFromCart = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const clearCartItems = () => cartItemsVar([]);

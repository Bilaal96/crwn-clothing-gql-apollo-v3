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
const updateCartItemsLocalFields = (cartItems) => {
  // Calculate new itemCount & cartTotal values
  const newItemCount = calculateCartItemCount(cartItems);
  const newCartTotal = calculateCartTotal(cartItems);

  // Update Reactive Variables with calculated values
  cartItemsVar(cartItems);
  itemCountVar(newItemCount);
  cartTotalVar(newCartTotal);

  console.log('CART LOCAL FIELDS UPDATED');

  return cartItems;
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

export const removeItemFromCart = (cartItemToRemove) => {
  // Get cartItems
  const cartItems = cartItemsVar();

  // Check if cartItemToAdd exists in cartItems
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // If item quantity equals 1, clear the item from the cart
  if (existingCartItem.quantity === 1) {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== cartItemToRemove.id
    );

    console.log('REMOVE ITEM FROM CART, Q === 1');

    return updateCartItemsLocalFields(newCartItems);
  }

  // If item quanity > 1, subtract 1 from quantity
  const newCartItems = cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );

  console.log('REMOVE ITEM FROM CART, Q > 1');
  return updateCartItemsLocalFields(newCartItems);
};

// Clear single item from cart, regardless of quantity value
export const clearItemFromCart = (cartItemToClear) => {
  const cartItems = cartItemsVar();

  const newCartItems = cartItems.filter(
    (cartItem) => cartItem.id !== cartItemToClear.id
  );

  console.log('CLEAR ITEM FROM CART');

  return updateCartItemsLocalFields(newCartItems);
};

// Clears all cartItems
// TODO: RENAME : clearAllCartItems
// TODO: call updateCartItemsLocalFields() to update related local fields
export const clearCartItems = () => cartItemsVar([]);

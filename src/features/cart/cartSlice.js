import { createSlice, createDraftSafeSelector, createAsyncThunk } from "@reduxjs/toolkit";


const url = "https://www.course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 1,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then(res => res.json())
      .catch(err => console.log(err))
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems
        .filter((item) => itemId !== item.id)
    },
    updateQuantity: (state, {payload}) => {
      const itemId = payload.id;
      const item = state.cartItems.find(item => item.id === itemId);
      item ? 
          item.amount += payload.value : 
            null;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach(item => {
        amount += item.amount;
        total += item.amount * item.price;
      })
      state.amount = amount;
      state.total = total;
    }
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    }
  }
});

export const { clearCart, removeItem, updateQuantity, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
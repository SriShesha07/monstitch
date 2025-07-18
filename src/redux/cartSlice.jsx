import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...newItem, quantity: 1 });
      }
    },

    deleteFromCart: (state, action) => {
      const { id, size } = action.payload;
      return state.filter((item) => !(item.id === id && item.size === size));
    },

   incrementQuantity: (state, action) => {
  const { id, size } = action.payload;
  const item = state.find((item) => item.id === id && item.size === size);
  if (item) {
    item.quantity += 1;
  }
},
decrementQuantity: (state, action) => {
  const { id, size } = action.payload;
  const item = state.find((item) => item.id === id && item.size === size);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      return state.filter((item) => !(item.id === id && item.size === size));
    }
  }
},


    clearCart: (state) => {
      state.length = 0;
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

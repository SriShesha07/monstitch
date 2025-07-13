import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // ✅ use default import

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

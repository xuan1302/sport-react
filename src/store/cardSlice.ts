import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    // removeFromCart: (state, action) => {
    //   state.cartItems = state.cartItems.filter(
    //     (item) => item.id !== action.payload
    //   );
    //   localStorage.setItem("cart", JSON.stringify(state.cartItems)); // Cập nhật localStorage
    // },
    // clearCart: (state) => {
    //   state.cartItems = [];
    //   localStorage.removeItem("cart"); // Xóa localStorage
    // },
  },
});

export const { addToCart } = cardSlice.actions;
export default cardSlice.reducer;

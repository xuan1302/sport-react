import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) =>
          item.id === action.payload.id &&
          item.material == action.payload.material &&
          item.size == action.payload.size
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.cartItems.push({
          ...action.payload,
          totalPrice: action.payload.price * action.payload.quantity,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems)); // Lưu vào localStorage
    },
    removeFromCart: (state, action) => {
      const data = state.cartItems.filter(
        (item) =>
          item.id != action.payload.id ||
          item.material != action.payload.material ||
          item.size != action.payload.size
      );
      state.cartItems = data;
      localStorage.setItem("cart", JSON.stringify(data));
    },
    updateQuantity: (state, action) => {
      const { id, quantity, material, size } = action.payload;
      const item = state.cartItems.find(
        (item) =>
          item.id === id && item.material === material && item.size === size
      );

      if (item) {
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cardSlice.actions;
export default cardSlice.reducer;

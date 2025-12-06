import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const calculateTotals = (state) => {
  let totalAmount = 0;
  let totalItems = 0;
  
  state.items.forEach(item => {
    totalAmount += item.price * item.quantity;
    totalItems += item.quantity;
  });

  state.totalAmount = totalAmount;
  state.totalItems = totalItems;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
      
      calculateTotals(state);
    },

    removeItem: (state, action) => {
      const id = action.payload; 
      state.items = state.items.filter(item => item.id !== id);
      calculateTotals(state);
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.quantity = quantity;
        }
      }
      calculateTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      calculateTotals(state);
    },
  },
});

export const { addItem, updateQuantity, clearCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
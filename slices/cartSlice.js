// slices/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

// Función interna para calcular totales (así evitas repetir código)
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
    // Acción para agregar o incrementar la cantidad de un producto
    addItem: (state, action) => {
      // Espera un payload como: { product: { id, name, price, image }, quantity: 1 }
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
      
      calculateTotals(state);
    },

    // 🚀 NUEVA ACCIÓN: Elimina un ítem por completo usando su ID
    removeItem: (state, action) => {
      const id = action.payload; // Espera el ID del producto a eliminar
      state.items = state.items.filter(item => item.id !== id);
      calculateTotals(state);
    },
    
    // Acción para actualizar la cantidad (ideal para botones +/-)
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        if (quantity <= 0) {
          // Si la cantidad es 0 o menos, elimina el ítem
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.quantity = quantity;
        }
      }
      calculateTotals(state);
    },

    // Acción para vaciar todo el carrito
    clearCart: (state) => {
      state.items = [];
      calculateTotals(state);
    },
  },
});

// EXPORTACIÓN CORREGIDA: Incluye la nueva acción 'removeItem'
export const { addItem, updateQuantity, clearCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: { orders: [] },
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        id: state.orders.length, 
      };
      state.orders.push(newOrder);
    },

    updateStage: (state, action) => {
      const  id  = action.payload;
      const orderIndex = state.orders.findIndex((e) => e.id === id);
      if (orderIndex !== -1) {
        state.orders[orderIndex].stage += 1;
        state.orders[orderIndex].creationTime = new Date().toISOString();
      }
    },
    deleteOrder : (state, action)=>{
      const id = action.payload;
      const orderIndex = state.orders.findIndex((e) => e.id === id);
      if (orderIndex !== -1) {
        state.orders.splice(orderIndex , 1);
      }
    }
  },
});

export const { addOrder, updateStage, deleteOrder } = formSlice.actions;
export default formSlice.reducer;

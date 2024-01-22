// features/pizza/pizzaSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  completedOrders:[]
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const { type, size, base, id, stage, timestamp, timestamps } = action.payload;
      const newOrder = {
        id,
        type,
        size,
        base,
        stage,
        timestamp,
        timestamps,
      };

      if (state.orders.length < 10) {
        state.orders.push(newOrder)
      } else {
        console.log("Not taking any order for now");
      }
    },
    moveToNextStage: (state, action) => {
      const orderId = action.payload;
      const orderIndex = state.orders.findIndex(
        (order) => order.id === orderId
      );

      if (orderIndex !== -1 && state.orders[orderIndex].stage < 4) {
        state.orders[orderIndex].stage++;
      }
    },
    cancelOrder: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.filter((order) => order.id !== orderId);
    },
    updateOrderTime: (state) => {
      const currentTime = Date.now();
      state.orders.forEach((order) => {
        const timeElapsed = (currentTime - order.timestamp) / 1000; // in seconds
        order.timeInCurrentStage = timeElapsed;
      });
    },
    decreaseCount: (state,action) =>{
      state.completedOrders += (state.orders.filter(obj => obj.id === action.payload));
    },
    updateOrderTimestamps: (state, action) => {
      const {orderId, timestamp, stage} = action.payload
      state.orders.forEach((order) => {
       
        if(order.id === orderId){
          order.timestamps = [...order.timestamps, ({stage: stage, timestamp: timestamp})]
        }
      })
    },
    onCompleteOrder: (state, action) => {
      state.orders = state.orders.filter((order) => order.id !== action.payload.id)
      state.completedOrders = [...state.completedOrders, action.payload]
    }
  },
});

export const {
  placeOrder,
  moveToNextStage,
  cancelOrder,
  updateOrderTime,
  updateOrderTimestamps,
  decreaseCount,
  onCompleteOrder
} = pizzaSlice.actions;
export default pizzaSlice.reducer;

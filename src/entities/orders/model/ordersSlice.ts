
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrders } from "../api/ordersThunks";// шо по неймингу??? 

interface OrderState {
  orders: any[];  
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.orders  = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ordersSlice.reducer;

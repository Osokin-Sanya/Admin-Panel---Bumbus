import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from './types';
import { fetchOrderById } from '../api/thunkFetchOrderById';

interface OrderState {
  order: Order | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;

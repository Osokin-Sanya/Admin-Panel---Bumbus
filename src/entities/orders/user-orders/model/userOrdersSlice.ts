import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserOrders } from "../api/ordersThunks";

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

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userOrdersSlice.reducer


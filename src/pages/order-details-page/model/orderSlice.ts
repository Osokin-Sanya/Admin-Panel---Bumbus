import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../../entities/orders/model/types";
import { NumericStatus } from "../../../entities/orders/lib/mapOrderStatus";
import { updateOrderStatusThunk } from "../../../features/buttons-change-status/model/updateOrderStatusThunk";
import { fetchOrderById } from "../../../entities/orders/api/thunkFetchOrderById";

interface OrderState {
  order: Order | null;
  totalCost: number;
  loading: boolean;
  error: string | null;
  statusUpdateLoading: boolean;
}

const initialState: OrderState = {
  order: null,
  totalCost: 0,
  loading: false,
  error: null,
  statusUpdateLoading: false,
};

const orderSlice = createSlice({
  name: "order-details",
  initialState,
  reducers: {
    getTotalCost(state) {
      if (state.order) {
        state.totalCost = state.order.products.reduce(
          (total: number, item) => total + item.price * item.quantity,
          0
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderById.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.loading = false;
          state.order = action.payload;
        }
      )
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Не вдалося отримати замовлення";
      })

      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.statusUpdateLoading = true;
        state.error = null;
      })
      .addCase(
        updateOrderStatusThunk.fulfilled,
        (
          state,
          action: PayloadAction<{ id: number; status: NumericStatus }>
        ) => {
          state.statusUpdateLoading = false;
          if (state.order && state.order.id === action.payload.id) {
            state.order.status = action.payload.status;
          }
        }
      )
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.statusUpdateLoading = false;
        state.error = action.error.message || "Не вдалося оновити статус";
      });
  },
});

export const { getTotalCost } = orderSlice.actions;
export default orderSlice.reducer;

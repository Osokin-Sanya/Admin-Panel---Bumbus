import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../shared/api/supabase";
import { NumericStatus } from "../../../entities/orders/lib/mapOrderStatus";

interface UpdateOrderStatusParams {
  id: number;
  status: NumericStatus;
}

export const updateOrderStatusThunk = createAsyncThunk<
  UpdateOrderStatusParams,
  UpdateOrderStatusParams,
  { rejectValue: string }
>("order/updateStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return { id, status };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

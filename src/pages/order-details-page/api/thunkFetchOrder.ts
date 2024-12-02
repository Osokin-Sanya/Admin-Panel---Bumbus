import { createAsyncThunk } from "@reduxjs/toolkit";
import supabaseClient from "../../../shared/supabase-client/api/supabaseClient";

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (orderId: number, thunkAPI) => {
    try {
      const { data, error } = await supabaseClient
        .from("orders")
        .select("*")
        .eq("id", orderId);
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return data || [];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(`Error: ${err.message}`);
    }
  }
);

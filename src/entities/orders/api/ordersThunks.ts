import { createAsyncThunk } from "@reduxjs/toolkit";
import supabaseClient from "../../../shared/supabase-client/api/supabaseClient";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const { data, error } = await supabaseClient
        .from("orders")
        .select("created_at, contact, status, id, products");
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return data || [];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(`Error: ${err.message}`);
    }
  }
);

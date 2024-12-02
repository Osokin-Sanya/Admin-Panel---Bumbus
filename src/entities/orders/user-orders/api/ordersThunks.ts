import { createAsyncThunk } from "@reduxjs/toolkit";
import supabaseClient from "../../../../shared/supabase-client/api/supabaseClient";

export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (userId: string, thunkAPI) => {
    try {
      const { data, error } = await supabaseClient
        .from("orders")
        .select("*")
        .eq("user", userId);
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return data || [];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(`Error: ${err.message}`);
    }
  }
);

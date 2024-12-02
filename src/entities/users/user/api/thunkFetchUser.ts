import { createAsyncThunk } from "@reduxjs/toolkit";
import supabaseClient from "../../../../shared/supabase-client/api/supabaseClient";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string, thunkAPI) => {
     
    
    try {
      const { data, error } = await supabaseClient
        .rpc("get_user_identities")
        .eq("user_id", userId);

      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return data || [];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(`Error: ${err.message}`);
    }
  }
); 
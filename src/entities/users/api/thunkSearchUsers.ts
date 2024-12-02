import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../shared/api/supabase";

export const searchUsers = createAsyncThunk(
  "users/searchUsers",
  async (searchTerm: string, thunkAPI) => {
    try {
      const { data, error } = await supabase.rpc("search_users_by_query", {
        search_query: searchTerm,
      });

      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to search users");
    }
  }
);

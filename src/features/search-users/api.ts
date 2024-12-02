import { createAsyncThunk } from "@reduxjs/toolkit";
import supabaseClient from "../../shared/supabase-client/api/supabaseClient";

interface Sort {
  type: string;
  value: boolean;
}

const sort = ({ type, value }: Sort) => {
  if (type === "name") {
    return {
      column: "identity_data->>name",
      ascending: value,
    };
  } else if (type === "date") {
    return {
      column: "created_at",
      ascending: value,
    };
  }
  return undefined;
};

export const fetchUsersSearch = createAsyncThunk(
  "users/fetchUsers",
  async (
    filters: { searchQuery: string; sortBy: { type: string; value: boolean } },
    thunkAPI
  ) => {
    try {
      const sortResult = sort(filters.sortBy);

      if (!sortResult) {
        return thunkAPI.rejectWithValue("Invalid sort type");
      }

      const { column, ascending } = sortResult;
      const { data, error } = await supabaseClient
        .rpc("search_users_and_sort", {
          search_query: filters.searchQuery,
        })
        .order(column, { ascending });

      if (error) {
        console.error("Помилка під час виконання запиту:", error);
      } else {
        console.log("Дані користувачів:", data);
      }

      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return data || [];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(`Error: ${err.message}`);
    }
  }
);

// export const fetchUsersSearch = createAsyncThunk(
//   "users/fetchUsers",
//   async (searchQuery: string, thunkAPI) => {
//     try {
//       const { data, error } = await supabaseClient.rpc("search_users", {
//         search_query: searchQuery,
//       });

//       if (error) {
//         return thunkAPI.rejectWithValue(error.message);
//       }

//       return data || [];
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(`Error: ${err.message}`);
//     }
//   }
// );

// CREATE OR REPLACE FUNCTION search_users(search_query text)
// RETURNS SETOF auth.identities AS $$
// BEGIN
//   RETURN QUERY
//   SELECT *
//   FROM auth.identities
//   WHERE
//     -- Поиск по id, если search_query - это число
//     (search_query ~ '^[0-9]+$' AND user_id::text ILIKE '%' || search_query || '%')
//     OR
//     -- Поиск по полям внутри identity_data
//     (identity_data->>'name' ILIKE '%' || search_query || '%'
//     OR identity_data->>'email' ILIKE '%' || search_query || '%'
//     OR identity_data->>'sub' ILIKE '%' || search_query || '%')
//     OR
//     -- Поиск по дате создания (created_at)
//     TO_CHAR(created_at, 'YYYY-MM-DD') ILIKE '%' || search_query || '%';
// END;
// $$ LANGUAGE plpgsql;

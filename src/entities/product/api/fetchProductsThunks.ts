import { createAsyncThunk } from "@reduxjs/toolkit";
import supabaseClient from "../../../shared/supabase-client/api/supabaseClient";

interface FetchProductsParams {
  searchProductQuery: string;
  filter: {
    minPrice: number;
    maxPrice: number | null;
  };
  sort: {
    sortBrand: string;
    sortStandart: {
      field?: "price" | "date" | "amount";
      direction?: "asc" | "desc";
    };
  };
}

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params: FetchProductsParams, thunkAPI) => {
    try {
      let query = supabaseClient.from("shopItems").select("*");

      if (params.searchProductQuery) {
        query = query.ilike("title", `%${params.searchProductQuery}%`);
      }

      if (params.filter.minPrice > 0) {
        query = query.gte("price", params.filter.minPrice);
      }

      if (params.filter.maxPrice !== null && params.filter.maxPrice > 0) {
        query = query.lte("price", params.filter.maxPrice);
      }

      if (params.sort.sortBrand) {
        query = query.eq("brand", params.sort.sortBrand);
      }

      if (
        params.sort.sortStandart?.field &&
        params.sort.sortStandart?.direction
      ) {
        const field =
          params.sort.sortStandart.field === "date" ? "date" :
          params.sort.sortStandart.field === "amount" ? "amount" : "price";
        const ascending = params.sort.sortStandart.direction === "asc";
        query = query.order(field, { ascending });
      }

      const { data, error } = await query;

      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return data || [];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(`Error: ${err.message}`);
    }
  }
);

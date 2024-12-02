import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SortStandart {
  field?: "price" | "date" | "amount";
  direction?: "asc" | "desc";
}

interface FilterState {
  searchProductQuery: string;
  filter: {
    minPrice: number;
    maxPrice: number | null;
  };
  sort: {
    sortBrand: string;
    sortStandart: SortStandart;
  };
}

const initialState: FilterState = {
  searchProductQuery: "",
  filter: {
    minPrice: 0,
    maxPrice: null,
  },
  sort: {
    sortBrand: "",
    sortStandart: {},
  },
};

const filterStockSlice = createSlice({
  name: "filter-stock",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<FilterState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFilters } = filterStockSlice.actions;
export default filterStockSlice.reducer;

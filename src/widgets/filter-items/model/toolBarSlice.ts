import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  searchOrdersQuery: string;
  searchOrdersUsers: string;
  selectedStatus: number;
  selectedUsers: any;
}

const initialState: State = {
  searchOrdersQuery: "",
  searchOrdersUsers: "",
  selectedStatus: 0,
  selectedUsers: { value: true, type: "name" },
};

const toolBarSlice = createSlice({
  name: "tool-bar",
  initialState,
  reducers: {
    selectStatus(state, action: PayloadAction<any>) {
      state.selectedStatus = action.payload;
    },
    searchUsers(state, action) {
      state.searchOrdersUsers = action.payload;
    },
    searchOrders(state, action) {
      state.searchOrdersQuery = action.payload;
    },
    selectUsersSort(
      state,
      action: PayloadAction<{
        selectedValue: string | null;
        selectedType: string | null;
      }>
    ) {
      const { selectedValue, selectedType } = action.payload;

      state.selectedUsers.value = selectedValue === "true";
      state.selectedUsers.type = selectedType;
    },
  },
});

export default toolBarSlice.reducer;
export const { selectStatus } = toolBarSlice.actions;
export const { searchUsers } = toolBarSlice.actions;
export const { searchOrders } = toolBarSlice.actions;
export const { selectUsersSort } = toolBarSlice.actions;

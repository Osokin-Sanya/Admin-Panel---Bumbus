import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchUsers } from "../api/thunkSearchUsers";

interface User {
  id: string;
  provider_id: string;
  user_id: string;
  identity_data: {
    sub: string;
    name: string;
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
  };
  created_at: string;
}

interface UsersState {
  items: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(searchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;

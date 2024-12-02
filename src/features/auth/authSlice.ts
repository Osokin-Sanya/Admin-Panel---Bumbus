import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../shared/api/supabase";
import { RootState } from "../../app/store/store";

interface AuthState {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  error: null,
};

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  if (!session) {
    throw new Error("No active session");
  }

  return {
    user: session.user,
    token: session.access_token,
  };
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    
    if (email !== "superadmin@gmail.com" || password !== "superadmin@gmail.com") {
      throw new Error("Невірний email або пароль");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      user: data.user,
      token: data.session?.access_token,
    };
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || "Відбулася помилка під час авторизації";
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.token);
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

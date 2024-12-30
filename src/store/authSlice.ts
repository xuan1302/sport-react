import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";
import StorageKeys from "../constants/storage-key";

// Định nghĩa kiểu dữ liệu
interface User {
  accessToken?: string;
  refreshToken?: string;
  userId: string;
  userName?: "ab";
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface LoginPayload {
  userName: string;
  password: string;
}

interface RegisterPayload {
  fullName: string;
  phoneNumber: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: number;
  roleIds: number[];
}

// Trạng thái ban đầu
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk<User, RegisterPayload>(
  "user/register",
  async (payload: RegisterPayload) => {
    const data = await authApi.register(payload);
    return data as User;
  }
);

export const login = createAsyncThunk<User, LoginPayload>(
  "user/login",
  async (payload: LoginPayload) => {
    const data = await authApi.login(payload);
    localStorage.setItem(StorageKeys.TOKEN, data.accessToken);
    // localStorage.setItem(StorageKeys.USERS, JSON.stringify(data.user));
    //return
    return data as User;
  }
);

// Tạo Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;

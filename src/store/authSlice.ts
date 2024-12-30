import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";
import StorageKeys from "../constants/storage-key";


// Định nghĩa kiểu dữ liệu
interface User {
    accessToken: string;
    refreshToken: string;
    userId: string;
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
  
  // Trạng thái ban đầu
  const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
  };
  
//   export const register = createAsyncThunk('user/register', async (payload: { userName: string; password: string }) => {
//     //calllapi
//     const data = await authApi.register(payload);
//     //savedata to local
//     localStorage.setItem(StorageKeys.TOKEN, data.jwt);
//     localStorage.setItem(StorageKeys.USERS, JSON.stringify(data.user));
//     //return
//     return data.user;
// });

export const login = createAsyncThunk<User, LoginPayload>('user/login', async (payload: LoginPayload) => {
    const data = await authApi.login(payload);
    localStorage.setItem(StorageKeys.TOKEN, data.accessToken);
    // localStorage.setItem(StorageKeys.USERS, JSON.stringify(data.user));
    //return
    return data as User;
});
  
  // Tạo Slice
  const userSlice = createSlice({
    name: 'users',
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
          state.error = action.error.message || 'Failed to fetch users';
        });
    },
  });
  
  export default userSlice.reducer;
// const { actions, reducer } = weatherSlice;
// export const { fetchDataWeather, searchByLocation, setNameCity, setErrorSearch } = actions;
export const {logout} = userSlice.actions;
// export default reducer;
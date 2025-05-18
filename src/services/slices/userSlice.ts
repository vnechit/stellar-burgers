import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getOrdersApi,
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';

interface IUserState {
  isLoading: boolean;
  error: string | null;
  user: TUser | null;
  isAuthChecked: boolean;
}

const initialState: IUserState = {
  isLoading: false,
  error: null,
  user: null,
  isAuthChecked: true
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    userSelector: (state) => state.user,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isLoadingSelector: (state) => state.isLoading
  },
  reducers: {},
  extraReducers(builder) {}
});

export const { userSelector, isAuthCheckedSelector, isLoadingSelector } =
  userSlice.selectors;
export default userSlice.reducer;

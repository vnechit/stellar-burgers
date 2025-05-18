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
  logoutApi,
  TLoginData,
  TRegisterData,
  refreshToken
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';

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

type TSignResponse = {
  refreshToken: string;
  accessToken: string;
  user: TUser;
};

const setTokens = ({ refreshToken, accessToken, user }: TSignResponse) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  return user;
};

export const tryLogInUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) =>
    loginUserApi({ email, password }).then(setTokens)
);

export const tryRegisterUser = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData) =>
    registerUserApi({ email, name, password }).then(setTokens)
);

export const tryLogOutUser = createAsyncThunk(
  'user/logout',
  async logoutApi
);

export const tryGetUser = createAsyncThunk('user/getUser', getUserApi);

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    userSelector: (state) => state.user,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isLoadingSelector: (state) => state.isLoading
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(tryLogInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(tryLogInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(tryLogInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(tryRegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(tryRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(tryRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(tryGetUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(tryGetUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = null;
        state.error = action.error.message!;
      })
      .addCase(tryGetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      });
  }
});

export const { userSelector, isAuthCheckedSelector, isLoadingSelector } =
  userSlice.selectors;
export default userSlice.reducer;

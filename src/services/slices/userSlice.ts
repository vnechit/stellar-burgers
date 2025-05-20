import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import {
  getOrdersApi,
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TLoginData,
  TRegisterData
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';

interface IUserState {
  isLoading: boolean;
  error: string | null;
  user: TUser | null;
  isAuthChecked: boolean;
  orders: TOrder[] | null;
}

const initialState: IUserState = {
  isLoading: false,
  error: null,
  user: null,
  isAuthChecked: true,
  orders: null
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

export const tryLogOutUser = createAsyncThunk('user/logout', async () =>
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
);

export const tryGetUser = createAsyncThunk('user/getUser', getUserApi);

export const tryUpdateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const getUserOrders = createAsyncThunk('users/orders', async () =>
  getOrdersApi()
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    userSelector: (state) => state.user,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isLoadingSelector: (state) => state.isLoading,
    userOrdersSelector: (state) => state.orders
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // login
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
      // register
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
      // get user
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
      })
      // logout
      .addCase(tryLogOutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(tryLogOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(tryLogOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
      })
      // update user
      .addCase(tryUpdateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(tryUpdateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(tryUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      // get orders
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  }
});

export const {
  userSelector,
  isAuthCheckedSelector,
  isLoadingSelector,
  userOrdersSelector
} = userSlice.selectors;
export default userSlice.reducer;

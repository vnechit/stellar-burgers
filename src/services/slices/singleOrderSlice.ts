import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

interface ISingleOrderState {
  singleOrder: TOrder | null;
  isOrderLoading: boolean;
  error: string | null;
}

const initialState: ISingleOrderState = {
  singleOrder: null,
  isOrderLoading: false,
  error: null
};

export const getOrderByNumber = createAsyncThunk(
  'singleOrder/get',
  async (number: number) => getOrderByNumberApi(number)
);

export const postOrder = createAsyncThunk(
  'singleOrder/post',
  async (data: string[]) => orderBurgerApi(data)
);

const singleOrderSlice = createSlice({
  name: 'singleOrder',
  initialState,
  selectors: {
    isOrderLoadingSelector: (state) => state.isOrderLoading,
    singleOrderSelector: (state) => state.singleOrder
  },
  reducers: {
    clearSingleOrderState: (state) => {
      state.singleOrder = null;
      state.isOrderLoading = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.isOrderLoading = true;
        state.singleOrder = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error.message!;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.singleOrder = action.payload.orders[0];
      })
      .addCase(postOrder.pending, (state) => {
        state.isOrderLoading = true;
        state.singleOrder = null;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error.message!;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.singleOrder = action.payload.order;
      });
  }
});

export const { clearSingleOrderState } = singleOrderSlice.actions;
export const { isOrderLoadingSelector, singleOrderSelector } =
  singleOrderSlice.selectors;
export default singleOrderSlice.reducer;

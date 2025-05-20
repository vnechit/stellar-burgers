import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder, TOrdersData } from '@utils-types';

interface IFeedsState {
  isFeedsLoading: boolean;
  error: string | null;
}

const initialState: IFeedsState & TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0,
  isFeedsLoading: false,
  error: null
};

export const getFeeds = createAsyncThunk('feeds/getFeeds', async () =>
  getFeedsApi()
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  selectors: {
    isFeedsLoadingSelector: (state) => state.isFeedsLoading,
    ordersSelector: (state) => state.orders,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isFeedsLoading = true;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isFeedsLoading = false;
        state.error = action.error.message!;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const {
  ordersSelector,
  isFeedsLoadingSelector,
  totalSelector,
  totalTodaySelector
} = feedsSlice.selectors;
export default feedsSlice.reducer;

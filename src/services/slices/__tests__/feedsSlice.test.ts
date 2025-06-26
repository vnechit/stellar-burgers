import reducer, { initialFeedsState } from '../feedsSlice';
import { getFeeds } from '@slices';
import feedsData from './mockData/feedsSliceData';

describe('Тестирование feedsSlice reducer', () => {
  test('getFeeds.pending', () => {
    const newState = reducer(initialFeedsState, getFeeds.pending('pending'));
    expect(newState.isFeedsLoading).toBeTruthy();
  });

  test('getFeeds.rejected', () => {
    const newState = reducer(
      initialFeedsState,
      getFeeds.rejected(new Error('error during getting feeds'), 'rejected')
    );
    expect(newState.isFeedsLoading).toBeFalsy();
    expect(newState.error).toEqual('error during getting feeds');
  });

  test('getFeeds.fulfilled', () => {
    const newState = reducer(
      initialFeedsState,
      getFeeds.fulfilled({ success: true, ...feedsData }, 'fullfilled')
    );
    expect(newState.isFeedsLoading).toBeFalsy();
    expect(newState.orders).toEqual(feedsData.orders);
  });
});

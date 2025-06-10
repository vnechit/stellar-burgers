import reducer, { initialOrderState } from '../singleOrderSlice';
import { getOrderByNumber, postOrder } from '@slices';
import orderData from './mockData/singleOrderSliceData';

describe('Тестирование singleOrderSlice', () => {
  describe('Тестирование getOrderByNumber', () => {
    test('getOrderByNumber.pending', () => {
      const newState = reducer(
        initialOrderState,
        getOrderByNumber.pending('pending', 1)
      );
      expect(newState.isOrderLoading).toBeTruthy();
    });

    test('getOrderByNumber.rejected', () => {
      const newState = reducer(
        initialOrderState,
        getOrderByNumber.rejected(
          new Error('error during getting ingredients'),
          'rejected',
          1
        )
      );
      expect(newState.isOrderLoading).toBeFalsy();
      expect(newState.error).toEqual('error during getting ingredients');
    });

    test('getOrderByNumber.fulfilled', () => {
      const newState = reducer(
        initialOrderState,
        getOrderByNumber.fulfilled(
          { success: true, orders: orderData },
          'fullfilled',
          1
        )
      );
      expect(newState.isOrderLoading).toBeFalsy();
      expect(newState.singleOrder).toEqual(orderData[0]);
    });
  });

  describe('Тестирование postOrder', () => {
    test('postOrder.pending', () => {
      const newState = reducer(
        initialOrderState,
        postOrder.pending('pending', orderData[0].ingredients)
      );
      expect(newState.isOrderLoading).toBeTruthy();
    });

    test('postOrder.rejected', () => {
      const newState = reducer(
        initialOrderState,
        postOrder.rejected(
          new Error('error during getting ingredients'),
          'rejected',
          orderData[0].ingredients
        )
      );
      expect(newState.isOrderLoading).toBeFalsy();
      expect(newState.error).toEqual('error during getting ingredients');
    });

    test('postOrder.fulfilled', () => {
      const newState = reducer(
        initialOrderState,
        postOrder.fulfilled(
          {
            success: true,
            order: orderData[0],
            name: 'TestName'
          },
          'fullfilled',
          orderData[0].ingredients
        )
      );
      expect(newState.isOrderLoading).toBeFalsy();
      expect(newState.singleOrder).toEqual(orderData[0]);
    });
  });
});

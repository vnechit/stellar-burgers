import ingredientsData from './mockData/ingridientsSliceData';
import reducer, { initialIngredientsState } from '../ingridientsSlice';
import { getIngridients } from '@slices';

describe('Тестирование ingredientsSlice reducer', () => {
  test('getIngridients.pending', () => {
    const newState = reducer(
      initialIngredientsState,
      getIngridients.pending('pending')
    );
    expect(newState.isIngridientsLoading).toBeTruthy();
  });

  test('getIngridients.rejected', () => {
    const newState = reducer(
      initialIngredientsState,
      getIngridients.rejected(
        new Error('error during getting ingredients'),
        'rejected'
      )
    );
    expect(newState.isIngridientsLoading).toBeFalsy();
    expect(newState.error).toEqual('error during getting ingredients');
  });

  test('getIngridients.fulfilled', () => {
    const newState = reducer(
      initialIngredientsState,
      getIngridients.fulfilled(ingredientsData, 'fullfilled')
    );
    expect(newState.isIngridientsLoading).toBeFalsy();
    expect(newState.ingridients).toEqual(ingredientsData);
  });
});

import {
  addItem,
  removeItem,
  swapIngridients,
  clearConstructor,
  initialState
} from '@slices';
import reducer from '../burgerConstructorSlice';
import mockData from './mockData/burgerConstructorData';

describe('Тестирование builderReducer', () => {
  test('Добавление булки', () => {
    const newState = reducer(initialState, addItem(mockData.bun));
    const { bun } = newState;
    expect(bun!._id).toEqual(mockData.bun._id);
  });

  test('Добавление ингридиента', () => {
    const newState = reducer(initialState, addItem(mockData.ingredients[0]));
    const { ingridients } = newState;
    expect(ingridients).toHaveLength(1);
  });

  test('Удаление ингридиента', () => {
    let newState = reducer(initialState, addItem(mockData.ingredients[0]));
    newState = reducer(newState, addItem(mockData.ingredients[1]));
    newState = reducer(newState, removeItem(newState.ingridients[1]));
    const { ingridients } = newState;
    expect(ingridients).toHaveLength(1);
    expect(ingridients[0]._id).toEqual(mockData.ingredients[0]._id);
  });
  describe('Перемещение ингридиентов', () => {
    test('Перемещение ингридиентов вниз', () => {
      let newState = reducer(initialState, addItem(mockData.ingredients[0]));
      newState = reducer(newState, addItem(mockData.ingredients[1]));
      newState = reducer(
        newState,
        swapIngridients({ index: 0, direction: 'DOWN' })
      );
      const { ingridients } = newState;
      expect(ingridients).toHaveLength(2);
      expect(ingridients[0]._id).toEqual(mockData.ingredients[1]._id);
    });

    test('Перемещение ингридиентов вверх', () => {
      let newState = reducer(initialState, addItem(mockData.ingredients[0]));
      newState = reducer(newState, addItem(mockData.ingredients[1]));
      newState = reducer(
        newState,
        swapIngridients({ index: 1, direction: 'UP' })
      );
      const { ingridients } = newState;
      expect(ingridients).toHaveLength(2);
      expect(ingridients[0]._id).toEqual(mockData.ingredients[1]._id);
    });
  });

  test('Очистка конструктора', () => {
    let newState = reducer(initialState, addItem(mockData.ingredients[0]));
    newState = reducer(newState, addItem(mockData.ingredients[1]));
    newState = reducer(newState, addItem(mockData.bun));
    newState = reducer(newState, clearConstructor());
    expect(newState.ingridients).toHaveLength(0);
    expect(newState.bun).toBeNull();
  });
});

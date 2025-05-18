import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TIngredient, TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

interface IConstructorState {
  bun: TConstructorIngredient | null;
  ingridients: TConstructorIngredient[];
}

const initialState: IConstructorState = {
  bun: null,
  ingridients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    constructorBunSelector: (state) => state.bun,
    constructorIngridientsSelector: (state) => state.ingridients
  },
  reducers: {
    addItem: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = { ...action.payload, id: uuidv4() };
      } else {
        state.ingridients.push({ ...action.payload, id: uuidv4() });
      }
    },
    removeItem: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingridients = state.ingridients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingridients = [];
    }
  }
});

export const { constructorBunSelector, constructorIngridientsSelector } =
  constructorSlice.selectors;
export const { addItem, removeItem, clearConstructor } =
  constructorSlice.actions;
export default constructorSlice.reducer;

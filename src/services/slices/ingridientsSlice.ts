import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

interface IIngridientState {
  ingridients: TIngredient[];
  isIngridientsLoading: boolean;
  error: string | null;
}

const initialState: IIngridientState = {
  ingridients: [],
  isIngridientsLoading: false,
  error: null
};

export const getIngridients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);

const ingridientsSlice = createSlice({
  name: 'ingridients',
  initialState,
  selectors: {
    ingridientsSelector: (state) => state.ingridients,
    ingridientsLoadingSelector: (state) => state.isIngridientsLoading
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getIngridients.pending, (state) => {
        state.isIngridientsLoading = true;
      })
      .addCase(getIngridients.rejected, (state, action) => {
        state.isIngridientsLoading = false;
        state.error = action.error.message!;
      })
      .addCase(getIngridients.fulfilled, (state, action) => {
        state.isIngridientsLoading = false;
        state.ingridients = action.payload;
      });
  }
});

export const { ingridientsSelector, ingridientsLoadingSelector } =
  ingridientsSlice.selectors;
export default ingridientsSlice.reducer;

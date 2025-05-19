import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingridients from './slices/ingridientsSlice';
import burgerConstructor from './slices/burgerConstructorSlice';
import feeds from './slices/feedsSlice';
import user from './slices/userSlice';
import singleOrder from './slices/singleOrderSlice';

const rootReducer = combineReducers({
  ingridients,
  burgerConstructor,
  feeds,
  user,
  singleOrder
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

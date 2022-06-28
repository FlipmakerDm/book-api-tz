import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './components/Search/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
  },
});

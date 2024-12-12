import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { continentesApi } from '../services/continentsApi';

export const store = configureStore({
  reducer: {
    [continentesApi.reducerPath]: continentesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(continentesApi.middleware),
});

setupListeners(store.dispatch);

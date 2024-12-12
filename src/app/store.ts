import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { continentesApi } from '../services/continentsApi';
// Configura el store de Redux
export const store = configureStore({
  reducer: {
    //utiliza la api de continente 
    [continentesApi.reducerPath]: continentesApi.reducer,
  },
  //conbina los middleware por defecto con los de la api de continentes
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(continentesApi.middleware),
});

setupListeners(store.dispatch);
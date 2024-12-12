import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const continentesApi = createApi({
  reducerPath: 'continentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1/' }),
  endpoints: (builder) => ({
    getContinents: builder.query({
      query: () => 'all', // Asegúrate de que esta ruta sea correcta
    }),
    getCountriesByContinent: builder.query({
      query: (continent) => `region/${continent}`, // Asegúrate de que esta ruta sea correcta
    }),
    getCountryDetails: builder.query({
      query: (country) => `name/${country}`, // Asegúrate de que esta ruta sea correcta
    }),
  }),
});

// Exportar los hooks generados automáticamente
export const { useGetContinentsQuery, useGetCountriesByContinentQuery, useGetCountryDetailsQuery } = continentesApi;
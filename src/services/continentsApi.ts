import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const continentesApi = createApi({
  reducerPath: 'continentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1/' }),
  endpoints: (builder) => ({
    getContinents: builder.query({
      query: () => 'all?fields=name, capital,region,languages,flags,maps,lating', 
    }),
    getCountriesByContinent: builder.query({
      query: (continent) => `region/${continent}`, 
    }),
    getCountryDetails: builder.query({
      query: (country) => `name/${country}`, 
    }),
  }),
});

export const { useGetContinentsQuery, useGetCountriesByContinentQuery, useGetCountryDetailsQuery } = continentesApi;
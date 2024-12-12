import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const continentesApi = createApi({
  //define el nombre
  reducerPath: 'continentsApi',
  // configura la base de la api
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1/' }),
  endpoints: (builder) => ({
    //obtiene todos los continentes
    getContinents: builder.query({
      query: () => 'all?fields=name, capital,region,languages,flags,maps,lating', 
    }),
    // obtener paises de continentes 
    getCountriesByContinent: builder.query({
      query: (continent) => `region/${continent}`, 
    }),
    // obtener detalles de paises
    getCountryDetails: builder.query({
      query: (country) => `name/${country}?fullText=true`, 
    }),
  }),
});

export const { useGetContinentsQuery, useGetCountriesByContinentQuery, useGetCountryDetailsQuery } = continentesApi;
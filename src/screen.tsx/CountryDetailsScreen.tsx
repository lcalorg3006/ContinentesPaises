import React from 'react'; import { Text, View, Image } from 'react-native'; import MapView from 'react-native-maps'; import { useGetCountryDetailsQuery } from '../services/continentsApi';

const CountryDetailsScreen = ({ route }: any) => {
  const { country } = route.params; const { data, error, isLoading } = useGetCountryDetailsQuery(country);

  if (isLoading) return <Text>Cargando...</Text>; if (error) return <Text>Error al cargar los detalles del país.</Text>;

  const countryDetails = data[0]; // Suponiendo que el primer elemento es el correcto

  return (<View> <Text>{countryDetails.name.common}</Text> <Text>{countryDetails.capital}</Text> <Text>{countryDetails.languages ? Object.values(countryDetails.languages).join(', ') : 'No disponible'}</Text> <Image source={{ uri: countryDetails.flags[0] }} style={{ width: 50, height: 30 }} /> <MapView style={{ height: 300 }} initialRegion={{ latitude: countryDetails.latlng[0], longitude: countryDetails.latlng[1], latitudeDelta: 10, longitudeDelta: 10, }} /> </View>);
};

export default CountryDetailsScreen;

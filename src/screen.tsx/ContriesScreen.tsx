import React from 'react';
import { FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { useGetCountriesByContinentQuery } from '../services/continentsApi';

const CountriesScreen = ({ route, navigation }: any) => {
  const { continente } = route.params;
  const { data, error, isLoading } = useGetCountriesByContinentQuery(continente);

  if (isLoading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error al cargar los países.</Text>;

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CountryDetails', { country: item.name.common })}>
            <Text>{item.name.common}</Text>
            <Text>{item.capital}</Text>
            <Text>{item.languages ? Object.values(item.languages).join(', ') : 'No disponible'}</Text>
            <Image source={{ uri: item.flags[0] }} style={{ width: 50, height: 30 }} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name.common}
      />
    </View>
  );
};

export default CountriesScreen;
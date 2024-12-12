// screen/CountriesScreen.tsx
import React from 'react'; 
import { FlatList, Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'; 
import { useGetCountriesByContinentQuery } from '../services/continentsApi';

const CountriesScreen = ({ route, navigation }: any) => { 
  const { continente } = route.params;  // Recibe el continente desde la navegación
  const { data, error, isLoading } = useGetCountriesByContinentQuery(continente);  // Query de países por continente

  if (isLoading) return <Text>Cargando...</Text>; 
  if (error) return <Text>Error al cargar los países.</Text>;

  return ( 
    <View style={styles.container}> 
      <FlatList 
        data={data} 
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CountryDetails', { country: item.name.common })}> 
            <Text style={styles.text}>{item.name.common}</Text> 
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  // Estilos adicionales según lo necesites
});

export default CountriesScreen;

import React from 'react'; 
import { FlatList, Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'; 
import { useGetCountriesByContinentQuery } from '../services/continentsApi';

const CountriesScreen = ({ route, navigation }: any) => { 
    //extrae el pais de los parametros de la ruta

  const { continente } = route.params;  
    // obtiene los detalles del continente

  const { data, error, isLoading } = useGetCountriesByContinentQuery(continente);  
//comprueba el estado
  if (isLoading) return <Text>Cargando...</Text>; 
  if (error) return <Text>Error al cargar los países.</Text>;

  return ( 
    <View style={styles.container}> 
      <FlatList 
        data={data} // proporciona los datos
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CountryDetails', { country: item.name.common })}> 
            <Text style={styles.text}>{item.name.common}</Text> // muestra el nombre
            <Text>{item.capital}</Text> //muestra la capital del pais
            <Text>{item.languages ? Object.values(item.languages).join(', ') : 'No disponible'}</Text> 
            <Image source={{ uri: item.flags[0] }} style={{ width: 50, height: 30 }} /> 
          </TouchableOpacity> 
        )} 
        keyExtractor={(item) => item.name.common} // clave unica el nombre del pais
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
});

export default CountriesScreen;

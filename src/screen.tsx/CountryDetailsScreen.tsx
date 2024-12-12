// screen/CountryDetailsScreen.tsx
import React from 'react'; 
import { Text, View, Image, StyleSheet } from 'react-native'; 
import MapView, { Marker } from 'react-native-maps'; 
import { useGetCountryDetailsQuery } from '../services/continentsApi';

const CountryDetailsScreen = ({ route }: any) => {
  const { country } = route.params;  // Obtener el país desde los parámetros de la ruta
  const { data, error, isLoading } = useGetCountryDetailsQuery(country);  // Obtener los detalles del país

  // Verificar estado de carga o error
  if (isLoading) return <Text style={styles.loadingText}>Cargando...</Text>;
  if (error) return <Text style={styles.errorText}>Error al cargar los detalles del país.</Text>;

  const countryDetails = Array.isArray(data) ? data[0] : data; 

  const latlng = countryDetails.latlng ? countryDetails.latlng : [0, 0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{countryDetails.name.common}</Text>
      <Text style={styles.text}>Capital: {countryDetails.capital}</Text>
      <Text style={styles.text}>Idiomas: {countryDetails.languages ? Object.values(countryDetails.languages).join(', ') : 'No disponible'}</Text>
      <Image source={{ uri: countryDetails.flags[0] }} style={styles.flag} />
   
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: latlng[0], 
          longitude: latlng[1], 
          latitudeDelta: 10, 
          longitudeDelta: 10
        }}>
        <Marker coordinate={{ latitude: latlng[0], longitude: latlng[1] }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingText: {
    color: 'gray',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'center',
  },
  flag: {
    width: 100,
    height: 60,
    alignSelf: 'center',
    marginVertical: 20,
  },
  map: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
});

export default CountryDetailsScreen;

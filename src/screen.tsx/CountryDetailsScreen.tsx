import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useGetCountryDetailsQuery } from '../services/continentsApi';

const CountryDetailsScreen = ({ route }: any) => {
  //extrae el pais de los parametros de la ruta
  const { country } = route.params;
  // obtiene los detalles del pais
  const { data, error, isLoading } = useGetCountryDetailsQuery(country);

  // comprueba el estado
  if (isLoading) return <Text style={styles.loadingText}>Cargando...</Text>;
  if (error) return <Text style={styles.errorText}>Error al cargar los detalles del país.</Text>;

  //Nos aseguramos de que los datos sean objetos y no array
  const countryDetails = Array.isArray(data) ? data[0] : data;
// Obtiene las coordenadas o sino uso 0.0
  const latlng = countryDetails.latlng ? countryDetails.latlng : [0, 0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{countryDetails.name.common}</Text>// muestra el nombre
      <Text style={styles.text}>Capital: {countryDetails.capital}</Text>//la capital
      <Text style={styles.text}>Idiomas: {countryDetails.languages ? Object.values(countryDetails.languages).join(', ') : 'No disponible'}</Text>// muestra el idioma
      <Image source={{ uri: countryDetails.flags[0] }} style={styles.flag} />// bandera

      <MapView
        style={styles.map}
        initialRegion={{
          //valores iniciales
          latitude: latlng[0],
          longitude: latlng[1],
          //valores de diferencia
          latitudDiferencia: 10,
          longitudDiferencia: 10
        }}>
        <Marker coordinate={{ latitude: latlng[0], longitude: latlng[1] }} /> //mapa
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  loadingText: {
    color: 'white',
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
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
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

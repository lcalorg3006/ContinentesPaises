import React from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useGetContinentsQuery } from '../services/continentsApi';

interface Country {
  region: string;
}

const ContinentsScreen = ({ navigation }: any) => {
  //obtiene los continentes
  const { data, error, isLoading } = useGetContinentsQuery(undefined);
  // comprueba los estados
  if (isLoading) {
    return <Text>Cargando...</Text>;
  }
  // comprueba que se carga los continentes
  if (error) {
    console.error('Error al cargar los continentes:', error);
    const errorMessage = 'error' in error ? error.error : 'Error desconocido';
    return <Text>Error al cargar los continentes: {errorMessage}</Text>;
  }
//extrae los continentes 
  const continents: string[] = Array.from(new Set(data?.map((country: Country) => country.region) ?? [])); 

  return (
    <View style={styles.container}>
      <FlatList
        data={continents}
        renderItem={({ item }: { item: string }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Countries', { continente: item })}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 24,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 15,
  },
  listContainer: {
    padding: 20,
  },
});

export default ContinentsScreen;

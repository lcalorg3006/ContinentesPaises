import React from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useGetContinentsQuery } from '../services/continentsApi';

// Define the type of the continent data
interface Country {
  region: string;
}

const ContinentsScreen = ({ navigation }: any) => {
  const { data, error, isLoading } = useGetContinentsQuery(undefined);

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    console.error('Error al cargar los continentes:', error);
    const errorMessage = 'error' in error ? error.error : 'Error desconocido'; // Accessing error property
    return <Text>Error al cargar los continentes: {errorMessage}</Text>;
  }

  // Ensure that data is correctly typed and handle undefined or null values
  const continents: string[] = Array.from(new Set(data?.map((country: Country) => country.region) ?? [])); 

  return (
    <View style={styles.container}>
      <FlatList
        data={continents} // We are passing an array of strings now
        renderItem={({ item }: { item: string }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Countries', { continente: item })}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item} // Ensure 'item' is unique
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
    fontSize: 24, // Increased font size for loading text
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 24, // Increased font size for error text
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24, // Increased font size for continent names
    textAlign: 'center',
    paddingVertical: 15, // Added vertical padding for separation
  },
  listContainer: {
    padding: 20, // Added padding to the list container
  },
});

export default ContinentsScreen;

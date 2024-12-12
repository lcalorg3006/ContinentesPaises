import React from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { useGetContinentsQuery } from '../services/continentsApi';

const ContinentsScreen = ({ navigation }: any) => {
  const { data, error, isLoading } = useGetContinentsQuery(undefined); // Pasar undefined si no se requiere argumento

  if (isLoading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error al cargar los continentes.</Text>;

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Countries', { continente: item.region })}>
            <Text>{item.region}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.region}
      />
    </View>
  );
};

export default ContinentsScreen;
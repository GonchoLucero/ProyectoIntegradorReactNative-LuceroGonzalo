import React from 'react';
import { StyleSheet, Text, View, FlatList,SafeAreaView, TouchableOpacity } from 'react-native';
import ProductCard from './ProductCard';

// DATOS DE PRODUCTOS //
const PRODUCTS = [
  {
    id: '1',
    name: 'Bolso Matero',
    price: 15000,
    image: require('../assets/images/bolsoMatero.jpg'), 
    description: 'Descripción detallada del producto 1. Este es un excelente producto de alta calidad.',
  },
  {
    id: '2',
    name: 'Botinero',
    price: 25000,
    image: require('../assets/images/botinero.jpg'), 
    description: 'Descripción detallada del producto 2. Ideal para cualquier ocasión.',
  },
  {
    id: '3',
    name: 'Chomba',
    price: 30000,
    image: require('../assets/images/chomba.jpg'), 
    description: 'Descripción detallada del producto 3. Calidad premium garantizada.',
  },
  {
    id: '4',
    name: 'Frenos',
    price: 20000,
    image: require('../assets/images/frenos.jpg'), 
    description: 'Descripción detallada del producto 4. El favorito de nuestros clientes.',
  },
  {
    id: '5',
    name: 'Gorra',
    price: 35000,
    image: require('../assets/images/gorra.jpg'), 
    description: 'Descripción detallada del producto 5. Edición especial limitada.',
  },
  {
    id: '6',
    name: 'Medias',
    price: 18000,
    image: require('../assets/images/medias.jpg'), 
    description: 'Descripción detallada del producto 6. Excelente relación precio-calidad.',
  },
  {
    id: '7',
    name: 'Rodilleras',
    price: 28000,
    image: require('../assets/images/rodilleras.jpg'), 
    description: 'Descripción detallada del producto 7. Innovador diseño y funcionalidad.',
  },
  {
    id: '8',
    name: 'Ruedas',
    price: 22000,
    image: require('../assets/images/ruedas.jpg'), 
    description: 'Descripción detallada del producto 8. La mejor elección para ti.',
  },
];

export default function HomeScreen({ navigation }) {
  
  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { 
      product: product,
      productName: product.name 
    });
  };

  const handleVisitBranch = () => {
    navigation.navigate('BranchLocation'); 
  };

  const renderProduct = ({ item }) => (
    <ProductCard 
      product={item} 
      onPress={() => handleProductPress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>GIO STORE</Text>
        <Text style={styles.subtitle}>Bienvenido al catalogo</Text>
      </View>

      <FlatList
        data={PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity 
        style={styles.branchButton} 
        onPress={handleVisitBranch}
      >
        <Text style={styles.branchButtonText}>📍 Visita Nuestra Sucursal</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#b51414',
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 4,
    opacity: 0.9,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  row: {
    justifyContent: 'space-between',
  },
  branchButton: {
    backgroundColor: '#b51414',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  branchButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
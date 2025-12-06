import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={product.image} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        
        <Text style={styles.price}>
          ${product.price.toLocaleString('es-AR')}
        </Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>Ver Detalle</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    minHeight: 40,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b51414',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#b51414',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
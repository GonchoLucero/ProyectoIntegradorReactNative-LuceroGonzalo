// ProductDetail.jsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';

// Reemplazamos useCart por los hooks y acciones de Redux
import { useDispatch } from 'react-redux'; 
import { addItem } from '../slices/cartSlice';

export default function ProductDetail({ route, navigation }) {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch(); // Usar useDispatch

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Usamos dispatch con el payload: { product: producto, quantity: cantidad }
    dispatch(addItem({ product, quantity })); 
    
    Alert.alert(
      '¡Producto agregado!',
      `${quantity} x ${product.name} agregado al carrito`,
      [
        {
          text: 'Seguir comprando',
          style: 'cancel'
        },
        {
          text: 'Ir al carrito',
          onPress: () => navigation.navigate('Cart')
        }
      ]
    );
  };

  const totalPrice = product.price * quantity;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={product.image} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        
        <Text style={styles.price}>${product.price.toLocaleString('es-AR')}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Descripción:</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.divider} />
        
        {/* Selector de Cantidad */}
        <Text style={styles.sectionTitle}>Cantidad:</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={increaseQuantity}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalPriceText}>${totalPrice.toLocaleString('es-AR')}</Text>
        </View>

        <TouchableOpacity 
          style={styles.addToCartButton} 
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartButtonText}>Añadir al Carrito</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b51414',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    backgroundColor: '#b51414',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 30,
    minWidth: 40,
    textAlign: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPriceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b51414',
  },
  addToCartButton: {
    backgroundColor: '#b51414',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#b51414',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Alert,FlatList,Image,SafeAreaView} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Ionicons } from '@expo/vector-icons'; 

import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, clearCart, removeItem } from '../slices/cartSlice';


export default function Cart({ user, navigation }) {
  
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const dispatch = useDispatch();


  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Cerrar Sesión',
          onPress: async () => {
            try {
              await signOut(auth);
            } catch (error) {
              Alert.alert('Error', 'No se pudo cerrar sesión');
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  const handleRemoveItem = (productId, productName) => {
    Alert.alert(
      'Eliminar producto',
      `¿Quieres eliminar ${productName} del carrito?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          onPress: () => {
            dispatch(removeItem(productId)); 
          },
          style: 'destructive'
        }
      ]
    );
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleClearCart = () => {
    Alert.alert(
      'Vaciar Carrito',
      '¿Estás seguro que deseas eliminar todos los productos del carrito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Vaciar', 
          onPress: () => {
            dispatch(clearCart());
          },
          style: 'destructive'
        }
      ]
    );
  };
  
  const handleCheckout = () => {
    Alert.alert('Comprar', 'Funcionalidad de compra aún no implementada.');
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toLocaleString('es-AR')}</Text>
      </View>
      
      <View style={styles.quantityControl}>
        <TouchableOpacity 
          style={styles.quantityButton} 
          onPress={() => handleDecreaseQuantity(item)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
        <TouchableOpacity 
          style={styles.quantityButton} 
          onPress={() => handleIncreaseQuantity(item)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.removeButton} 
        onPress={() => handleRemoveItem(item.id, item.name)}
      >
        <Ionicons name="trash-bin-outline" size={24} color="#b51414" />
      </TouchableOpacity>
    </View>
  );


  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={[styles.container, styles.emptyContainer]}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Tu Carrito está Vacío</Text>
        <Text style={styles.emptyText}>Parece que aún no has agregado productos. Explora el catálogo para empezar a comprar.</Text>
        <TouchableOpacity 
          style={styles.shopButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.shopButtonText}>Ir al Catálogo</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <View style={styles.userInfo}>
            <Text style={styles.userEmail}>{user?.email || 'Usuario Invitado'}</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={() => (
          <>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Total de Ítems ({totalItems}):</Text>
                <Text style={styles.summaryValue}>${totalAmount.toLocaleString('es-AR')}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
              <Text style={styles.clearButtonText}>Vaciar Carrito</Text>
            </TouchableOpacity>
          </>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.userInfo}>
          <Text style={styles.userEmail}>{user?.email || 'Usuario Invitado'}</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 15,
  },
  // Item del Carrito
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#b51414',
    fontWeight: '600',
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  quantityButton: {
    padding: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b51414',
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 5,
    marginLeft: 10,
  },
  summaryContainer: {
    marginTop: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b51414',
  },
  checkoutButton: {
    backgroundColor: '#b51414',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
  },
  footer: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    maxWidth: '65%',
  },
  logoutText: {
    fontSize: 14,
    color: '#b51414',
    fontWeight: 'bold',
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: '#b51414',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 12,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
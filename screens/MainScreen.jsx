import React from 'react';
import { TouchableOpacity } from 'react-native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; 

// --- PANTALLAS ---
import HomeScreen from './HomeScreen';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import BranchLocationScreen from './BranchLocationScreen'; 

const Stack = createNativeStackNavigator();

export default function ShopNavigator({ user }) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#b51414', 
        },
        headerTintColor: '#ffffff', 
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Catálogo Principal',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={{ marginRight: 10 }} 
            >
              <Ionicons 
                name="cart-outline" 
                size={28} 
                color="#ffffff" 
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({ route }) => ({
          title: route.params?.productName || 'Detalle',
        })}
      />

      <Stack.Screen
        name="Cart"
        options={{ title: 'Mi Carrito' }}
      >
        {props => <Cart {...props} user={user} />}
      </Stack.Screen>

      <Stack.Screen
        name="BranchLocation" 
        component={BranchLocationScreen}
        options={{ title: 'Nuestra Sucursal' }}
      />
      
    </Stack.Navigator>
  );
}
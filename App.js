import React, {useState, useEffect} from 'react'
import { StyleSheet,Text, ActivityIndicator, View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import { store } from './redux/store'; 

import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShopNavigator from './screens/MainScreen'


const Stack = createNativeStackNavigator();

export default function App(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    });

    return () => unsuscribe();
  }, [])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
        <ActivityIndicator size="large" color="#b51414" />
      </View>
    )
  }

  const AuthStack = (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#b51414',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ 
          title: 'Crear Cuenta',
          headerBackTitle: 'Volver'
        }}
      />
    </Stack.Navigator>
  );

  return (
    <Provider store={store}> 
      <View style={styles.container}>
          <NavigationContainer>
            {user ? (
              <ShopNavigator user={user}/>
            ) : (
              AuthStack
            )}
          </NavigationContainer>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  loadingText: {
    fontSize: 18,
    color: '#b51414',
    marginBottom: 10,
  },
});
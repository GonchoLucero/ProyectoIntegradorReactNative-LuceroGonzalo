import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput,
  View, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image
} from 'react-native';

import { auth } from '../firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Por favor, completa ambos campos.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        Alert.alert('Error', 'Usuario no encontrado');
      } else if (err.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Contraseña incorrecta');
      } else if (err.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Email inválido');
      } else if (err.code === 'auth/invalid-credential') {
        Alert.alert('Error', 'Credenciales inválidas');
      } else {
        Alert.alert('Error', 'No se pudo iniciar sesión');
      }
    }
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Image 
            source={require('../assets/images/logogiostore.jpg')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>GIO STORE</Text>
          <Text style={styles.subtitle}>Club Pablo Giorello</Text>
        </View>
        
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail} 
            keyboardType="email-address" 
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry
          />

          <TouchableOpacity 
            style={[styles.button, styles.buttonPrimary]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.buttonSecondary]}
            onPress={goToRegister}
          >
            <Text style={styles.buttonTextSecondary}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#b51414',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.8,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 55,
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonPrimary: {
    backgroundColor: '#b51414',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#b51414',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: '#b51414',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
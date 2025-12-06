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
  Alert
} from 'react-native';

import { auth } from '../firebase'; 
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return; 
    }
    
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signOut(auth);
      
      // Limpiar campos
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      Alert.alert(
        '¡Cuenta creada exitosamente!',
        'Ya puedes iniciar sesión con tu cuenta',
        [
          {
            text: 'Iniciar Sesión',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    } catch (err) {
      // Manejo de errores
      if (err.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'Este email ya existe');
      } else if (err.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Email inválido');
      } else if (err.code === 'auth/weak-password') {
        Alert.alert('Error', 'La contraseña es muy débil');
      } else {
        Alert.alert('Error', 'No se pudo crear la cuenta');
      }
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
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
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Regístrate en GIOSTORE</Text>
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
          
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Contraseña (mínimo 6 caracteres)"
              placeholderTextColor="#999"
              value={password} 
              onChangeText={setPassword} 
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#999"
              value={confirmPassword} 
              onChangeText={setConfirmPassword} 
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Text style={styles.eyeIcon}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.button, styles.buttonPrimary]}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Crear Cuenta</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.buttonSecondary]}
            onPress={goToLogin}
          >
            <Text style={styles.buttonTextSecondary}>Ya tengo cuenta</Text>
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
  passwordContainer: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: '#2a2a2a',
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 20,
    color: '#ffffff',
    fontSize: 16,
  },
  eyeButton: {
    padding: 10,
    paddingRight: 15,
  },
  eyeIcon: {
    fontSize: 24,
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
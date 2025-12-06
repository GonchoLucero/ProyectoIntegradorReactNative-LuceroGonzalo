import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const BRANCH_LOCATION = {
  latitude: -34.6083, 
  longitude: -58.3712, 
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function BranchLocationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nuestra Sucursal</Text>
        <Text style={styles.subtitle}>¡Te esperamos en nuestra tienda física!</Text>
      </View>
      
      <MapView
        style={styles.map}
        initialRegion={BRANCH_LOCATION}
        showsUserLocation={true} 
      >
        <Marker
          coordinate={{
            latitude: BRANCH_LOCATION.latitude,
            longitude: BRANCH_LOCATION.longitude,
          }}
          title="GIO STORE - Sucursal Principal"
          description="Aquí puedes encontrar todos nuestros productos."
          pinColor="#b51414" 
        />
      </MapView>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Direccion: Av. Hipólito Yrigoyen, C1087 Cdad. Autónoma de Buenos Aires</Text>
        <Text style={styles.infoText}>Horario: Lunes a Viernes, 9:00 - 18:00</Text>
      </View>

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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
    marginTop: 4,
  },
  map: {
    flex: 1, 
    width: '100%',
  },
  infoBox: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  }
});
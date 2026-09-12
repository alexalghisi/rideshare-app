import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const pickupCoords = { latitude: 37.78825, longitude: -122.4324 };
const dropoffCoords = { latitude: 37.80825, longitude: -122.4124 };

// Renders an interactive OpenStreetMap via Leaflet inside a WebView. This keeps
// the map key-free and working in Expo Go, where native Google Maps is no longer
// supported. Pickup is drawn in green; the dropoff in red once a destination is set.
function buildMapHtml(hasDropoff) {
  const focus = hasDropoff
    ? `map.fitBounds(L.latLngBounds([pickup, dropoff]), { padding: [72, 72] });`
    : `map.setView(pickup, 15);`;
  const dropoffMarker = hasDropoff
    ? `L.circleMarker(dropoff, { radius: 9, weight: 3, color: '#fff', fillColor: '#FF3B30', fillOpacity: 1 }).addTo(map);`
    : '';

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
      html, body, #map { margin: 0; height: 100%; width: 100%; background: #e8eaed; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
      const pickup = [${pickupCoords.latitude}, ${pickupCoords.longitude}];
      const dropoff = [${dropoffCoords.latitude}, ${dropoffCoords.longitude}];
      const map = L.map('map', { zoomControl: false });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
      L.circleMarker(pickup, { radius: 9, weight: 3, color: '#fff', fillColor: '#00D86F', fillOpacity: 1 }).addTo(map);
      ${dropoffMarker}
      ${focus}
    </script>
  </body>
</html>`;
}

export default function MapScreen({ navigation, route }) {
  const [pickup, setPickup] = useState('Current Location');
  const [dropoff, setDropoff] = useState(route.params?.destination?.name || '');
  const hasDropoff = Boolean(dropoff);
  const mapHtml = useMemo(() => buildMapHtml(hasDropoff), [hasDropoff]);

  const bottomSheetAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(bottomSheetAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }, [bottomSheetAnim]);

  const handleConfirmPickup = () => {
    navigation.navigate('RideOptions', {
      pickup: { name: pickup, coords: pickupCoords },
      dropoff: { name: dropoff, coords: dropoffCoords },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <WebView
        style={styles.map}
        originWhitelist={['*']}
        source={{ html: mapHtml }}
      />

      <SafeAreaView style={styles.topContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchCard}>
          <View style={styles.searchRow}>
            <View style={styles.dotContainer}>
              <View style={styles.greenDot} />
            </View>
            <TextInput
              style={styles.input}
              value={pickup}
              onChangeText={setPickup}
              placeholder="Pickup location"
              placeholderTextColor="#999"
            />
          </View>
          
          <View style={styles.dividerLine} />
          
          <View style={styles.searchRow}>
            <View style={styles.dotContainer}>
              <View style={styles.redDot} />
            </View>
            <TextInput
              style={styles.input}
              value={dropoff}
              onChangeText={setDropoff}
              placeholder="Where to?"
              placeholderTextColor="#999"
            />
          </View>
        </View>
      </SafeAreaView>

      <Animated.View
        style={[
          styles.bottomSheet,
          {
            transform: [
              {
                translateY: bottomSheetAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.handle} />
        
        <View style={styles.bottomContent}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Confirm your location</Text>
              <Text style={styles.infoSubtitle}>
                Make sure your pickup point is accurate
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.confirmButton,
              !dropoff && styles.confirmButtonDisabled,
            ]}
            onPress={handleConfirmPickup}
            disabled={!dropoff}
          >
            <Text style={styles.confirmButtonText}>Confirm Pickup</Text>
          </TouchableOpacity>

          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Suggestions</Text>
            <TouchableOpacity style={styles.suggestionItem}>
              <Text style={styles.suggestionIcon}>📍</Text>
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionName}>Main entrance</Text>
                <Text style={styles.suggestionAddress}>Easier to find</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
  },
  searchCard: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  greenDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00D86F',
  },
  redDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
    marginLeft: 36,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 34,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  bottomContent: {
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  confirmButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  suggestionsContainer: {
    marginTop: 8,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  suggestionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 2,
  },
  suggestionAddress: {
    fontSize: 14,
    color: '#666',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RIDE_OPTIONS = [
  {
    id: '1',
    name: 'RideShare X',
    icon: '🚗',
    time: '3 min',
    price: '$8.50',
    capacity: '4 seats',
    description: 'Affordable everyday rides',
  },
  {
    id: '2',
    name: 'RideShare Comfort',
    icon: '🚙',
    time: '5 min',
    price: '$14.20',
    capacity: '4 seats',
    description: 'Newer cars with extra legroom',
    popular: true,
  },
  {
    id: '3',
    name: 'RideShare XL',
    icon: '🚐',
    time: '7 min',
    price: '$18.90',
    capacity: '6 seats',
    description: 'Room for up to 6 passengers',
  },
  {
    id: '4',
    name: 'RideShare Lux',
    icon: '🚘',
    time: '8 min',
    price: '$32.50',
    capacity: '4 seats',
    description: 'High-end cars with top-rated drivers',
  },
];

export default function RideOptionsScreen({ navigation, route }) {
  const [selectedRide, setSelectedRide] = useState(RIDE_OPTIONS[1].id);
  const [paymentMethod] = useState('**** 4242');

  const selectedRideData = RIDE_OPTIONS.find((r) => r.id === selectedRide);

  const handleBookRide = () => {
    alert('🎉 Ride booked! Your driver will arrive in ' + selectedRideData.time);
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose a ride</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tripInfo}>
        <View style={styles.tripRow}>
          <View style={styles.greenDot} />
          <Text style={styles.tripText} numberOfLines={1}>
            {route.params.pickup.name || 'Current Location'}
          </Text>
        </View>
        <View style={styles.tripDivider} />
        <View style={styles.tripRow}>
          <View style={styles.redDot} />
          <Text style={styles.tripText} numberOfLines={1}>
            {route.params.dropoff.name || 'Destination'}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Available rides</Text>
        
        {RIDE_OPTIONS.map((ride) => (
          <TouchableOpacity
            key={ride.id}
            style={[
              styles.rideCard,
              selectedRide === ride.id && styles.rideCardSelected,
            ]}
            onPress={() => setSelectedRide(ride.id)}
          >
            {ride.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>POPULAR</Text>
              </View>
            )}
            
            <View style={styles.rideContent}>
              <View style={styles.rideLeft}>
                <Text style={styles.rideIcon}>{ride.icon}</Text>
                <View style={styles.rideInfo}>
                  <Text style={styles.rideName}>{ride.name}</Text>
                  <Text style={styles.rideDescription}>{ride.description}</Text>
                  <View style={styles.rideDetails}>
                    <Text style={styles.rideTime}>⏱ {ride.time}</Text>
                    <Text style={styles.rideDot}>•</Text>
                    <Text style={styles.rideCapacity}>{ride.capacity}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.rideRight}>
                <Text style={styles.ridePrice}>{ride.price}</Text>
              </View>
            </View>

            {selectedRide === ride.id && (
              <View style={styles.selectedIndicator}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.promoSection}>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoIcon}>🎫</Text>
            <Text style={styles.promoText}>Add promo code</Text>
            <Text style={styles.promoArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentSection}>
          <TouchableOpacity style={styles.paymentButton}>
            <View style={styles.paymentLeft}>
              <Text style={styles.paymentIcon}>💳</Text>
              <View>
                <Text style={styles.paymentLabel}>Payment</Text>
                <Text style={styles.paymentMethod}>Visa {paymentMethod}</Text>
              </View>
            </View>
            <Text style={styles.paymentArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>{selectedRideData.price}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookRide}>
          <Text style={styles.bookButtonText}>
            Request {selectedRideData.name}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  tripInfo: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 8,
  },
  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00D86F',
    marginRight: 12,
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
    marginRight: 12,
  },
  tripText: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  tripDivider: {
    height: 16,
    width: 2,
    backgroundColor: '#ddd',
    marginLeft: 4,
    marginVertical: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginTop: 20,
    marginBottom: 16,
  },
  rideCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    position: 'relative',
  },
  rideCardSelected: {
    borderColor: '#000',
    backgroundColor: '#fafafa',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 16,
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  popularText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
  },
  rideContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rideLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rideIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  rideInfo: {
    flex: 1,
  },
  rideName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  rideDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  rideDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideTime: {
    fontSize: 12,
    color: '#666',
  },
  rideDot: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 6,
  },
  rideCapacity: {
    fontSize: 12,
    color: '#666',
  },
  rideRight: {
    alignItems: 'flex-end',
  },
  ridePrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  promoSection: {
    marginTop: 24,
    marginBottom: 16,
  },
  promoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  promoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  promoText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  promoArrow: {
    fontSize: 24,
    color: '#999',
  },
  paymentSection: {
    marginBottom: 24,
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  paymentMethod: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  paymentArrow: {
    fontSize: 24,
    color: '#999',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  bookButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapComponent from '../components/MapComponents';
import RideDetailsComponent from '../components/RideDetailsComponent';

const MapScreen = () => {
  //   const { setDriverLocation, setNearbyRideRequests, setRideStatus, driverLocation, nearbyRideRequests, rideStatus } = props;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyRideRequests, setNearbyRideRequests] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [acceptanceStatus, setAcceptanceStatus] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const getLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          getLocation();
          fetchNearbyRideRequests();
        } else {
          console.log('Permission denied');
          showAlert('Location Permission Denied', 'Please enable location services to use this app.');
        }
      } catch (error) {
        console.error('Error requesting location permission:', error);
        showAlert('Error', 'Failed to request location permission.');
      }
    };

    const getLocation = async () => {
      try {
        let location = await Location.getCurrentPositionAsync({});
        if (location) {
          const { latitude, longitude } = location.coords;
          setCurrentLocation({ latitude, longitude });
        } else {
          console.log('Location not available');
        }
      } catch (error) {
        console.error('Error getting location:', error);
        showAlert('Error', 'Failed to get current location. Make sure that location services are enabled.');
      }
    };

    const fetchNearbyRideRequests = async () => {
      try {
        const dummyRideRequests = currentLocation
          ? [
              { id: 1231, name: 'John Wilbert', userId: 'user1', status: 'Pending', pickupLocation: { latitude: currentLocation.latitude + 0.01, longitude: currentLocation.longitude + 0.01 } },
              { id: 552342, name: 'qweng qweng', userId: 'user2', status: 'Pending', pickupLocation: { latitude: currentLocation.latitude - 0.02, longitude: currentLocation.longitude + 0.02 } },
            ]
          : [];

        const initialAcceptanceStatus = dummyRideRequests.reduce((acc, request) => {
          acc[request.id] = { color: 'green', text: 'Accept Ride' };
          return acc;
        }, {});

        setAcceptanceStatus(initialAcceptanceStatus);
        setNearbyRideRequests(dummyRideRequests);
      } catch (error) {
        console.error('Error fetching nearby ride requests:', error);
        showAlert('Error', 'Failed to fetch nearby ride requests. Please try again later.');
      }
    };

    const showAlert = (title, message) => {
      Alert.alert(
        title,
        message,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    };

    getLocationPermission();
  }, [currentLocation]);

  const handleAcceptRide = (rideId) => {
    setAcceptanceStatus((prevStatus) => {
      const currentColor = prevStatus[rideId]?.color || 'red';
      return {
        ...prevStatus,
        [rideId]: {
          color: currentColor === 'red' ? 'green' : 'red',
          text: currentColor === 'red' ? 'Accept Ride' : 'Cancel',
        },
      };
    });

    setButtonClicked(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapComponent
        onSelectRide={(ride) => setSelectedRide(ride)}
        nearbyRideRequests={nearbyRideRequests}
        currentLocation={currentLocation}
      />
      {selectedRide && (
        <RideDetailsComponent
          selectedRide={selectedRide}
          onAcceptRide={handleAcceptRide}
          acceptanceStatus={acceptanceStatus}
          onSelectRide={setSelectedRide}
        />
      )}
    </View>
  );
};

export default MapScreen;
// export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);


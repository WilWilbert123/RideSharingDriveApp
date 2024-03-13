import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const MapComponent = ({ onSelectRide, nearbyRideRequests, currentLocation, selectedRide }) => {
  const handleMarkerPress = (ride) => {
    onSelectRide(ride);
  };

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Driver"
            description="Driver's current location"
          />
          {selectedRide && (
            <Polyline
              coordinates={[
                { latitude: selectedRide.pickupLocation.latitude, longitude: selectedRide.pickupLocation.longitude },
                { latitude: selectedRide.destination.latitude, longitude: selectedRide.destination.longitude },
              ]}
              strokeColor="#000" 
              strokeWidth={6}
            />
          )}
          {nearbyRideRequests.length === 0 ? (
            <Text style={styles.noRideRequestsText}>No nearby ride requests</Text>
          ) : (
            nearbyRideRequests.map((request) => (
              <Marker
                key={request.id}
                coordinate={request.pickupLocation}
                title={`Ride Request #${request.id}`}
                description={`User: ${request.userId}\nStatus: ${request.status}`}
                onPress={() => handleMarkerPress(request)}
              />
            ))
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  noRideRequestsText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MapComponent;

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const RideDetailsComponent = ({ selectedRide, onAcceptRide, acceptanceStatus, onSelectRide }) => {
  return (
    <View style={styles.selectedRideContainer}>
      <TouchableOpacity style={styles.closeIcon} onPress={() => onSelectRide(null)}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>X</Text>
      </TouchableOpacity>
      <Text style={styles.selectedRideText}>Ride Details:</Text>
      {selectedRide && (
        <>
          <Text>Ride Number: {selectedRide.id}</Text>
          <Text>{`User: ${selectedRide.name}`}</Text>
          <Text>Pickup Location:</Text>
          <Text style={{ color: 'red' }}>{`Latitude: ${selectedRide.pickupLocation.latitude}`}</Text>
          <Text style={{ color: 'red' }}>{`Longitude: ${selectedRide.pickupLocation.longitude}`}</Text>
          
          {/* Add destination details */}
          <Text>Destination:</Text>
          <Text style={{ color: 'blue' }}>Latitude: 18.234511</Text>
          <Text style={{ color: 'blue' }}>Longitude: 15.8324411</Text>

          {/* Display pickup time and status */}
          <Text>Pickup Time: 8:30am</Text>
          <Text>Status: {selectedRide.status}</Text>

          <TouchableOpacity
            onPress={() => onAcceptRide(selectedRide.id)}
            style={[styles.acceptButton, { backgroundColor: acceptanceStatus[selectedRide.id]?.color }]}
          >
            <Text style={styles.acceptButtonText}>{acceptanceStatus[selectedRide.id]?.text}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedRideContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
  },
  selectedRideText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  acceptButton: {
    padding: 5,
    borderWidth: 1,
    width: 90,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  acceptButtonText: {
    color: 'white',
  },
  closeIcon: {
    position: 'absolute',
    top: 2,
    right: 8,
    padding: 8,
  },
});

export default RideDetailsComponent;

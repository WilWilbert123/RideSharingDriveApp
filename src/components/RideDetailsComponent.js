import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

const RideDetailsComponent = ({ selectedRide, onAcceptRide, onSelectRide }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAcceptRide = (rideId) => {
    setModalVisible(true);
  };
  const confirmAcceptRide = async () => {
    try {
      // Log each detail of the selected ride
      console.log('Selected Ride ID:', selectedRide.id);
      console.log('User:', selectedRide.name);
      console.log('Pickup Location Latitude:', selectedRide.pickupLocation.latitude);
      console.log('Pickup Location Longitude:', selectedRide.pickupLocation.longitude);
      console.log('Destination Latitude:', selectedRide.destination.latitude);
      console.log('Destination Longitude:', selectedRide.destination.longitude);
      console.log('Pickup Time:', selectedRide.pickupTime);
      console.log('Status:', selectedRide.status);
      
      // Save the entire selected ride object to AsyncStorage
      await AsyncStorage.setItem('acceptedRide', JSON.stringify(selectedRide));
      console.log('Ride request accepted and saved to AsyncStorage.');
    } catch (error) {
      console.error('Error saving ride request to AsyncStorage:', error);
    }
  
    // Execute further actions after saving
    onAcceptRide(selectedRide.id);
    setModalVisible(false);
    onSelectRide(null);
  };
  
  

  const cancelAcceptRide = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.selectedRideContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to accept the ride?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                onPress={confirmAcceptRide}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.declineButton]}
                onPress={cancelAcceptRide}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.closeIcon} onPress={() => onSelectRide(null)}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>X</Text>
      </TouchableOpacity>
      <Text style={styles.selectedRideText}>Ride Details:</Text>
      <>
        <Text>Ride Number: {selectedRide.id}</Text>
        <Text>{`User: ${selectedRide.name}`}</Text>
        <Text>Pickup Location:</Text>
        <Text style={{ color: 'red' }}>{`Latitude: ${selectedRide.pickupLocation.latitude}`}</Text>
        <Text style={{ color: 'red' }}>{`Longitude: ${selectedRide.pickupLocation.longitude}`}</Text>
        
        {/* Display destination details */}
        <Text>Destination:</Text>
        <Text style={{ color: 'blue' }}>{`Latitude: ${selectedRide.destination.latitude}`}</Text>
        <Text style={{ color: 'blue' }}>{`Longitude: ${selectedRide.destination.longitude}`}</Text>

        {/* Display pickup time and status */}
        <Text>Pickup Time: 8:30am</Text>
        <Text>Status: {selectedRide.status}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleAcceptRide(selectedRide.id)}
            style={[styles.button, { backgroundColor: 'green' }]}
          >
            <Text style={styles.buttonText}>Accept Ride</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onSelectRide(null)}
            style={[styles.button, { backgroundColor: 'red' }]}
          >
            <Text style={styles.buttonText}>Decline Ride</Text>
          </TouchableOpacity>
        </View>
      </>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeIcon: {
    position: 'absolute',
    top: 2,
    right: 8,
    padding: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: 'green',
    marginRight: 10,
  },
  declineButton: {
    backgroundColor: 'red',
  },
  
});

export default RideDetailsComponent;

import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const RideDetailsModal = ({ modalVisible, setModalVisible, savedData, showRideDetails, handleRideNumberPress }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {savedData && (
            <>
              <Text style={styles.modalText}>Ride Details:</Text>
              {/* Display ride number as touchable only if ride details are not shown */}
              {!showRideDetails && (
                <TouchableOpacity onPress={handleRideNumberPress}>
                  <Text style={styles.rideNumberText}>Ride Number: {savedData.id}</Text>
                </TouchableOpacity>
              )}
              {/* Display ride details only if ride number is clicked */}
              {showRideDetails && (
                <>
                  <Text>User: {savedData.name}</Text>
                  <Text>Pickup Location Latitude: {savedData.pickupLocation.latitude}</Text>
                  <Text>Pickup Location Longitude: {savedData.pickupLocation.longitude}</Text>
                  <Text>Destination Latitude: {savedData.destination.latitude}</Text>
                  <Text>Destination Longitude: {savedData.destination.longitude}</Text>
                  <Text>Pickup Time: {savedData.pickupTime}</Text>
                  <Text>Status: {savedData.status}</Text>
                </>
              )}
            </>
          )}
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rideNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 10,
  },
  closeModalText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default RideDetailsModal;

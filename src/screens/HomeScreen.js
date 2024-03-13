import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Updated import
import MapScreen from './MapScreen';
import DateTimeDisplay from '../components/DateTimeDisplay';
import RideDetailsModal from '../components/RideDetaulsModal';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [savedData, setSavedData] = useState(null);
  const [showRideDetails, setShowRideDetails] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('acceptedRide'); // Fetch saved ride data
        if (data !== null) {
          setSavedData(JSON.parse(data)); // Parse the JSON data
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  const handleRideRequestPress = () => {
    setModalVisible(true);
    setShowRideDetails(false); // Hide ride details when modal is opened
  };

  const handleRideNumberPress = () => {
    setShowRideDetails(true); // Show ride details when ride number is clicked
  };

  return (
    <View style={styles.container}>
      <MapScreen />
      <View style={styles.topLeftContainer}>
        <TouchableOpacity onPress={handleRideRequestPress}>
          <Text style={styles.rideRequestText}>Ride Request Accepted</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dateTimeContainer}>
        <DateTimeDisplay />
      </View>
      {/* Render the RideDetailsModal component */}
      <RideDetailsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        savedData={savedData}
        showRideDetails={showRideDetails}
        handleRideNumberPress={handleRideNumberPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  topLeftContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  rideRequestText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
  dateTimeContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeScreen;

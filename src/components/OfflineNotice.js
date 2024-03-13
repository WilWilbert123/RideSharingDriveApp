// OfflineNotice.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, BackHandler } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const OfflineNotice = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      setIsModalVisible(!state.isConnected);
    });

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isModalVisible) {
        return true;
      }
      return false;
    });

    return () => {
      unsubscribe();
      backHandler.remove();
    };
  }, [isModalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!isConnected && isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>No Internet Connection</Text>
          <Text style={styles.instructions}>Please enable Wi-Fi or find an internet connection.</Text>
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
    backgroundColor: 'orange',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  instructions: {
    color: 'white',
    textAlign: 'center',
  },
});

export default OfflineNotice;

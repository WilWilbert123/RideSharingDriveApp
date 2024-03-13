import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const DateTimeDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  const getDayOfWeek = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dayText}>{getDayOfWeek(currentDateTime)}</Text>
      <Text style={styles.timeText}>{currentDateTime.toLocaleTimeString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  dayText: {
    color: 'black',
    fontSize: 16,
  },
  timeText: {
    color: 'black',
    fontSize: 16,
  },
});

export default DateTimeDisplay;

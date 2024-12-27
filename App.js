// Sleep Tracker App using React Native
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

const SleepTracker = () => {
  const [sleepEntries, setSleepEntries] = useState([]);
  const [date, setDate] = useState('');
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');

  const calculateDuration = (sleep, wake) => {
    const [sleepHour, sleepMinute] = sleep.split(':').map(Number);
    const [wakeHour, wakeMinute] = wake.split(':').map(Number);

    let totalSleepMinutes =
      wakeHour * 60 + wakeMinute - (sleepHour * 60 + sleepMinute);
    if (totalSleepMinutes < 0) totalSleepMinutes += 24 * 60; // Handle overnight sleep

    const hours = Math.floor(totalSleepMinutes / 60);
    const minutes = totalSleepMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const isValidTimeFormat = (time) => {
    const timePattern = /^([0-1]?\d|2[0-3]):([0-5]?\d)$/;
    return timePattern.test(time);
  };

  const isValidDateFormat = (date) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(date);
  };

  const handleAddEntry = () => {
    if (!date || !sleepTime || !wakeTime) {
      alert('Please fill all fields');
      return;
    }

    if (!isValidDateFormat(date)) {
      alert('Invalid date format. Use YYYY-MM-DD.');
      return;
    }

    if (!isValidTimeFormat(sleepTime) || !isValidTimeFormat(wakeTime)) {
      alert('Invalid time format. Use HH:MM.');
      return;
    }

    const duration = calculateDuration(sleepTime, wakeTime);
    const newEntry = {
      id: Math.random().toString(),
      date,
      sleepTime,
      wakeTime,
      duration,
    };

    setSleepEntries([...sleepEntries, newEntry]);
    setDate('');
    setSleepTime('');
    setWakeTime('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Tracker</Text>

      <TextInput
        style={styles.input}
        placeholder='Date (e.g., 2024-12-21)'
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder='Sleep Time (HH:MM)'
        value={sleepTime}
        onChangeText={setSleepTime}
        keyboardType='numeric'
      />

      <TextInput
        style={styles.input}
        placeholder='Wake Time (HH:MM)'
        value={wakeTime}
        onChangeText={setWakeTime}
        keyboardType='numeric'
      />

      <Button title='Add Entry' onPress={handleAddEntry} />

      <FlatList
        data={sleepEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text style={styles.entryText}>Date: {item.date}</Text>
            <Text style={styles.entryText}>Sleep Time: {item.sleepTime}</Text>
            <Text style={styles.entryText}>Wake Time: {item.wakeTime}</Text>
            <Text style={styles.entryText}>Duration: {item.duration}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  entry: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  entryText: {
    fontSize: 16,
  },
});

export default SleepTracker;

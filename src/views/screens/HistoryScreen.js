import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSessionHistory } from '../../controllers/SessionController';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../components/Header';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { isDarkMode } = useTheme();

  const fetchHistory = async () => {
    const data = await getSessionHistory();
    setHistory(data.reverse());
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHistory();
    setRefreshing(false);
  };

  const handleClear = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all meditation history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            await AsyncStorage.removeItem('meditation_history');

            
            setTimeout(() => {
              setHistory([]);
            }, 100);
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, isDarkMode && styles.darkItem]}>
      <Text style={[styles.date, isDarkMode && styles.darkText]}>
        🕒 {item.date}
      </Text>
      <Text style={[styles.user, isDarkMode && styles.darkText]}>
        👤 {item.username}
      </Text>
      <Text style={[styles.duration, isDarkMode && styles.darkText]}>
        Duration: {item.duration}
      </Text>
      <Text
        style={[
          styles.status,
          { color: item.completed ? '#4EB8A0' : '#FF6B6B' },
        ]}
      >
        {item.completed ? '✅ Completed' : '❌ Incomplete'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#121212' : '#4EB8A0' }
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#121212' : '#4EB8A0'}
      />

      <Header title="Meditation History" />

      <View style={[
        styles.contentContainer,
        { backgroundColor: isDarkMode ? '#121212' : '#fff' }
      ]}>
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: 120,
            paddingTop: 10,
            flexGrow: 1,
          }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, alignItems: 'center', paddingTop: 50 }}>
              <Text style={{ color: isDarkMode ? '#fff' : '#333', fontSize: 16 }}>
                Start your first meditation to see it here!
              </Text>
            </View>
          )}
        />

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[styles.clearButton, isDarkMode && styles.darkClearButton]}
            onPress={handleClear}
          >
            <Text style={styles.clearButtonText}>🗑️ Clear History</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  darkItem: {
    backgroundColor: '#2a2a2a',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  user: {
    fontSize: 14,
    marginTop: 4,
    color: '#333',
  },
  duration: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
  status: {
    fontSize: 14,
    marginTop: 6,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#fff',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#4EB8A0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  darkClearButton: {
    backgroundColor: '#4EB8A0',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoryScreen;

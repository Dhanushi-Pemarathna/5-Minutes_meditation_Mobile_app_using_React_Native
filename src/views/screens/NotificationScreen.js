import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotificationScreen = () => {
  const { isDarkMode } = useTheme();

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Time for your morning meditation',
      message: 'You scheduled a session for this time.',
      time: '10 min ago',
      read: false,
      icon: 'notifications'
    },
    {
      id: '2',
      title: '7-day streak!',
      message: "You've meditated 7 days in a row.",
      time: '1 hour ago',
      read: true,
      icon: 'star'
    },
    {
      id: '3',
      title: 'Breathing Tip',
      message: 'Try the 4-7-8 technique today.',
      time: '3 hours ago',
      read: true,
      icon: 'lightbulb-outline'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        {
          backgroundColor: item.read
            ? (isDarkMode ? '#1E1E1E' : '#F8F8F8')
            : (isDarkMode ? '#2A2A2A' : '#E8F5E9'),
        }
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <Icon name={item.icon} size={24} color="#4EB8A0" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
        <Text style={[styles.message, { color: isDarkMode ? '#aaa' : '#555' }]}>{item.message}</Text>
        <Text style={[styles.time, { color: isDarkMode ? '#777' : '#999' }]}>{item.time}</Text>
      </View>
    </TouchableOpacity>
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

      <Header title="Notifications" />

      <View style={[
        styles.contentContainer,
        { backgroundColor: isDarkMode ? '#121212' : '#fff' }
      ]}>
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="notifications-off" size={50} color={isDarkMode ? '#888' : '#999'} />
            <Text style={[styles.emptyText, { color: isDarkMode ? '#fff' : '#333' }]}>
              No notifications
            </Text>
            <Text style={[styles.emptySub, { color: isDarkMode ? '#aaa' : '#777' }]}>
              We'll notify you when there's something new
            </Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )}
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
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  icon: {
    marginRight: 12,
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySub: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default NotificationScreen;

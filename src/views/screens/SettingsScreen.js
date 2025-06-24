import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Switch,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = ({ navigation }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [notificationSounds, setNotificationSounds] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(false);
  const [vibration, setVibration] = useState(false);

  const settingGroups = [
    {
      title: "Appearance",
      settings: [
        {
          name: "Dark Mode",
          icon: "brightness-4",
          value: isDarkMode,
          action: toggleTheme,
          description: "Switch between light and dark theme"
        }
      ]
    },
    {
      title: "Notifications",
      settings: [
        {
          name: "Notification Sounds",
          icon: "volume-up",
          value: notificationSounds,
          action: () => setNotificationSounds(!notificationSounds),
          description: "Enable sounds for notifications"
        },
        {
          name: "Vibration",
          icon: "vibration",
          value: vibration,
          action: () => setVibration(!vibration),
          description: "Vibrate for notifications"
        },
        {
          name: "Daily Reminders",
          icon: "notifications",
          value: dailyReminders,
          action: () => setDailyReminders(!dailyReminders),
          description: "Receive daily meditation reminders"
        }
      ]
    }
  ];

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#121212' : '#4EB8A0' }
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#121212' : '#4EB8A0'}
      />
      
      <Header title="Settings" showBackButton={false} />
      
      <ScrollView contentContainerStyle={[
        styles.contentContainer,
        { backgroundColor: isDarkMode ? '#121212' : '#fff' }
      ]}>
        {settingGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.groupContainer}>
            <Text style={[styles.groupTitle, isDarkMode && styles.darkText]}>
              {group.title}
            </Text>
            
            {group.settings.map((setting, settingIndex) => (
              <View 
                key={settingIndex}
                style={[
                  styles.settingItem,
                  isDarkMode && styles.darkItem,
                  settingIndex === group.settings.length - 1 && { borderBottomWidth: 0 }
                ]}
              >
                <View style={styles.settingInfo}>
                  <Icon 
                    name={setting.icon} 
                    size={24} 
                    color={isDarkMode ? '#4EB8A0' : '#4EB8A0'} 
                    style={styles.icon}
                  />
                  <View>
                    <Text style={[styles.label, isDarkMode && styles.darkText]}>
                      {setting.name}
                    </Text>
                    <Text style={[styles.description, isDarkMode && styles.darkSubText]}>
                      {setting.description}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={setting.value}
                  onValueChange={setting.action}
                  trackColor={{ false: '#767577', true: '#4EB8A0' }}
                  thumbColor="#fff"
                />
              </View>
            ))}
          </View>
        ))}

        <TouchableOpacity 
          style={[styles.button, isDarkMode && styles.darkButton]}
          onPress={() => navigation.navigate('Help')}
        >
          <Text style={[styles.buttonText, isDarkMode && styles.darkText]}>
            Help & Support
          </Text>
          <Icon 
            name="chevron-right" 
            size={24} 
            color={isDarkMode ? '#fff' : '#4EB8A0'} 
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    padding: 15,
    paddingBottom: 30,
  },
  groupContainer: {
    marginBottom: 10,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4EB8A0',
    marginBottom: 10,
    marginLeft: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  darkItem: {
    borderBottomColor: '#333',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 15,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 3,
  },
  description: {
    fontSize: 13,
    color: '#666',
  },
  darkText: {
    color: '#fff',
  },
  darkSubText: {
    color: '#aaa',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
  },
  darkButton: {
    backgroundColor: '#2A2A2A',
  },
  buttonText: {
    fontSize: 16,
    color: '#4EB8A0',
    fontWeight: '500',
  }
});

export default SettingsScreen;
import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { saveSession } from '../../controllers/SessionController';
import { formatSeconds } from '../../utils/timeFormatter';
import { useTheme } from '../../contexts/ThemeContext';
import BreathingCircle from '../../views/components/BreathingCircle';
import { Audio } from 'expo-av';
import Header from '../../views/components/Header';

const soundMap = {
  start: require('../../assets/sounds/start.mp3'),
  end: require('../../assets/sounds/end.mp3'),
};

const TOTAL_TIME = 300;

const meditationGuide = [
  "1. Find a quiet and comfortable place to sit",
  "2. Close your eyes and take a few deep breaths",
  "3. Focus on your natural breathing pattern",
  "4. When your mind wanders, gently return focus to your breath",
  "5. Start with short sessions and gradually increase duration",
  "6. Be patient with yourself - meditation is a practice",
  "7. Try to meditate at the same time each day",
  "8. Use the breathing circle as your visual guide",
  "9. Don't judge your thoughts - just observe them",
  "10. Finish your session by gradually returning to awareness"
];

const HomeScreen = ({ route }) => {
  const { username = 'Guest' } = route?.params || {};
  const { isDarkMode } = useTheme();

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [running, setRunning] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  const playSound = async (key) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundMap[key]);
      await sound.playAsync();
    } catch (error) {
      console.log('Sound error:', error);
    }
  };

  const startMeditation = () => {
    playSound('start');
    startTimeRef.current = Date.now();
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopMeditation(true);
          return TOTAL_TIME;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopMeditation = async (completed = false) => {
    clearInterval(intervalRef.current);
    setRunning(false);

    if (!startTimeRef.current) {
      Alert.alert('Oops!', 'Meditation session was not started properly.');
      console.warn('Missing startTime, not saving session');
      return;
    }

    const endTime = startTimeRef.current + (completed
      ? TOTAL_TIME * 1000
      : (TOTAL_TIME - timeLeft) * 1000);

    const actualDuration = completed ? TOTAL_TIME : TOTAL_TIME - timeLeft;

    if (completed) {
      await playSound('end');
    }

    await saveSession({
      username,
      startTime: startTimeRef.current,
      endTime,
      completed,
    });

    setTimeLeft(TOTAL_TIME);
    startTimeRef.current = null;

    Alert.alert(
      'Session saved',
      `Meditation session of ${formatSeconds(actualDuration)} recorded`
    );
  };

  const toggleGuide = () => {
    setShowGuide(!showGuide);
  };

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#121212' : '#4EB8A0' }
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#121212' : '#4EB8A0'}
      />

      <View style={styles.headerContainer}>
        <Header title="Breathe5" showBackButton={false} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[
          styles.contentContainer,
          { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }
        ]}>
          <Text style={[styles.greet, isDarkMode && styles.darkText]}>
            Hi, {username}!
          </Text>

          <View style={styles.circleWrapper}>
            <BreathingCircle />
          </View>

          <Text style={[styles.timer, isDarkMode && styles.darkText]}>
            {formatSeconds(timeLeft)}
          </Text>

          {!running && (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#4EB8A0' }]}
              onPress={startMeditation}
            >
              <Text style={styles.buttonText}>Start Meditation</Text>
            </TouchableOpacity>
          )}

          {running && (
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isDarkMode ? '#FF8888' : '#FF6B6B' },
              ]}
              onPress={() => stopMeditation(false)}
            >
              <Text style={styles.buttonText}>Stop Meditation</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.guideButton, isDarkMode && styles.darkGuideButton]}
            onPress={toggleGuide}
          >
            <Text style={[styles.guideButtonText, isDarkMode && styles.darkText]}>
              {showGuide ? 'Hide Guide' : 'Show Meditation Guide'}
            </Text>
          </TouchableOpacity>

          {showGuide && (
            <View style={styles.guideContainer}>
              <Text style={[styles.guideTitle, isDarkMode && styles.darkText]}>
                Meditation Guide
              </Text>
              {meditationGuide.map((item, index) => (
                <Text 
                  key={index} 
                  style={[styles.guideItem, isDarkMode && styles.darkText]}
                >
                  {item}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  greet: {
    fontSize: 24,
    marginBottom: 60,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  circleWrapper: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 48,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  guideButton: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#4EB8A0',
    borderRadius: 8,
  },
  darkGuideButton: {
    borderColor: '#fff',
  },
  guideButtonText: {
    fontSize: 16,
    color: '#4EB8A0',
    textAlign: 'center',
  },
  guideContainer: {
    marginTop: 20,
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(78, 184, 160, 0.1)',
    borderRadius: 10,
  },
  guideTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  guideItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
});

export default HomeScreen;

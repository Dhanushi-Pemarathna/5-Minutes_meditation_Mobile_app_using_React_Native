import AsyncStorage from '@react-native-async-storage/async-storage';
import Session from '../models/Session.js'; 

export const saveSession = async ({ username, startTime, endTime, completed }) => {
  if (!startTime || !endTime) {
    console.error('Missing startTime or endTime');
    return;
  }


  const session = new Session({ username, startTime, endTime, completed });
  const newSession = session.toStorageObject();

  const history = JSON.parse(await AsyncStorage.getItem('meditation_history')) || [];
  history.push(newSession);
  await AsyncStorage.setItem('meditation_history', JSON.stringify(history));
};

export const getSessionHistory = async () => {
  return JSON.parse(await AsyncStorage.getItem('meditation_history')) || [];
};

export const clearSessionHistory = async () => {
  try {
    await AsyncStorage.removeItem('meditation_history');
  } catch (error) {
    console.error('Error clearing session history:', error);
  }
};

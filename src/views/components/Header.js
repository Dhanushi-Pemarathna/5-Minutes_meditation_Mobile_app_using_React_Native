import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, showBackButton = true, centerTitle = false }) => {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[
      styles.header, 
      { backgroundColor: isDarkMode ? '#121212' : '#4EB8A0' }
    ]}>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      )}
      <Text style={[
        styles.headerTitle,
        centerTitle && styles.centeredTitle
      ]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  centeredTitle: {
    flex: 1,
    textAlign: 'center',
    marginRight: 34, 
  },
});

export default Header;
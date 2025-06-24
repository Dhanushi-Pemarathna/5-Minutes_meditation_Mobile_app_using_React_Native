import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  ScrollView,
  Linking,
  TouchableOpacity
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HelpScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();

  const faqs = [
    {
      question: "How do I start meditating?",
      answer: "Begin with short 5-minute sessions and gradually increase the duration."
    },
    {
      question: "Can I meditate without guidance?",
      answer: "Yes, but guided meditations are recommended for beginners."
    },
  ];

  const helpItems = [
    {
      title: "Contact Support",
      icon: "email",
      action: () => Linking.openURL('mailto:support@meditationapp.com')
    },
    {
      title: "App Version",
      icon: "info-outline",
      description: "1.0.0",
      action: null
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
      
      <Header title="Help & Support" />
      
      <View style={[
        styles.contentContainer,
        { backgroundColor: isDarkMode ? '#121212' : '#fff' }
      ]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* FAQs Section */}
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
            Frequently Asked Questions
          </Text>
          {faqs.map((faq, index) => (
            <View key={`faq-${index}`} style={styles.faqItem}>
              <Text style={[styles.question, isDarkMode && styles.darkText]}>
                {faq.question}
              </Text>
              <Text style={[styles.answer, isDarkMode && styles.darkSubText]}>
                {faq.answer}
              </Text>
            </View>
          ))}

          {/* Other Help Items */}
          {helpItems.map((item, index) => (
            <TouchableOpacity
              key={`help-${index}`}
              style={[
                styles.helpItem,
                isDarkMode && styles.darkItem,
              ]}
              onPress={item.action}
              disabled={!item.action}
            >
              <View style={styles.helpItemContent}>
                <Icon 
                  name={item.icon} 
                  size={24} 
                  color={isDarkMode ? '#4EB8A0' : '#4EB8A0'} 
                  style={styles.icon}
                />
                <Text style={[styles.helpTitle, isDarkMode && styles.darkText]}>
                  {item.title}
                </Text>
              </View>
              {item.description ? (
                <Text style={[styles.helpDescription, isDarkMode && styles.darkSubText]}>
                  {item.description}
                </Text>
              ) : (
                <Icon 
                  name="chevron-right" 
                  size={24} 
                  color={isDarkMode ? '#fff' : '#4EB8A0'} 
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4EB8A0',
    marginBottom: 15,
    marginTop: 10,
  },
  faqItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  answer: {
    fontSize: 14,
    color: '#666',
  },
  helpItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },
  darkItem: {
    borderBottomColor: '#333',
  },
  helpItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  helpTitle: {
    fontSize: 16,
    color: '#000',
  },
  helpDescription: {
    fontSize: 14,
    color: '#666',
  },
  darkText: {
    color: '#fff',
  },
  darkSubText: {
    color: '#aaa',
  },
});

export default HelpScreen;
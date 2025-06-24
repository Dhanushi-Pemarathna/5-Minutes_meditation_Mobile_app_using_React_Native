import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  RefreshControl, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { getSessionHistory } from '../../controllers/SessionController';
import Header from '../components/Header';

const InsightScreen = () => {
  const { isDarkMode } = useTheme();
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [longestSession, setLongestSession] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [sessionHistory, setSessionHistory] = useState([]);

  const loadInsights = async () => {
    const history = await getSessionHistory();
    setSessionHistory(history || []);
    const completed = (history || []).filter(session => session.completed);

    const totalMins = completed.reduce((sum, session) => {
      const [minStr] = session.duration?.split(':') || ['0'];
      const mins = parseInt(minStr);
      return sum + (isNaN(mins) ? 0 : mins);
    }, 0);

    const longest = completed.reduce((max, session) => {
      const [minStr] = session.duration?.split(':') || ['0'];
      const mins = parseInt(minStr);
      return mins > max ? mins : max;
    }, 0);

    const today = new Date();
    const streak = completed.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate >= new Date(today.setDate(today.getDate() - 1));
    }).length;

    setCompletedSessions(completed.length);
    setTotalMinutes(totalMins);
    setLongestSession(longest);
    setCurrentStreak(streak);
  };

  useEffect(() => {
    loadInsights();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadInsights().then(() => setRefreshing(false));
  }, []);

  const achievements = useMemo(() => [
    { id: 1, name: 'First Session', unlocked: completedSessions >= 1, icon: '🥇' },
    { id: 2, name: '5 Sessions', unlocked: completedSessions >= 5, icon: '🏆' },
    { id: 3, name: '10 Sessions', unlocked: completedSessions >= 10, icon: '🔟' },
    { id: 4, name: '30 Minutes', unlocked: totalMinutes >= 30, icon: '⏳' },
    { id: 5, name: '1 Hour', unlocked: totalMinutes >= 60, icon: '⏰' },
    { id: 6, name: '3-Day Streak', unlocked: currentStreak >= 3, icon: '🔥' },
  ], [completedSessions, totalMinutes, currentStreak]);

  const getRecommendation = () => {
    if (completedSessions === 0) return "Try starting with a 5-minute session today!";
    if (totalMinutes < 30) return "Aim for 30 total minutes this week!";
    if (currentStreak === 0) return "Try meditating today to start a new streak!";
    if (longestSession < 10) return "Great job! Consider trying a longer session today.";
    return "You're doing amazing! Keep up the consistency!";
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
      
      <Header title="Insights" />
      
      <View style={[
        styles.contentContainer, 
        { backgroundColor: isDarkMode ? '#121212' : '#fff' }
      ]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              tintColor={isDarkMode ? '#fff' : '#4EB8A0'}
            />
          }
        >
          <View style={styles.centerContainer}>
            <View style={[
              styles.card, 
              { backgroundColor: isDarkMode ? '#2a2a2a' : '#F0F4F8' }
            ]}>
              <Text style={[styles.cardHeader, { color: isDarkMode ? '#fff' : '#4EB8A0' }]}>
                📊 Your Meditation Journey
              </Text>
              
              <View style={styles.metricsGrid}>
                <View style={styles.metricTile}>
                  <Text style={[styles.metricValueLarge, { color: '#4EB8A0' }]}>
                    {completedSessions}
                  </Text>
                  <Text style={[styles.metricLabelSmall, { color: isDarkMode ? '#aaa' : '#666' }]}>
                    Sessions
                  </Text>
                </View>
                
                <View style={styles.metricTile}>
                  <Text style={[styles.metricValueLarge, { color: '#4EB8A0' }]}>
                    {totalMinutes}
                  </Text>
                  <Text style={[styles.metricLabelSmall, { color: isDarkMode ? '#aaa' : '#666' }]}>
                    Total Minutes
                  </Text>
                </View>
                
                <View style={styles.metricTile}>
                  <Text style={[styles.metricValueLarge, { color: '#4EB8A0' }]}>
                    {longestSession}
                  </Text>
                  <Text style={[styles.metricLabelSmall, { color: isDarkMode ? '#aaa' : '#666' }]}>
                    Longest (min)
                  </Text>
                </View>
                
                <View style={styles.metricTile}>
                  <Text style={[styles.metricValueLarge, { color: '#4EB8A0' }]}>
                    {currentStreak}
                  </Text>
                  <Text style={[styles.metricLabelSmall, { color: isDarkMode ? '#aaa' : '#666' }]}>
                    Day Streak
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.achievementsSection}>
                <Text style={[styles.sectionHeader, { color: isDarkMode ? '#fff' : '#4EB8A0' }]}>
                  Your Achievements
                </Text>
                <View style={styles.achievementsGrid}>
                  {achievements.map(achievement => (
                    <View 
                      key={achievement.id} 
                      style={[
                        styles.achievementBadge,
                        { 
                          opacity: achievement.unlocked ? 1 : 0.4,
                          backgroundColor: isDarkMode ? '#333' : 'rgba(78, 184, 160, 0.1)'
                        }
                      ]}
                    >
                      <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                      <Text style={[styles.achievementName, { color: isDarkMode ? '#fff' : '#333' }]}>
                        {achievement.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.recommendationCard}>
                <Text style={[styles.recommendationText, { color: isDarkMode ? '#fff' : '#4EB8A0' }]}>
                  {getRecommendation()}
                </Text>
              </View>

              <Text style={[styles.quote, { color: isDarkMode ? '#aaa' : '#888' }]}>
                "You should sit in meditation for twenty minutes every day - 
                unless you're too busy, then you should sit for an hour."
              </Text>
            </View>
          </View>
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
    flexGrow: 1,
    paddingVertical: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricTile: {
    width: '48%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(78, 184, 160, 0.1)',
    marginBottom: 12,
    alignItems: 'center',
  },
  metricValueLarge: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  metricLabelSmall: {
    fontSize: 14,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  achievementsSection: {
    marginTop: 10,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementBadge: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
  },
  achievementIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  achievementName: {
    fontSize: 12,
    textAlign: 'center',
  },
  recommendationCard: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(78, 184, 160, 0.1)',
    marginTop: 20,
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  quote: {
    marginTop: 10,
    fontStyle: 'italic',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default InsightScreen;

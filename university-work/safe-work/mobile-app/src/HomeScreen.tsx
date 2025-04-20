/**
 * HomeScreen.tsx
 *
 * This screen displays the user's daily work clearance status based on their health check responses.
 * It also shows the latest policy updates, and links to relevant alerts. The screen supports dark mode and custom font sizes.
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles/homeStyleSheet';
import TopPanel from './TopPanel';
import useThemeStore from '../lib/themeStore';
import { lightTheme, darkTheme, fontSizes } from './themes';

import { useRouter } from 'expo-router';

import homeIconLight from '../assets/images/panel/homeTopPanel.png'
import homeIconDark from '../assets/images/panel/darkMode/homeDarkMode.png';

import useSymptomAnswers from '../lib/symptomCheckAnswers';

// List of questions that determine work clearance
const criticalQuestions = [
  "Do you have a fever/chills?",
  "Are you experiencing shortness of breath or difficulty breathing?",
  "Have you recently lost your sense of taste or smell?",
  "Have you been in close contact with anyone who has tested positive for a contagious illness in the past 7 days?"
];

/**
 * Determines the user's work clearance status based on their health check answers.
 *
 * If the user has answered all critical questions and any of them indicate a risk,
 * the user is "Not Cleared". If the user has not completed the health check, the
 * status is "Incomplete". Otherwise, the user is "Cleared".
 *
 * @param answers - the user's health check answers
 * @returns the user's work clearance status
 */
const getClearanceStatus = (answers: Record<string, boolean | null>) => {
  if (Object.keys(answers).length === 0) return 'Incomplete';

  for (let q of criticalQuestions) {
    if (answers[q] === true) return 'Not Cleared';
  }

  return 'Cleared';
};

/**
 * HomeScreen component.
 *
 * Main functional component for rendering the Home screen.
 *
 * @returns {React.ReactElement} A React element representing the Home screen.
 */

export default function HomeScreen() {
  const router = useRouter();

  // Accessibility features (dark mode, font size etc)
  const { isDarkMode, fontSize } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const homeIcon = isDarkMode ? homeIconDark : homeIconLight;

  // Symptom checker responses from global store
  const { answers } = useSymptomAnswers();
  const clearanceStatus = getClearanceStatus(answers);

  // Text and emoji to show based on clearance status
  const statusText = {
    'Cleared': "You're fit to come into work today!",
    'Not Cleared': "Please work from home and self-isolate.",
    'Incomplete': "Please complete the symptom checker to determine clearance."
  };

  const statusEmoji = {
    'Cleared': '✅',
    'Not Cleared': '❌',
    'Incomplete': '‼️ '
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TopPanel centerImage={homeIcon} />
      <View>
        <Text style={[styles.sectionTitle, { color: theme.text, fontSize: fontSizes[fontSize] }]}>
          Work Clearance Status
        </Text>
        <View style={[
          styles.statusBox,
          clearanceStatus === 'Not Cleared' && styles.notClearedBox,
          { backgroundColor: theme.card }
        ]}>
          <Text style={[styles.statusEmoji, { color: theme.text, fontSize: fontSizes[fontSize] }]}>{statusEmoji[clearanceStatus]}</Text>
          <Text style={[styles.statusText, { color: theme.text, fontSize: fontSizes[fontSize] }]}>
            {statusText[clearanceStatus]}
          </Text>
        </View>
      </View>

      <Text style={[styles.keyLabel, { color: theme.text }]}>Key:</Text>
      <Text style={{ color: theme.text }}>✅ - Cleared for work</Text>
      <Text style={{ color: theme.text }}>❌ - Not Cleared</Text>
      <Text style={{ color: theme.text }}>‼️ - Incomplete</Text>

      <View style={styles.divider} />

      {/* Latest Policies Section */}
      <Text style={[styles.sectionTitle, { color: theme.text, fontSize: fontSizes[fontSize] }]}>
        Newest Policy Updates
      </Text>

      {/* Each policy navigates to Alerts tab, expanding the related item */}
      <TouchableOpacity onPress={() => router.push({ pathname: '/alerts', params: { title: 'Fitness to Work Policy' } })}>
        <View style={[styles.policyCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text, fontSize: fontSizes[fontSize] }]}>
            Fitness for Work Policy
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push({ pathname: '/alerts', params: { title: 'Confidentiality Policy' } })}>
        <View style={[styles.policyCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text, fontSize: fontSizes[fontSize] }]}>
            Confidentiality Policy
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push({ pathname: '/alerts', params: { title: 'New Health & Safety Policy' } })}>
        <View style={[styles.policyCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text, fontSize: fontSizes[fontSize] }]}>
            New Health & Safety Policy
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
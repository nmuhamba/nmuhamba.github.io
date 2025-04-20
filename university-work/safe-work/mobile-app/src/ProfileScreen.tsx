/**
 * ProfileScreen.tsx
 * 
 * Displays the user's profile information, including their name, role, and clearance status
 * based on their symptom checker answers. It fetches user data from secure storage on load,
 * and displays it in a styled view. Users can log out, which redirects them to the login screen.
 * Supports dark mode themes and custom font sizes.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles/profileStyleSheet';
import TopPanel from './TopPanel';

// Light and dark theme images for the top panel
import profileIconLight from '../assets/images/panel/profileTopPanel.png'; 
import profileIconDark from '../assets/images/panel/darkMode/profileDarkMode.png'; 

import useThemeStore from '../lib/themeStore';
import { lightTheme, darkTheme, fontSizes } from './themes';
import useSymptomAnswers from '../lib/symptomCheckAnswers';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

/**
 * ProfileScreen component.
 * 
 * Main functional component for rendering the profile screen.
 * 
 * @returns {React.ReactElement} A visual representation of the user's profile and health clearance status.
 */

export default function ProfileScreen() {
  // Accessibility features (dark mode, font size etc)
  const { isDarkMode, fontSize } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const profileIcon = isDarkMode ? profileIconDark : profileIconLight;

  // Symptom checker responses from global store
  const { answers } = useSymptomAnswers();
  const router = useRouter();

  const [fullName, setFullName] = useState('Loading...');
  const [role, setRole] = useState('Fetching...');
  
  /**
  * Load user data (name and role) from secure storage when the screen mounts
  */
  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedEmail = await SecureStore.getItemAsync('userEmail');
      if (storedEmail) {
        const userKey = `user_${storedEmail.toLowerCase().replace(/[@.]/g, '_')}`;
        const userData = await SecureStore.getItemAsync(userKey);
        if (userData) {
          const parsed = JSON.parse(userData);
          setFullName(parsed.fullName || 'Unknown User');
          setRole(parsed.role || 'N/A');
        }
      }
    };

    fetchUserInfo();
  }, []);

  const lastCheckDate = new Date().toLocaleDateString();

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

  const clearanceStatus = getClearanceStatus(answers);

  /**
   * Logs the user out of the app and navigates to the login screen.
   */
  const logOut = () => {
    router.push('/login');
    alert('You have been successfully logged out.');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TopPanel centerImage={profileIcon} />

      {/* Profile Summary */}
      <View style={styles.profileContainer}>
        <Image source={profileIcon} style={styles.profileImage} />
        <Text style={[styles.nameText, { color: theme.text, fontSize: fontSizes[fontSize] }]}>{fullName}</Text>
        <Text style={[styles.titleText, { color: theme.text, fontSize: fontSizes[fontSize] }]}>{role}</Text>
      </View>

      {/* Clearance Information */}
      <View style={styles.statusSection}>
        <TouchableOpacity style={[styles.statusCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardLabel, { color: theme.text, fontSize: fontSizes[fontSize] }]}>Clearance Status</Text>
          <Text style={[styles.cardValue, { color: theme.text, fontSize: fontSizes[fontSize] }]}>{clearanceStatus}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.statusCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardLabel, { color: theme.text, fontSize: fontSizes[fontSize] }]}>Last Check Date</Text>
          <Text style={[styles.cardValue, { color: theme.text, fontSize: fontSizes[fontSize] }]}>{lastCheckDate}</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
        <Text style={[styles.logoutButtonText, {fontSize: fontSizes[fontSize]}]}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
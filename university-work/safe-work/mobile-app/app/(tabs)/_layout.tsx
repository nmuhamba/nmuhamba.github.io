/**
 * Tab Layout
 * 
 * This file defines the bottom tab navigation layout for the SafeWork mobile app using Expo Router's <Tabs> component.
 * It configures navigation between four main app screens: Home, Alerts, Check Symptoms, and Profile.
 *
 * Features:
 * - Dynamic icon switching between light and dark mode based on the theme state using Zustand.
 * - Tab bar styling that adapts to the current theme (background color, no top border).
 * - Uses locally stored icon assets for each tab, including dark mode variations.
 * - Hides the default header on all screens for a cleaner mobile look.
 *
 * Screens (Tabs):
 * - Home (`name="index"`) — Displays the main dashboard with clearance status and policy updates.
 * - Alerts (`name="alerts"`) — Shows recent policy and health alerts.
 * - Check Symptoms (`name="checkSymptoms"`) — Allows users to complete a daily health check questionnaire.
 * - Profile (`name="profile"`) — Displays user details and health clearance status.
 *
 * This layout is part of the Expo Router's file-based routing system and lives in the `(tabs)` directory.
 */

import { Tabs } from 'expo-router';
import { Image } from 'react-native';

import useThemeStore from '../../lib/themeStore';
import { lightTheme, darkTheme } from '../../src/themes';

export default function TabLayout() {

  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const homeIcon = isDarkMode
    ? require('../../assets/images/tabs/darkMode/homeDarkMode.png') 
    : require('../../assets/images/tabs/homeTab.png');

  const alertsIcon = isDarkMode
    ? require('../../assets/images/tabs/darkMode/alertsDarkMode.png') 
    : require('../../assets/images/tabs/alertsTab.png');

  const symptomsIcon = isDarkMode
    ? require('../../assets/images/tabs/darkMode/symptomCheckDarkMode.png') 
    : require('../../assets/images/tabs/symptomCheckTab.png'); 

  const profileIcon = isDarkMode
    ? require('../../assets/images/tabs/darkMode/profileDarkMode.png') 
    : require('../../assets/images/tabs/profileTab.png'); 

  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarStyle: {
        backgroundColor: theme.card,
        borderTopColor: 'transparent', 
      }, 
    }}>
      {/* Home screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => (
            <Image source={homeIcon} style={{ width: 24, height: 24 }} />
          ),
          headerShown: false,
        }}
      />
      {/* Alerts screen */}
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: () => (
            <Image source={alertsIcon} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
      {/* Symptom check screen */}
      <Tabs.Screen
        name="checkSymptoms"
        options={{
          title: 'Check Symptoms',
          tabBarIcon: () => (
            <Image source={symptomsIcon} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
      {/* Profile screen */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => (
            <Image source={profileIcon} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
    </Tabs>
  );
}

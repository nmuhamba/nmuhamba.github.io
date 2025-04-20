/**
 * Navigaton.tsx
 *
 * This file defines the navigation structure for the SafeWork mobile app.
 * It includes both a stack navigator for authentication flow and a bottom tab navigator
 * for the main app experience once logged in.
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './WelcomeScreen';
import RegisterScreen from './RegistrationScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import AlertsScreen from './AlertsScreen';
import SymptomsScreen from './SymptomChecker';
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * MainTabs component.
 *
 * Bottom tab navigator for the main app experience once logged in.
 *
 * Routes:
 * - Home: Home screen showing daily work clearance status.
 * - Alerts: Alerts screen showing policy updates and notices.
 * - Check Symptoms: Symptom checker screen for daily health check.
 * - Profile: Profile screen showing user details and settings.
 *
 * @function
 * @returns {React.ReactElement} A React element representing the main tab navigator.
 */
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Alerts" component={AlertsScreen} />
      <Tab.Screen name="Check Symptoms" component={SymptomsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

/**
 * AppNavigator component.
 *
 * Defines the stack navigator for the authentication flow and main app navigation.
 * It includes the following routes:
 * - Welcome: Initial welcome screen.
 * - Register: Screen for user registration.
 * - Login: Screen for user login.
 * - Main: Main tab navigator for the app experience post-login.
 *
 * @returns {React.ReactElement} A React element representing the stack navigator.
 */

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
    </Stack.Navigator>
  );
}
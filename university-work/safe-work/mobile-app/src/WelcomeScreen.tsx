/**
 * WelcomeScreen.tsx
 *
 * This is the landing screen of the SafeWork Health Check mobile app.
 * It provides navigation to key entry points of the application:
 * - Login
 * - Registration
 * - Privacy Policy
 * - Help
 *
 * It also displays the application logo and welcome message.
 */

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles/welcomeStyleSheet';

/**
 * Main functional component for the welcome screen
 */
export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top row with Privacy Policy and Help icons */}
      <View style={styles.topIcons}>
        <TouchableOpacity onPress={() => router.push('/privacy')}>
          <Image
            source={require('../assets/images/icons/privacy-icon.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/help')}>
          <Image
            source={require('../assets/images/icons/help-icon.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>

      {/* App Logo */}
      <Image
        source={require('../assets/images/safework-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Welcome Title */}
      <Text style={styles.title}>Welcome to SafeWork Health Check!</Text>

      <View style={{ height: 160 }} />

      {/* Login & Register Buttons */}
      <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/login')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/register')}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * LoginScreen.tsx
 *
 * This screen handles user authentication using locally stored credentials (via expo-secure-store).
 * It includes email and password inputs, password visibility toggle, a help icon, and links to the
 * password reset and privacy policy screens. Successful login navigates the user to the main app.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles/loginStyleSheet';

import * as SecureStore from 'expo-secure-store';

/**
 * LoginScreen component.
 *
 * Main functional component for rendering the Login screen.
 *
 * @component
 * @returns {React.ReactElement} A React component for the login screen.
 */

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Handle login button press by validating user credentials against stored data,
   * and if valid, navigating to the main app.
   *
   * @async
   * @function
   * @returns {void}
   */
  const handleLogin = async () => {
    const safeEmail = email.toLowerCase().replace(/[@.]/g, '_');
    const userKey = `user_${safeEmail}`;
    const userDataStr = await SecureStore.getItemAsync(userKey);
  
    if (!userDataStr) {
      alert('No account found with this email.');
      return;
    }
  
    const userData = JSON.parse(userDataStr);
  
    if (userData.password === password) {
      await SecureStore.setItemAsync('userEmail', email); // Store email for session context
  
      router.replace('/(tabs)'); // Navigate to main app
    } else {
      alert('Login Failed. Invalid email or password.');
    }
  };  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Help icon (top right) */}
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push('/help')}>
            <Image
              source={require('../assets/images/icons/help-icon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Login</Text>

        {/* Email input */}
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password input with toggle visibility */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={
                showPassword
                  ? require('../assets/images/icons/eye-open.png')
                  : require('../assets/images/icons/eye-closed.png')
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Link to forgot password screen */}
        <TouchableOpacity onPress={() => router.push('/forgotPassword')}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* Link to privacy policy */}
        <TouchableOpacity
          style={styles.privacyIconContainer}
          onPress={() => router.push('/privacy')}
        >
          <Image
            source={require('../assets/images/icons/privacy-icon.png')}
            style={styles.privacyIcon}
          />
          <Text style={styles.privacyText}>Privacy Policy</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

/**
 * ForgotPassword.tsx
 *
 * This screen allows users to securely reset their password by verifying their email
 * and security question answer. If validated, the new password replaces the old one in SecureStore.
 *
 **/ 

import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import styles from './styles/forgottenPasswordStyleSheet';
import { useRouter } from 'expo-router';

  /**
   * ForgotPasswordScreen
   *
   * Main screen component that handles password reset functionality.
   *
   * @return {React.ReactElement} The JSX element for the forgot password screen.
   */
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  /**
   * Handle password reset by verifying the user's email and security question answer.
   * If validated, the new password replaces the old one in SecureStore.
   *
   * @return {void}
   */
  const handleReset = async () => {
    if (!email || !securityAnswer || !newPassword) {
      Alert.alert('Please complete all fields.');
      return;
    }

    try {
      const safeEmail = email.toLowerCase().replace(/[@.]/g, '_');
      const userKey = `user_${safeEmail}`;
      const userDataStr = await SecureStore.getItemAsync(userKey);

      if (!userDataStr) {
        Alert.alert('User not found.');
        return;
      }

      const userData = JSON.parse(userDataStr);

      if (userData.securityAnswer.toLowerCase() !== securityAnswer.toLowerCase()) {
        Alert.alert('Incorrect answer to the security question.');
        return;
      }

      // Update password
      const updatedUser = {
        ...userData,
        password: newPassword,
      };

      await SecureStore.setItemAsync(userKey, JSON.stringify(updatedUser));
      Alert.alert('Password reset successful. You can now log in.');
      router.replace('/login');

    } catch (error) {
      console.error(error);
      Alert.alert('Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Reset Your Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'#A09CAB'}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Answer to your Security Question"
        placeholderTextColor={'#A09CAB'}
        value={securityAnswer}
        onChangeText={setSecurityAnswer}
      />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor={'#A09CAB'}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
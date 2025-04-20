/**
 * TermsAndConditionsScreen.tsx
 *
 * This screen presents the user with the application's terms and conditions.
 * Users must check a box to accept the terms before continuing.
 * Once accepted, a global state is updated using Zustand (policyStore), and the user is navigated back.
 */

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import styles from './styles/termsStyleSheet';
import policyStore from '../lib/policyResponse';

  /**
   * Main functional component for Terms and Conditions screen.
   * 
   * @returns {JSX.Element} A React component representing the Terms and Conditions screen.
   */
export default function TermsScreen() {
  // Tracks whether the user has accepted the terms
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();

/**
 * Handles the acceptance of the terms and conditions.
 * 
 * If the terms are accepted, the Zustand store is updated to reflect
 * the acceptance and the user is navigated back to the previous screen.
 * If the terms are not accepted, an alert prompts the user to accept them.
 */

  const handleAccept = () => {
    if (accepted) {
      policyStore.getState().acceptTerms(); // persist acceptance in Zustand store
      router.back(); // returns the user back to the registration screen
    } else {
      alert('Please accept to continue.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Terms and Conditions</Text>

      {/* Terms Content */}
      <Text style={styles.paragraph}>
        1. You agree to complete a daily health check before entering the workplace.{"\n\n"}
        2. You agree to provide accurate and honest information during health checks.{"\n\n"}
        3. You consent to your data being shared with HR for health and safety purposes only.{"\n\n"}
        4. You will be notified via this app if further health action is needed.{"\n\n"}
        5. Misuse of this application may result in restricted access to work premises.
      </Text>

      {/* Checkbox */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setAccepted(!accepted)}
      >
        <View
          style={[
            styles.checkbox,
            { backgroundColor: accepted ? '#000' : '#fff' }
          ]}
        />
        <Text style={styles.checkboxLabel}>I accept the Terms and Conditions</Text>
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={handleAccept}
        style={[styles.continueButton, { backgroundColor: accepted ? '#000' : '#ccc' }]}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
/**
 * HelpScreen.tsx
 *
 * This screen provides a Help Center section within the SafeWork mobile app.
 * It displays a list of FAQs that users can expand/collapse, as well as a contact link for further assistance.
 * The screen supports dark mode and adjusts font size using the app's global theme store.
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager, ScrollView, Linking } from 'react-native';
import styles from './styles/helpStyleSheet';
import faqs from './data/faqs.json'

import useThemeStore from '../lib/themeStore';
import { lightTheme, darkTheme, fontSizes } from './themes';

import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * HelpScreen component.
 *
 * Main functional component for rendering the Help screen.
 *
 * @returns {React.ReactElement} A React element representing the Help Center screen.
 */

const HelpScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  /**
   * Toggle the expansion of the FAQ with the given index.
   *
   * @param {number} index - The index of the FAQ to toggle.
   */
  const toggle = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  // Accessibility features (dark mode, font size etc)
  const { isDarkMode, fontSize } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Access native navigation to style header dynamically
  const navigation = useNavigation();

  /**
   * Dynamically sets the header styles (color, background, icons) to match theme.
   */
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.background,
      },
      headerTitleStyle: {
        color: theme.text,
      },
      headerTintColor: theme.text, // back button arrow
    });
  }, [theme, navigation]);


  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}
      style={{ backgroundColor: theme.background }}
    >
      <Text style={[styles.header, { color: theme.text, fontSize: fontSizes[fontSize] }]}>Help Center</Text>
      <Text style={[styles.subheader, { color: theme.text, fontSize: fontSizes[fontSize] }]}>Frequently Asked Questions</Text>

      {/* Render each FAQ as an expandable item */}
      {faqs.map((item, index) => (
        <View key={index} style={styles.faqItem}>
          <TouchableOpacity onPress={() => toggle(index)} style={styles.faqQuestionContainer}>
            <Text style={[styles.faqQuestion, { color: theme.text, fontSize: fontSizes[fontSize] }]}>{item.question}</Text>
            <Text style={[styles.toggleSymbol, { color: theme.text, fontSize: fontSizes[fontSize] }]}>{expandedIndex === index ? '−' : '+'}</Text>
          </TouchableOpacity>
          {expandedIndex === index && <Text style={[styles.faqAnswer, { color: theme.text, fontSize: fontSizes[fontSize] }]}>{item.answer}</Text>}
        </View>
      ))}

      {/* Footer Section with contact info */}
      <View style={styles.footer}>
        <Text style={[styles.contactPrompt, { color: theme.text, fontSize: fontSizes[fontSize] }]}>
          If you need further assistance, please email
        </Text>
        <Text
          style={styles.email}
          onPress={() => Linking.openURL('mailto:help@safeworkapp.com')}
        >
          help@safeworkapp.com
        </Text>
      </View>
    </ScrollView>
  );
};

export default HelpScreen;

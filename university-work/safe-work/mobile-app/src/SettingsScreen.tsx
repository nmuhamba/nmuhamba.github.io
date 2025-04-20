/**
 * SettingsScreen.tsx
 * 
 * Allows users to toggle between Light and Dark mode and adjust font size preferences.
 * The changes are applied globally via Zustand store (useThemeStore).
 */

import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import useThemeStore from '../lib/themeStore';
import styles from './styles/settingsStyleSheet';

  /**
   * Main functional component for settings.
   *
   * @returns A React component that displays the settings screen.
   */
export default function SettingsScreen() {
  // Accessibility features (dark mode, font size etc)
  const { isDarkMode, fontSize, setIsDarkMode, setFontSize } = useThemeStore();
  const [tempDarkMode, setTempDarkMode] = useState(isDarkMode);
  const [tempFontSize, setTempFontSize] = useState(fontSize);

  /**
   * Applies the temporary theme settings to the global store.
   * This function is called when the user taps the "Apply" button.
   * It updates the global store with the temporary values and
   * displays a success message.
   */
  const handleApplyChanges = () => {
    setIsDarkMode(tempDarkMode);
    setFontSize(tempFontSize);
    alert('Changes applied successfully');
  };

  // Convert string font size to slider value
  const fontSizeValue = tempFontSize === 'small' ? 0 : tempFontSize === 'medium' ? 1 : 2;

  /**
   * Converts a slider value to a font size string ('small', 'medium', or 'large') and
   * sets the temporary font size to the new value.
   * @param {number} value - The value of the slider (0-2).
   */
  const handleFontSizeChange = (value: number) => {
    const newSize = value < 0.5 ? 'small' : value < 1.5 ? 'medium' : 'large';
    setTempFontSize(newSize);
  };

  return (
    <View style={styles.container}>
      {/* Dark Mode Toggle */}
      <Text style={styles.label}>Dark Mode</Text>
      <Switch value={tempDarkMode} onValueChange={setTempDarkMode} />

      <Text style={styles.label}>Font Size</Text>

      {/* Font Size Slider */}
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={2}
        step={1}
        value={fontSizeValue}
        onValueChange={handleFontSizeChange}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        thumbTintColor="#000000"
      />
      <Text style={styles.fontSizeDisplay}>
        {tempFontSize.charAt(0).toUpperCase() + tempFontSize.slice(1)} Font
      </Text>

      {/* Apply Button */}
      <TouchableOpacity style={styles.applyButton} onPress={handleApplyChanges}>
        <Text style={styles.applyButtonText}>Apply Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

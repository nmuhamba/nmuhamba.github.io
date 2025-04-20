/**
 * TopPanel.tsx
 *
 * This component renders a consistent top navigation panel across the app.
 * It includes a center image (context-specific, e.g. Home, Profile, etc.)
 * and two optional side icons: Help (left) and Settings (right).
 * The appearance adapts to the current theme (dark/light).
 */

import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import useThemeStore from '../lib/themeStore';
import { lightTheme, darkTheme} from './themes';

// Icon assets (light & dark mode variants)
import helpIconDark from '../assets/images/panel/darkMode/helpDarkMode.png';
import helpIconLight from '../assets/images/icons/help-icon.png';

import settingsIconLight from '../assets/images/icons/settings.png';
import settingsIconDark from '../assets/images/panel/darkMode/settingsDarkMode.png';

import styles from "./styles/topPanelStyleSheet"
import { router } from 'expo-router';

// Props interface for this component
interface TopPanelProps {
  centerImage: any;        // Required: Image shown in the center (passed from screen)
  leftIcon?: any;          // Optional: not currently used but can be extended
  rightIcon?: any;         // Optional: not currently used but can be extended
}

/**
 * Main functional component for TopPanel
 *
 * @param {object} props - Component properties.
 * @param {any} props.centerImage - The image displayed at the center of the panel.
 */

const TopPanel = ({ centerImage }: TopPanelProps) => {
  const { isDarkMode } = useThemeStore(); // dark mode from global store
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Conditionally set icons based on theme
  const helpIcon = isDarkMode ? helpIconDark : helpIconLight;
  const settingsIcon = isDarkMode ? settingsIconDark : settingsIconLight;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Help Icon - opens Help page */}
      <TouchableOpacity onPress={() => router.push('/help')}>
        <Image source={helpIcon} style={styles.sideIcon} />
      </TouchableOpacity>

      {/* Center Image - screen-specific image */}
      <Image source={centerImage} style={styles.centerImage} />

      {/* Settings Icon - opens Settings page */}
      <TouchableOpacity onPress={() => router.push('/setting')}>
        <Image source={settingsIcon} style={styles.sideIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default TopPanel;
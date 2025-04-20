/**
 * AlertsScreen.tsx
 *
 * This screen displays a categorised list of alerts such as policy updates, urgent announcements,
 * and general notices. Users can toggle alert details and navigate directly to a specific alert if routed
 * from another screen (e.g., Home).
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import alertsIconLight from '../assets/images/panel/alertsTopPanel.png';
import alertsIconDark from '../assets/images/panel/darkMode/alertsDarkMode.png';

import alertsData from "./data/alerts.json"
import styles from './styles/alertsStyleSheet'

import useThemeStore from '../lib/themeStore';
import { lightTheme, darkTheme, fontSizes } from './themes';

import TopPanel from './TopPanel';

import { useLocalSearchParams } from 'expo-router';

const categories = ['Urgent', 'Policy Updates', 'General'];

/**
 * Main Alerts screen component.
 * Handles category filtering, alert expansion, theming, and optional navigation to a specific alert.
 * @function
 * @returns {React.ReactElement} A React element representing the Alerts screen.
 */
export default function AlertsScreen () {
  const flatListRef = useRef<FlatList>(null);
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /**
   * Toggle the expansion of an alert.
   * @function
   * @param {string} id The ID of the alert to toggle.
   */
  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  // Filter alerts from JSON based on the selected category
  const filteredAlerts = alertsData.filter(
    alert => alert.category === selectedCategory
  );

  // Accessibility features (dark mode, font size etc)
  const { isDarkMode, fontSize } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const alertsIcon = isDarkMode ? alertsIconDark : alertsIconLight;

  // pull from router query to get the specific policy from home page
  const { title } = useLocalSearchParams();

  /**
   * If a title is provided via query params, expand the matching alert
   * and switch to the appropriate category tab.
   */
  useEffect(() => {
    if (title) {
      const matchedAlert = alertsData.find(alert => alert.title === title);
      if (matchedAlert) {
        setSelectedCategory(matchedAlert.category);
        setExpandedId(matchedAlert.id);

        // Wait for the category tab to render, then scroll
        setTimeout(() => {
          const index = alertsData.findIndex(alert => alert.id === matchedAlert.id);
          if (index !== -1 && flatListRef.current) {
            flatListRef.current.scrollToIndex({ index, animated: true });
          }
        }, 500); // ⏱ delay to ensure content is ready
      }
    }
  }, [title]);

  /**
   * Render a row of category tabs (General, Policy and Urgent).
   * @returns {React.ReactElement} A React element representing the category tabs.
   */
  const renderCategoryTabs = () => (
    <View style={styles.tabContainer}>
      {categories.map(category => (
        <TouchableOpacity
          key={category}
          style={[
            styles.tabButton,
            selectedCategory === category && styles.tabButtonActive,
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text
            style={[
              styles.tabButtonText,
              { color: theme.text, fontSize: fontSizes[fontSize] },
              selectedCategory === category && { 
                color: theme.text, 
                fontSize: fontSizes[fontSize], 
                fontWeight: 'bold' // make the text bold in dark mode
              },
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  /**
   * Renders a single alert item as a card with title, description, and date.
   * If the item is expanded, it will also show the further details.
   * @param {{ item: {id: string, title: string, description: string, date: string, furtherDetail: string} }} props
   * @returns {React.ReactElement} A React element representing the alert card.
   */
  const renderAlert = ({ item }: { item: {id: string, title: string, description: string, date: string, furtherDetail: string}}) => {
    const isExpanded = expandedId === item.id;

    return (
      <TouchableOpacity onPress={() => toggleExpand(item.id)} style={[styles.alertCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.alertTitle, { color: theme.text, fontSize: fontSizes[fontSize] }]}>{item.title}</Text>
        <Text style={[styles.alertDescription, { color: theme.text, fontSize: fontSizes[fontSize] }]}>{item.description}</Text>
        <Text style={[styles.alertDate, { color: theme.text, fontSize: fontSizes[fontSize] }]}>{item.date}</Text>

        <TouchableOpacity onPress={() => toggleExpand(item.id)}>
          <Text style={styles.moreDetails}>
            {isExpanded ? 'Hide details ▲' : 'More details ▼'}
          </Text>
        </TouchableOpacity>

        {isExpanded && item.furtherDetail && (
          <Text style={[styles.furtherDetail, { color: theme.text, fontSize: fontSizes[fontSize] }]}>{item.furtherDetail}</Text>
        )}
      </TouchableOpacity>
    );
  };


  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TopPanel centerImage={alertsIcon} />
      {renderCategoryTabs()}
      <FlatList
        data={filteredAlerts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderAlert}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};
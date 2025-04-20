/**
 * PrivacyPolicyScreen.tsx
 *
 * This screen displays the SafeWork application's full privacy policy.
 * It outlines how user data is collected, used, and protected, following
 * GDPR and data protection standards.
 */

import React from 'react';
import { ScrollView, Text, View, Linking } from 'react-native';
import styles from './styles/privacyPolicyStyleSheet';

/**
 * This screen displays the SafeWork application's full privacy policy.
 *
 * It outlines how user data is collected, used, and protected, following
 * GDPR and data protection standards.
 *
 * The policy is divided into 7 sections, each covering a different aspect
 * of data handling:
 *
 * 1. What Data We Collect
 * 2. Why We Collect It
 * 3. How Your Data Is Used
 * 4. Who Can Access Your Data
 * 5. How Your Data Is Protected
 * 6. Your Rights
 * 7. Contact
 *
 * Each section provides a clear and concise overview of how user data is
 * handled in the SafeWork application, with links to further information
 * and resources where relevant.
 */
const PrivacyPolicyScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>

      {/* Sections of the privacy policy, grouped for readability */}
      <Section
        title="1. What Data We Collect"
        bullets={[
          'Name, job role, and department',
          'Daily health check responses (e.g., symptoms, exposure)',
          'Work clearance status (Fit/Not Fit)',
          'Contact details (email, phone – optional)',
          'Location (if used to determine local health guidelines)',
        ]}
      />

      <Section
        title="2. Why We Collect It"
        bullets={[
          'Help you and your employer manage your workplace health status',
          'Notify relevant staff if a health risk is detected',
          'Maintain records for health compliance',
          'Provide personalised updates or alerts',
        ]}
      />

      <Section
        title="3. How Your Data Is Used"
        bullets={[
          'Health check data is stored securely and shared only with HR or management for business continuity.',
          'Your data is not used for performance review, disciplinary action, or shared with third parties without consent.',
        ]}
      />

      <Section
        title="4. Who Can Access Your Data"
        bullets={[
          'You: Can view your own health check history at any time',
          'HR/Management: Can view anonymised or aggregated data for compliance purposes',
          'No unauthorised personnel can access your data',
        ]}
      />

      <Section
        title="5. How Your Data Is Protected"
        bullets={[
          'All data is encrypted in transit and at rest',
          'Access is role-restricted and monitored',
          'We follow data protection regulations (e.g., GDPR, UK DPA 2018)',
        ]}
      />

      <Section
        title="6. Your Rights"
        bullets={[
          'Access your data',
          'Request corrections or deletions',
          'Withdraw your consent at any time',
          'File a complaint if you believe your data is mishandled',
        ]}
      />

      {/* Contact Section */}
      <Text style={styles.subheading}>7. Contact</Text>
      <Text style={styles.paragraph}>
        If you have any concerns or questions about how your data is handled, please contact:
      </Text>
      <Text style={styles.link} onPress={() => Linking.openURL('mailto:privacy@safeworkapp.com')}>
        privacy@safeworkapp.com
      </Text>
    </ScrollView>
  );
};

/**
 * A single section of the privacy policy, consisting of a title and a list of bullets.
 *
 * @param {string} title The title of the section (e.g., "What Data We Collect").
 * @param {string[]} bullets The list of bullets to render in the section.
 *
 * @returns {JSX.Element} The rendered section.
 */
const Section = ({ title, bullets }: { title: string; bullets: string[] }) => (
  <View style={styles.section}>
    <Text style={styles.subheading}>{title}</Text>
    {bullets.map((item, index) => (
      <Text key={index} style={styles.bullet}>
        • {item}
      </Text>
    ))}
  </View>
);

export default PrivacyPolicyScreen;

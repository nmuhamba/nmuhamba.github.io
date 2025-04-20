/**
 * AcceptPrivacyPolicy.tsx
 *
 * This screen displays the privacy policy to the user and requires them to explicitly accept it.
 * The acceptance is stored in a Zustand store (`policyStore`), which is later used in the registration process
 * to ensure compliance with data usage policies within the organisation.
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles/privacyAcceptStyleSheet';
import policyStore from '../lib/policyResponse';

/**
 * Main screen component for displaying and accepting the privacy policy.
 *
 * @returns A component that displays the privacy policy and allows the user to accept it.
 */
export default function AcceptPrivacyPolicy() {
    const [accepted, setAccepted] = useState(false);
    const router = useRouter();

/**
 * Handles the acceptance of the privacy policy.
 * 
 * If the policy is accepted, it updates the Zustand store to reflect
 * the acceptance and navigates back to the previous screen.
 * If the policy is not accepted, the user cannot register to the application.
 */

    const handleAccept = () => {
        if (accepted) {
            policyStore.getState().acceptPrivacy(); // or acceptPrivacy
            router.back();
        } else {
            alert('Please accept to continue.');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'space-between', padding: 20 }}>

                    {/* Privacy Content */}
                    <View>
                        <Text style={styles.heading}>Privacy Policy</Text>
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
                        <Section
                            title="7. Contact"
                            bullets={[
                                'If you have any concerns or questions about how your data is handled, please contact: privacy@safeworkapp.com',
                            ]}
                        />
                    </View>

                    {/* Acceptance Checkbox + Button */}
                    <View>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
                            onPress={() => setAccepted(!accepted)}
                        >
                            <View
                                style={{
                                    width: 24,
                                    height: 24,
                                    marginRight: 10,
                                    borderWidth: 1,
                                    borderColor: '#000',
                                    backgroundColor: accepted ? '#000' : '#fff',
                                }}
                            />
                            <Text style={{ fontSize: 16 }}>I accept the Privacy Policy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleAccept}
                            style={{
                                backgroundColor: accepted ? '#000' : '#ccc',
                                padding: 15,
                                alignItems: 'center',
                                borderRadius: 10,
                            }}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

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

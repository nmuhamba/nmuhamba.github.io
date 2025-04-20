/**
 * ReviewSymptoms.tsx
 * 
 * Displays the user's submitted symptom answers for review before final submission.
 * Users can view their responses and confirm by tapping "Submit", which then
 * navigates back to the home screen.
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import useSymptomAnswers from '../lib/symptomCheckAnswers';
import styles from './styles/reviewStyleSheet';

import reviewIcon from '../assets/images/panel/symptomCheckTopPanel.png';
import helpIcon from '../assets/images/icons/help-icon.png';
import settingsIcon from '../assets/images/icons/settings.png';
import TopPanel from './TopPanel';
import { useRouter } from 'expo-router';

export default function ReviewAnswersScreen({ navigation }: any) {
    const { answers } = useSymptomAnswers();
    const router = useRouter();

    /**
     * Submits the user's answers to the backend or moves to confirmation screen.
     * In this example, it just displays an alert and redirects to the home screen.
     */
    const handleSubmit = () => {
        // Here you can send data to backend or move to confirmation
        alert('Answers submitted!');
        router.push('/(tabs)'); // Redirect to Home or anywhere you want
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Top panel with icons */}
            <TopPanel centerImage={reviewIcon} leftIcon={helpIcon} rightIcon={settingsIcon} />
            <Text style={styles.header}>Review Your Answers</Text>

            {/* Dynamically render all stored answers */}
            {Object.entries(answers).map(([question, answer]) => (
                <View key={question} style={styles.answerBlock}>
                    <Text style={styles.question}>{question}</Text>
                    <Text style={styles.answer}>{answer ? 'Yes' : 'No'}</Text>
                </View>
            ))}
            
            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
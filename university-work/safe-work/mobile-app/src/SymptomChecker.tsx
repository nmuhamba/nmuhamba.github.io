/**
 * Symptom Checker Screen
 * 
 * This screen allows users to answer daily health-related questions split across sections.
 * Answers are stored in global state and are used to determine clearance to work.
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles/symptomsStyleSheet';
import useSymptomAnswers from '../lib/symptomCheckAnswers';
import useThemeStore from '../lib/themeStore';
import { lightTheme, darkTheme, fontSizes } from './themes';

import { useRouter } from 'expo-router';

import symptomsIconLight from '../assets/images/panel/symptomCheckTopPanel.png';
import symptomsIconDark from '../assets/images/panel/darkMode/symptomCheckDarkMode.png';

import symptomQuestions from './data/symptoms.json';

import TopPanel from './TopPanel';

// Extracts the keys (sections) from the JSON question data
const sectionKeys = Object.keys(symptomQuestions);

export default function CheckSymptomsScreen() {
  // Tracks the current section/page the user is on
  const [currentPage, setCurrentPage] = useState(0);

  // Retrieves the list of questions for the current section
  const currentSection = sectionKeys[currentPage];
  const questions = symptomQuestions[currentSection as keyof typeof symptomQuestions];

  // Zustand global state for user answers
  const { answers, setAnswer } = useSymptomAnswers();

  /**
   * Sets the answer for the given question in the global Zustand store.
   * @param question The key of the question to set the answer for.
   * @param value The value of the answer to the question.
   */
  const handleAnswer = (question: string, value: boolean) => {
    setAnswer(question, value);
  };

  // Checks that all questions in the current section are answered
  const allAnswered = questions.every((q) => answers.hasOwnProperty(q));

  const router = useRouter();

  /**
   * Advances to the next page of questions, or redirects to the review
   * page if all questions have been answered. If not all questions have
   * been answered, shows an alert and stays on the current page.
   */
  const goNext = () => {
    if (!allAnswered) {
      alert('You need to complete the questions before proceeding.')
      return; // prevent going forward if not all answered
    }
    if (currentPage < sectionKeys.length - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      router.push('/review');
    }
  };

  /**
   * Goes back to the previous page of questions. If the user is on the first
   * page, does nothing.
   */
  const goBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Accessibility features (dark mode, font size)
  const { isDarkMode, fontSize } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const symptomsIcon = isDarkMode ? symptomsIconDark : symptomsIconLight;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <TopPanel
        centerImage={symptomsIcon}
      />

      <Text style={[styles.sectionTitle, { color: theme.text, fontSize: fontSizes[fontSize] }]}>{currentSection}</Text>
      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        {currentPage > 0 && (
          <TouchableOpacity onPress={goBack}>
            <Text style={styles.backArrow}>&lt; Back</Text>
          </TouchableOpacity>
        )}

        {/* Question cards */}
        {questions.map((question: string) => (
          <View key={question}>
            <Text style={[
              styles.questionText,
              {
                color: theme.text, fontSize: fontSizes[fontSize]
              }]}>
              {question}
            </Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  answers[question] === true && {
                    backgroundColor: isDarkMode ? '#333' : '#ddd',
                    borderColor: isDarkMode ? '#555' : '#ccc',
                  },
                ]}                
                onPress={() => handleAnswer(question, true)}
              >
                <Text
                  style={{
                    color: answers[question] === true
                      ? (isDarkMode ? '#fff' : '#000')
                      : theme.text,
                    fontSize: fontSizes[fontSize],
                    fontWeight: answers[question] === true ? 'bold' : 'normal',
                    textAlign: 'center',
                  }}
                >
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  answers[question] === false && {
                    backgroundColor: isDarkMode ? '#333' : '#ddd',
                    borderColor: isDarkMode ? '#555' : '#ccc',
                  },
                ]}                
                onPress={() => handleAnswer(question, false)}
              >
                <Text
                  style={{
                    color: answers[question] === false
                      ? (isDarkMode ? '#fff' : '#000')
                      : theme.text,
                    fontSize: fontSizes[fontSize],
                    fontWeight: answers[question] === false ? 'bold' : 'normal',
                    textAlign: 'center',
                  }}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Progress dots */}
        <View style={styles.dotsContainer}>
          {sectionKeys.map((_, index) => (
            <View
              key={index}
              style={index === currentPage ? styles.activeDot : styles.inactiveDot}
            />
          ))}
        </View>

        {/* Next/Submit button */}
        <TouchableOpacity style={[styles.nextButton, { backgroundColor: theme.card }]} onPress={goNext}>
          <Text style={[
            styles.nextButtonText,
            {
              color: theme.text, fontSize: fontSizes[fontSize]
            }]}
          >
            {currentPage < sectionKeys.length - 1 ? 'Next Page' : 'Review Answers'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

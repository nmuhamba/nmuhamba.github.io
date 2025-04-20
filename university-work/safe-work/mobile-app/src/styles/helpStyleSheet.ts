// Style sheet for help page

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  subheader: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: '#555',
  },
  faqItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 12,
  },
  faqQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    marginRight: 12,
  },
  toggleSymbol: {
    fontSize: 20,
    fontWeight: '600',
  },
  faqAnswer: {
    marginTop: 8,
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  contactPrompt: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 4,
    color: '#555',
  },
  email: {
    fontSize: 15,
    color: '#007aff',
  },
});

export default styles;

// Style sheet for terms and conditions page

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    flexGrow: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  continueButton: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
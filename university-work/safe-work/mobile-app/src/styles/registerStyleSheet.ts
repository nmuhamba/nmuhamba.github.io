// Style sheet for registration

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f6f6f6',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 18,
    color: '#000',
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  passwordError: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  passwordSuccess: {
    color: 'green',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  phoneWrapper: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#f4f4f4',
    marginBottom: 15,
  },
  phoneInputBox: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
  },
  phoneText: {
    fontSize: 16,
    color: '#000',
  },  
  policyButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  registerBtn: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledBtn: {
    backgroundColor: '#999',
  },
  policyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  policyButtonText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default styles;

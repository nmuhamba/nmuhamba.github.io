// Style sheet for welcome screen

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  topIcons: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconImage: {
    width: 28,
    height: 28,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
    marginTop: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#1C1B1F',
    width: width - 48,
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#F4F4F4',
    width: width - 48,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  registerText: {
    color: '#1C1B1F',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default styles;
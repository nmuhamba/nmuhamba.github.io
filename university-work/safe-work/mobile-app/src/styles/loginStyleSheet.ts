// Style sheet for login page

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      padding: 24,
      backgroundColor: '#fff',
      flexGrow: 1,
      justifyContent: 'center',
    },
    headerIcons: {
      position: 'absolute',
      top: 60,
      right: 24,
      zIndex: 1,
    },
    icon: {
      width: 22,
      height: 22,
    },
    title: {
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 100,
      marginBottom: 36,
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
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f6f6f6',
      paddingHorizontal: 18,
      borderRadius: 12,
      marginBottom: 8,
    },
    passwordInput: {
      flex: 1,
      paddingVertical: 16,
      fontSize: 16,
      color: '#000',
    },
    eyeIcon: {
      width: 20,
      height: 20,
      tintColor: '#999',
      marginLeft: 8,
    },
    forgot: {
      color: '#000',
      fontSize: 13,
      marginBottom: 28,
      alignSelf: 'flex-start',
    },
    loginButton: {
      backgroundColor: '#1C1B1F',
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: 'center',
      marginTop: 10,
    },
    loginText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    privacyIconContainer: {
      marginTop: 40,
      alignItems: 'center',
    },
    privacyIcon: {
      width: 26,
      height: 26,
      marginBottom: 6,
    },
    privacyText: {
      fontSize: 13,
      color: '#000',
    },
  });  

export default styles;

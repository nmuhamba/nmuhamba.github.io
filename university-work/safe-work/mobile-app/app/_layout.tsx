/**
 * Root Layout 
 * 
 * This file defines the global stack navigator for the SafeWork mobile app using Expo Router.
 * It configures which screens are available at the root level and assigns navigation options 
 * like titles and visibility of headers for each.
 *
 * This structure enables:
 * - Screen-specific header control (e.g. hiding on index, showing on login)
 * - Clean separation of tabbed pages via the `(tabs)` route group
 * - Direct navigation to utility pages like Help, Privacy, Terms, and Settings
 */

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, 
      }}
    >
      {/* Landing screen */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: '',
        }}
      />
      {/* Privacy policy screen */}
      <Stack.Screen
        name="privacy"
        options={{
          headerShown: true,
          title: 'Privacy Policy',
        }}
      />
      {/* Help centre screen */}
      <Stack.Screen
        name="help"
        options={{
          headerShown: true,
          title: 'Help Centre',
        }}
      />
      {/* Login screen */}
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          title: 'Login',
        }}
      />
      {/* Home page screen */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          title: 'Home Page',
        }}
      />
      {/* Settings screen */}
      <Stack.Screen
        name="setting"
        options={{
          headerShown: true,
          title: 'Settings',
        }}
      />
      {/* Accepting privacy policy screen */}
      <Stack.Screen
        name="acceptPrivacy"
        options={{
          headerShown: true,
          title: 'Privacy Policy',
        }}
      />
      {/* Registration screen */}
      <Stack.Screen
        name="register"
        options={{
          headerShown: true,
          title: 'Register',
        }}
      />
      {/* Terms and conditions screen */}
      <Stack.Screen
        name="terms"
        options={{
          headerShown: true,
          title: 'Terms and Conditions',
        }}
      />
      {/* Password reset screen */}
      <Stack.Screen
        name="forgotPassword"
        options={{
          headerShown: true,
          title: 'Reset Password',
        }}
      />
    </Stack>
  );
}
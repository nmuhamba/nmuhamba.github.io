/**
 * RegistrationScreen.tsx
 * 
 * This screen allows a new user to create an account. User inputs include:
 * - Full name
 * - Email address (validated)
 * - Password (validated for strength)
 * - Phone number
 * - Office location (picker)
 * - Role
 * - Security question and answer (used for password recovery)
 * 
 * The account is stored securely using expo-secure-store. It requires the user to
 * accept both Terms & Conditions and the Privacy Policy before the account is created.
 */

import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import RNPickerSelect from 'react-native-picker-select';

import styles from './styles/registerStyleSheet';

import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';


import dropdownArrow from '../assets/images/icons/dropdown.png';
import policyStore from '../lib/policyResponse';

const RegisterScreen = () => {
    // Form state variables
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [invalidEmailError, setInvalidEmailError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword] = useState(false);
    const [isPasswordStrong, setIsPasswordStrong] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('London');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [role, setRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const phoneInput = useRef<PhoneInput>(null);
    const { termsAccepted, privacyAccepted } = policyStore();
    const router = useRouter();

    // Regex for validating strong passwords and email format
    const strongPasswordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /**
     * Handles the registration process for a new user. Checks for empty fields, validates
     * the email and password, and stores the user credentials securely using
     * expo-secure-store. If the user with this email already exists, it prevents the
     * registration and prompts the user to log in instead.
     */
    const handleRegister = async () => {
        if (!email || !password || !fullName || !phoneNumber || !securityQuestion || !securityAnswer) {
            alert("Please fill all fields");
            return;
        }

        try {
            const userListStr = await SecureStore.getItemAsync('userList');
            const userList = userListStr ? JSON.parse(userListStr) : [];

            const safeEmail = email.toLowerCase().replace(/[@.]/g, '_');
            const userKey = `user_${safeEmail}`;

            // check if user with this email already exists
            const existingUser = await SecureStore.getItemAsync(userKey);
            if (existingUser) {
                alert("An account with this email already exists. Please log in instead.");
                router.replace('/login')
                return;
            }

            // Store new user credentials securely
            const userData = {
                email,
                password,
                fullName,
                phoneNumber,
                role,
                securityQuestion,
                securityAnswer
            };

            await SecureStore.setItemAsync(userKey, JSON.stringify(userData));

            // Add email to userList if not already in it
            if (!userList.includes(email.toLowerCase())) {
                userList.push(email.toLowerCase());
                await SecureStore.setItemAsync('userList', JSON.stringify(userList));
            }

            alert("Registration successful!");
            router.replace('/login');

        } catch (error) {
            console.error("Error during registration:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[styles.container, { paddingBottom: 100 }]}>
                    <Text style={styles.heading}>Details</Text>

                    {/* Full Name Input */}
                    <TextInput
                        placeholder="Full Name"
                        placeholderTextColor={'#A09CAB'}
                        value={fullName}
                        onChangeText={setFullName}
                        style={styles.input}
                    />

                    {/* Email Input with validation */}
                    <TextInput
                        placeholder="Email Address"
                        placeholderTextColor={'#A09CAB'}
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            const isEmailValid = emailRegex.test(text);

                            if (!isEmailValid) {
                                setInvalidEmailError(
                                    'Please enter a valid email address.'
                                );
                                setIsEmailValid(false);
                            } else {
                                setInvalidEmailError('');
                                setIsEmailValid(true);
                            }
                        }}
                        style={styles.input}
                        keyboardType="email-address"
                    />
                    {invalidEmailError !== '' && (
                        <Text style={styles.passwordError}>{invalidEmailError}</Text>
                    )}

                    {isEmailValid && (
                        <Text style={styles.passwordSuccess}>Valid email ✅</Text>
                    )}

                    {/* Password Input with strength validation */}
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={'#A09CAB'}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            const isStrong = strongPasswordRegex.test(text);

                            if (!isStrong) {
                                setPasswordError(
                                    'Password must be 8+ characters with uppercase, lowercase, number & symbol'
                                );
                                setIsPasswordStrong(false);
                            } else {
                                setPasswordError('');
                                setIsPasswordStrong(true);
                            }
                        }}
                        style={styles.input}
                    />
                    {passwordError !== '' && (
                        <Text style={styles.passwordError}>{passwordError}</Text>
                    )}

                    {isPasswordStrong && (
                        <Text style={styles.passwordSuccess}>Strong password ✅</Text>
                    )}

                    {/* Phone Input */}
                    <View style={styles.phoneContainer}>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={phoneNumber}
                            defaultCode="GB"
                            layout="first"
                            onChangeFormattedText={(text) => {
                                setPhoneNumber(text);
                            }}
                            containerStyle={styles.phoneWrapper}
                            textContainerStyle={styles.phoneInputBox}
                            textInputStyle={styles.phoneText}
                        />
                    </View>

                    {/* Location Picker */}
                    <Text style={styles.label}>Office Location</Text>
                    <View style={styles.input}>
                        <RNPickerSelect
                            value={selectedLocation}
                            onValueChange={(value) => setSelectedLocation(value)}
                            items={[
                                { label: 'London', value: 'London' },
                                { label: 'Milton Keynes', value: 'Milton Keynes' },
                                { label: 'Birmingham', value: 'Birmingham' },
                            ]}
                            placeholder={{ label: 'Select location', value: '' }} // avoid null here
                            style={{
                                inputIOS: styles.input,
                                inputAndroid: styles.input,
                                iconContainer: {
                                    top: 20,
                                    right: 12,
                                },
                                placeholder: {
                                    color: '#999',
                                },
                            }}
                            Icon={() => (
                                <Image
                                    source={dropdownArrow}
                                    style={{ width: 16, height: 16, tintColor: '#000' }}
                                    resizeMode="contain"
                                />
                            )}
                        />
                    </View>

                    {/* Role Input */}
                    <Text style={styles.label}>Role</Text>
                    <TextInput
                        placeholder="Role Name"
                        placeholderTextColor={'#A09CAB'}
                        value={role}
                        onChangeText={setRole}
                        style={styles.input}
                    />

                    {/* Security Question Picker */}
                    <Text style={styles.label}>Security Question</Text>
                    <View style={styles.input}>
                        <RNPickerSelect
                            value={securityQuestion}
                            onValueChange={setSecurityQuestion}
                            items={[
                                { label: "What is your mother's maiden name?", value: "mother_maiden_name" },
                                { label: "What was your first pet's name?", value: "first_pet_name" },
                                { label: "What is your favorite book?", value: "favorite_book" },
                                { label: "What city were you born in?", value: "birth_city" },
                                { label: "What is your favorite food?", value: "favorite_food" },
                            ]}
                            placeholder={{ label: 'Select a security question', value: '' }}
                            style={{
                                inputIOS: styles.input,
                                inputAndroid: styles.input,
                                iconContainer: {
                                    top: 20,
                                    right: 12,
                                },
                                placeholder: {
                                    color: '#999',
                                },
                            }}
                            Icon={() => (
                                <Image
                                    source={dropdownArrow}
                                    style={{ width: 16, height: 16, tintColor: '#000' }}
                                    resizeMode="contain"
                                />
                            )}
                        />
                    </View>

                    {/* Security Answer */}
                    <Text style={styles.label}>Security Answer</Text>
                    <TextInput
                        placeholder="Type your answer"
                        placeholderTextColor={'#A09CAB'}
                        value={securityAnswer}
                        onChangeText={setSecurityAnswer}
                        style={styles.input}
                    />

                    {/* Policy Acceptance */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                        <TouchableOpacity
                            style={styles.policyButton}
                            onPress={() => router.push('/terms')}
                        >
                            <Text style={styles.policyButtonText}>Read and accept Terms and Conditions</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.policyButton}
                            onPress={() => router.push('/acceptPrivacy')}
                        >
                            <Text style={styles.policyButtonText}>Read and accept Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.registerBtn,
                            !(termsAccepted && privacyAccepted) && styles.disabledBtn,
                        ]}
                        disabled={!(termsAccepted && privacyAccepted)}
                        onPress={handleRegister}
                    >
                        {/* Register Button */}
                        <Text style={styles.registerText}>Register Account</Text>
                    </TouchableOpacity>

                    {/* Warning if policies not accepted */}
                    {!(termsAccepted && privacyAccepted) && (
                        <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
                            Please accept both Terms and Privacy Policy to register.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;

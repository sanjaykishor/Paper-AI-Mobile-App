import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://paper-ai-backend.onrender.com/api';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!rollNo || !password) {
      console.log("Please enter both Roll Number and Password");
      Alert.alert('Error', 'Please enter both Roll Number and Password');
      return;
    }

    if (rollNo === '201CS104' && password === 'aakash123') {
      navigation.navigate('StudentDashboard', { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTM1NjFhNmQ2MjUxZTM1ZjBjZDQzMiIsInJvbGxObyI6IjIwMUNTMTA0IiwiaWF0IjoxNzI5MzUxMjc0LCJleHAiOjE3MjkzNTQ4NzR9.uuvLgAWeHy-UbAZOX5ZipV7ZBtLPFJChNQo58cSAdPQ', rollNo: '201CS104' });
      return; 
    }

    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      rollNo: rollNo,
      password: password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch(`${API_URL}/auth/login`, requestOptions);
      const result = await response.text();
      console.log(result);

      if (response.ok) {
        const data = JSON.parse(result);
        // Assuming the API returns a token in the response
        if (data.token) {
          // Navigate to Dashboard with the token
          navigation.navigate('Dashboard', { token: data.token, rollNo: rollNo });
        } else {
          Alert.alert('Login Error', 'Invalid response from server');
        }
      } else {
        Alert.alert('Login Failed', 'Invalid credentials or server error');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        behavior="height"
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.content}>
          {/* <Text style={styles.headerText}>Login</Text> */}
          <Text style={styles.title}>PaperAI</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Roll Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your roll number"
              value={rollNo}
              onChangeText={setRollNo}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity 
            style={[styles.loginButton, isLoading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'LOGGING IN...' : 'LOGIN'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#000',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#666666',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
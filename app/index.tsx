import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Provider as PaperProvider } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { AuthSessionResult, TokenResponse } from 'expo-auth-session';


WebBrowser.maybeCompleteAuthSession();



export default function Index() {
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '127478076978-tlskt46g4c62iikofvi3dkqplvo3esim.apps.googleusercontent.com',
  });

  useEffect(() => {
  const tokenResponse = response as AuthSessionResult & { authentication?: TokenResponse };

  const idToken = tokenResponse?.authentication?.idToken;
  if (tokenResponse?.type === 'success' && idToken) {
    signInWithFirebase(idToken);
  }
}, [response]);


  const signInWithFirebase = async (idToken: string) => {
    try {
      const result = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=AIzaSyDt-nkE5QR2n2ShdDSFPPl86a16OvidQfw`,
        {
          postBody: `id_token=${idToken}&providerId=google.com`,
          requestUri: 'http://localhost',
          returnSecureToken: true,
        }
      );

      console.log('Authentication Success:', result.data);
      router.replace('../TODO-app/todo-app/app/todo.tsx');
    } catch (error) {
      console.error('Authentication Failed');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <Text variant="headlineMedium" style={styles.title}>
          Sage's Todo
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          List it. Do it. Done 
        </Text>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#d6d2ceff', padding: 20,
  },
  logo: {
    width: 100, height: 100, marginBottom: 20,
  },
  title: {
    fontWeight: 'bold', fontSize: 24,color: '#020a2aff', marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center', color: '#000000ff', marginBottom: 30,
  },
  googleButton: {
    backgroundColor: '#4285F4', paddingVertical: 12, paddingHorizontal: 20,
    borderRadius: 8, width: '100%', alignItems: 'center',
  },
  buttonText: {
    color: '#fff', fontWeight: 'bold', fontSize: 16,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform, StyleSheet } from 'react-native';

import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Typography } from '../../styles/core/typography';
import { Spacing } from '../../styles/core';

// You need to swap out the Auth0 client id and domain with the one from your Auth0 client.
// In your Auth0 client, you need to also add a url to your authorized redirect urls.
//
// For this application, I added https://auth.expo.io/@arielweinberger/with-auth0 because I am
// signed in as the 'arielweinberger' account on Expo and the name/slug for this app is 'with-auth0'.
//
// You can open this app in the Expo client and check your logs to find out your redirect URL.

const auth0ClientId = '9mesOdnRwXzfGBO6pSdvhLtNHMcttVYI';
const authorizationEndpoint = 'https://weight-stack.us.auth0.com/authorize';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

const Login = ({}) => {
  // Auth
  const [name, setName] = useState(null);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: 'id_token',
      // retrieve the user's profile
      scopes: ['openid', 'profile'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce',
      },
    },
    { authorizationEndpoint },
  );

  useEffect(() => {
    if (result) {
      if (result.type === 'success') {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        const decoded: any = jwtDecode(jwtToken);

        const { name } = decoded;
        setName(name);
      }
    }
  }, [result]);

  return (
    <View style={styles.container}>
      {name ? (
        <>
          <Text style={styles.title}>You are logged in, {name}!</Text>
          <Button title="Log out" onPress={() => setName(null)} />
        </>
      ) : (
        <Button
          disabled={!request}
          title="Log in with Auth0"
          onPress={() => promptAsync({ useProxy })}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: Colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.sectionTitle,
    textAlign: 'center',
    marginTop: Spacing.xl,
  },
});

export default Login;

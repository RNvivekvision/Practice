// Automatic form fill up using webview.
// Functionality is when user opens webview and any login page will be display and user can fill up the form automatically.
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { RNStyles } from '../../Common';
import WebView from 'react-native-webview';

const WebForm = ({}) => {
  const webViewRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      onWebPress();
    }, 3000);
  }, []);

  const onWebPress = async () => {
    try {
      webViewRef.current?.injectJavaScript(jsCode);
    } catch (e) {
      console.error('Error onWebPress -> ', e);
    }
  };

  const w3schools = `
    (function() {
      const names = {
        username: 'react_native_dev',
        email: 'abcd@gmail.com',
        password: '123456789',
        "new-password": 'new-password',
      };
      const inputFields = document.querySelectorAll('input');
      inputFields.forEach((input, index) => {
        setTimeout(() => {
          if (names[input.name]) {
            input.value = names[input.name];
          }
        }, index * 1000);
      });
      setTimeout(() => {
        const button = document.getElementsByTagName('button')[0];
        button.click()
      }, inputFields.length * 1000);
      true;
    })()
  `;

  const jsCode = `
    (function() {
      const names = {
        firstName: 'react-native',
        lastName: 'dev',
        username: 'reactnativedev',
        email: 'abcd@gmail.com',
        password: 'react@123456',
        text: 'This is text feild',
      };
      const inputFields = document.querySelectorAll('input');
      inputFields.forEach((input, index) => {
          setTimeout(() => {
            if (names[input.name]) {
              input.focus();
              // input.value = names[input.name];
              setTimeout(() => {
                input.value = "Hello World";
              }, 500);
            }
            }, index * 2000);
      });
      setTimeout(() => {
        // const button = document.getElementsByClassName('_acan')[0];
        // button.click()
      }, inputFields.length * 2000);
      true;
    })()
  `;

  return (
    <View style={RNStyles.container}>
      <WebView
        originWhitelist={['*']}
        ref={webViewRef}
        source={{
          uri:
            // 'https://profile.w3schools.com/sign-up' ||
            'https://www.instagram.com/accounts/login/' ||
            'https://cam.britannica.com/registration' ||
            'https://unsplash.com/join' ||
            'https://unsplash.com/login',
        }}
        javaScriptEnabled={true}
        onMessage={event => {
          console.log('onMessage -> ', { event });
        }}
        onBridgeMessage={(event, data) => {
          console.log('onBridgeMessage -> ', { event, data });
        }}
        onError={event => {
          console.log('onError -> ', { event });
        }}
      />
    </View>
  );
};

export default WebForm;

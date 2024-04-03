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
      webViewRef.current?.injectJavaScript(forms.w3schools);
    } catch (e) {
      console.error('Error onWebPress -> ', e);
    }
  };

  return (
    <View style={RNStyles.container}>
      <WebView
        originWhitelist={['*']}
        ref={webViewRef}
        source={{
          uri: links[0],
        }}
        javaScriptEnabled={true}
        onMessage={event => {
          console.log('onMessage -> ', event);
        }}
        onBridgeMessage={(event, data) => {
          console.log('onBridgeMessage -> ', event, data);
        }}
        onError={error => {
          console.log('onError -> ', error);
        }}
      />
    </View>
  );
};

const links = [
  'https://profile.w3schools.com/sign-up',
  'https://www.instagram.com/accounts/login/',
  'https://www.instagram.com/accounts/emailsignup/',
  'https://cam.britannica.com/registration',
];

const forms = {
  w3schools: `
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
  `,
  instagram: {
    login: `
      (function() {
        const names = {
          username: 'react_native_dev',
          password: 'react@123456',
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
          const button = document.getElementsByClassName('_acan')[1];
          button.removeAttribute("disabled");
          setTimeout(() => {
            button.click()
          }, 1000);
        }, inputFields.length * 1000);
        true;
      })()
    `,
    register: `
      (function() {
        const names = {
          phone: '9925599255',
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
          const button = document.getElementsByClassName('_acan')[1];
          button.removeAttribute("disabled");
          setTimeout(() => {
            button.click()
          }, 1000);
        }, inputFields.length * 1000);
        true;
      })()
    `,
  },
};

export default WebForm;

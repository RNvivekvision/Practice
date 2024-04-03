import React, { useRef, useState } from 'react';
import { FlatList, Keyboard, StyleSheet, View } from 'react-native';
import { RNButton, RNInput, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { useInset } from '../../Hooks';

const BaseUrl = 'https://api.openai.com/v1/chat/';

const OpenAi = () => {
  const styles = useStyles();
  const inputRef = useRef();
  const flatlistRef = useRef();
  const [State, setState] = useState({
    isLoading: false,
    Input: '',
    Response: [],
  });

  const clearInput = () =>
    setState(p => ({
      ...p,
      Input: '',
    }));

  const Completion = async () => {
    Keyboard.dismiss();
    if (State.Input.length === 0) return;
    clearInput();
    setState(p => ({
      ...p,
      Response: [...p.Response, { role: 'You', answer: State.Input }],
    }));
    setTimeout(() => {
      flatlistRef.current.scrollToEnd({ animated: true });
    }, 100);
    try {
      const response = await ApiCall({
        Endpoint: '/completions',
        Params: {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: State.Input }],
          temperature: 0.5,
        },
      });

      if (response?.choices?.length > 0) {
        const answers = response?.choices?.map(v => ({
          role: 'Assistant',
          answer: v?.message?.content,
        }));
        setState(p => ({ ...p, Response: [...p.Response, ...answers] }));
      }
      clearInput();
      setTimeout(() => {
        // inputRef.current.focus();
        flatlistRef.current.scrollToEnd({ animated: true });
      }, 100);
      console.log('Completion response -> ', JSON.stringify(response, null, 2));
    } catch (e) {
      console.log('Completion Error -> ', JSON.stringify(e, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatlistRef}
        data={State.Response}
        keyExtractor={(v, i) => String(i)}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: hp(2) }}
        indicatorStyle={'white'}
        renderItem={({ item }) => {
          const isYou = item.role == 'You';
          return (
            <View
              style={[
                styles.renderItems,
                { alignSelf: isYou ? 'flex-end' : 'flex-start' },
              ]}>
              <RNText
                align={isYou ? 'right' : 'left'}
                style={styles.renderAnswer}>
                {item?.answer}
              </RNText>
            </View>
          );
        }}
      />
      <View style={styles.inputContainer}>
        <RNInput
          ref={inputRef}
          placeholder={'Enter your query'}
          placeholderTextColor={Colors.Primary}
          value={State.Input}
          onChangeText={t => setState(p => ({ ...p, Input: t }))}
          style={styles.Input}
          onSubmitEditing={Completion}
          autoCapitalize={'sentences'}
        />
        <RNButton
          title={'Send'}
          style={styles.sendButton}
          textStyle={{ fontSize: FontSize.font14 }}
          onPress={Completion}
        />
      </View>
    </View>
  );
};

const useStyles = () => {
  const inset = useInset();

  return StyleSheet.create({
    container: {
      ...RNStyles.container,
      backgroundColor: Colors.Black,
    },
    inputContainer: {
      ...RNStyles.flexRowBetween,
      backgroundColor: Colors.Black,
      paddingBottom: inset.bottom,
      paddingVertical: hp(0.5),
      paddingHorizontal: wp(2),
    },
    Input: {
      flex: 1,
      borderWidth: 1,
      borderColor: Colors.Primary,
      borderRadius: wp(3),
      fontSize: FontSize.font12,
      color: Colors.Primary,
    },
    sendButton: {
      paddingVertical: hp(1),
      marginLeft: wp(2),
      marginRight: 0,
    },
    renderItems: {
      backgroundColor: Colors.Primary,
      maxWidth: '75%',
      borderRadius: wp(3),
      paddingHorizontal: wp(4),
      paddingVertical: hp(1),
      marginHorizontal: wp(2),
      marginVertical: hp(0.5),
    },
    renderAnswer: {
      color: Colors.White,
      fontSize: FontSize.font13,
      fontFamily: FontFamily.SemiBold,
    },
  });
};

export default OpenAi;

const ApiKey = `sess-YKFmJoCH3vyj1Keb3MRHHbQ0MHThvuCCGulxmmeL`;
const ApiCall = async ({ Endpoint, Params }) => {
  const ToJson = await fetch(BaseUrl + Endpoint, {
    method: 'POST',
    body: JSON.stringify(Params),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ApiKey}`,
    },
  });
  const response = await ToJson?.json();
  return response;
};

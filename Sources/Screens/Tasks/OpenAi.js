import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, Image, View } from 'react-native';
import { RNButton, RNInput, RNLoader, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { useInset } from '../../Hooks';

const BaseUrl = 'https://api.openai.com/v1';

const OpenAi = () => {
  const styles = useStyles();
  const flatlistRef = useRef();
  const [State, setState] = useState({
    isLoading: false,
    Input: '',
    N: '',
    Response: [],
  });

  const Completion = async () => {
    if (State.Input.length === 0) return;
    setState(p => ({
      ...p,
      Input: '',
      Response: [...p.Response, { role: 'You', answer: State.Input }],
    }));
    setTimeout(() => {
      flatlistRef.current.scrollToEnd({ animated: true });
    }, 10);

    try {
      const response = await ApiCall({
        Endpoint: '/chat/completions',
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
      } else {
        alert(response?.error?.message);
      }
      console.log('Completion response -> ', JSON.stringify(response, null, 2));
    } catch (e) {
      console.log('Error Completion -> ', JSON.stringify(e, null, 2));
    } finally {
      setState(p => ({ ...p, Input: '' }));
      setTimeout(() => {
        flatlistRef.current.scrollToEnd({ animated: true });
      }, 10);
    }
  };

  const ImageGeneration = async () => {
    if (State.N.length === 0) return;
    setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await ApiCall({
        Endpoint: '/images/generations',
        Params: {
          model: 'dall-e-2',
          prompt: State.Input,
          n: Number(State.N),
          size: '1024x1024',
        },
      });
      if (response?.data?.length > 0) {
        setState(p => ({ ...p, Response: [...p.Response, ...response?.data] }));
      } else {
        alert(response?.error?.message);
      }
      console.log(
        'ImageGeneration response -> ',
        JSON.stringify(response, null, 2),
      );
    } catch (e) {
      console.log('Error ImageGeneration -> ', JSON.stringify(e, null, 2));
    } finally {
      setState(p => ({ ...p, Input: '', N: '', isLoading: false }));
      setTimeout(() => {
        flatlistRef.current.scrollToEnd({ animated: true });
      }, 10);
    }
  };

  return (
    <View style={styles.container}>
      <RNLoader visible={State.isLoading} />
      <FlatList
        ref={flatlistRef}
        data={State.Response}
        keyExtractor={(v, i) => String(i)}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: hp(2) }}
        indicatorStyle={'white'}
        renderItem={({ item }) => {
          const isYou = item.role == 'You';
          return (
            <View
              style={[
                styles.renderItems,
                { alignSelf: isYou ? 'flex-end' : 'flex-start' },
              ]}>
              {item?.answer?.length > 0 && (
                <RNText style={styles.renderAnswer}>{item?.answer}</RNText>
              )}
              {item?.url?.length > 0 && (
                <Image
                  source={{ uri: item.url }}
                  resizeMode={'contain'}
                  style={styles.renderImages}
                />
              )}
            </View>
          );
        }}
      />
      <View style={styles.inputContainer}>
        <RNInput
          placeholder={'Message ChatGPT...'}
          placeholderTextColor={Colors.Primary}
          value={State.Input}
          onChangeText={t => setState(p => ({ ...p, Input: t }))}
          style={styles.Input}
          onSubmitEditing={State.N.length > 0 ? ImageGeneration : Completion}
          autoCapitalize={'sentences'}
        />
        <RNInput
          placeholder={'N'}
          placeholderTextColor={Colors.Primary}
          value={State.N}
          onChangeText={t => setState(p => ({ ...p, N: t }))}
          style={styles.N}
          maxLength={1}
          keyboardType={'numeric'}
        />
        <RNButton
          title={'Send'}
          style={styles.sendButton}
          textStyle={{ fontSize: FontSize.font14 }}
          onPress={State.N.length > 0 ? ImageGeneration : Completion}
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
    N: {
      borderWidth: 1,
      borderColor: Colors.Primary,
      marginLeft: wp(2),
      borderRadius: wp(2),
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
      paddingHorizontal: wp(1),
      paddingVertical: hp(0.5),
      marginHorizontal: wp(2),
      marginVertical: hp(0.5),
    },
    renderAnswer: {
      color: Colors.White,
      fontSize: FontSize.font13,
      fontFamily: FontFamily.SemiBold,
      paddingVertical: hp(1),
      paddingHorizontal: wp(2),
    },
    renderImages: {
      width: wp(40),
      height: wp(40),
      borderRadius: wp(3),
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

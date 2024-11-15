import { StyleSheet, View } from 'react-native';
import {
  RNButton,
  RNContainer,
  RNInput,
  RNScrollView,
  RNStyles,
  RNText,
} from '../../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../../Theme';
import { useEffect, useState } from 'react';
import { addTodo, getTodo } from '../../../Services';

export default function TodoDetail({ navigation, route }) {
  const { _id, title, description } = route.params;
  const [State, setState] = useState({
    id: _id ?? null,
    title: title ?? '',
    description: description ?? '',
    isLoading: false,
  });
  const isEmpty = !State.title || !State.description;

  useEffect(() => {
    gettingTodo();
  }, []);

  // Getting todo with query paramters...
  const gettingTodo = async () => {
    setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await getTodo({ id: _id });
      // console.log('response -> ', JSON.stringify(response, null, 2));
    } catch (e) {
      console.error('Error gettingTodo -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const addingTodo = async () => {
    if (isEmpty) return;
    setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await addTodo({
        title: State.title?.trim(),
        description: State.description?.trim(),
      });
      if (response?.status === 200) navigation.goBack();
    } catch (e) {
      console.error('Error addingTodo -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const updatingTodo = () => {
    if (isEmpty) return;
    setState(p => ({ ...p, isLoading: true }));
    try {
    } catch (e) {
      console.error('Error updatingTodo -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const deleteingTodo = () => {
    if (isEmpty) return;
    setState(p => ({ ...p, isLoading: true }));
    try {
    } catch (e) {
      console.error('Error deleteingTodo -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  return (
    <RNContainer isLoading={State.isLoading}>
      <RNScrollView>
        <View style={styles.inputContainer}>
          <RNText style={styles.title}>{'Title'}</RNText>
          <RNInput
            placeholder={'Please enter your title here!'}
            style={styles.input}
            value={State.title}
            onChangeText={v => setState(p => ({ ...p, title: v }))}
          />
        </View>

        <View style={styles.inputContainer}>
          <RNText style={styles.title}>{'Description'}</RNText>
          <RNInput
            placeholder={'Please enter your description here!'}
            style={[styles.input, { minHeight: hp(15) }]}
            multiline={true}
            value={State.description}
            onChangeText={v => setState(p => ({ ...p, description: v }))}
          />
        </View>

        <View style={styles.buttonContainer}>
          <RNButton
            title={_id ? 'Update' : 'Save'}
            style={styles.button}
            onPress={_id ? updatingTodo : addingTodo}
          />
          {_id && (
            <RNButton
              title={'Delete'}
              style={styles.delete}
              onPress={deleteingTodo}
            />
          )}
        </View>
      </RNScrollView>
    </RNContainer>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
    ...RNStyles.shadow,
    backgroundColor: Colors.White,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    borderRadius: wp(3),
  },
  title: {
    fontSize: FontSize.font18,
    fontFamily: FontFamily.Medium,
  },
  input: {
    ...RNStyles.shadow,
    backgroundColor: Colors.White,
    maxHeight: hp(15),
    borderRadius: wp(3),
    marginBottom: 0,
  },
  buttonContainer: {
    ...RNStyles.flexRow,
    paddingVertical: hp(2),
  },
  button: {
    flex: 1,
  },
  delete: {
    flex: 1,
    backgroundColor: Colors.error,
  },
});

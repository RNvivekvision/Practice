import { StyleSheet, View } from 'react-native';
import { RNContainer, RNText } from '../../../Common';
import { useEffect, useState } from 'react';
import { getTodos } from '../../../Services';

export default function TodoApp() {
  const [State, setState] = useState({ isLoading: false });

  useEffect(() => {
    gettingTodos();
  }, []);

  const gettingTodos = async () => {
    setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await getTodos();
    } catch (e) {
      console.error('Error gettingTodos -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  return (
    <RNContainer isLoading={State.isLoading}>
      <View>
        <RNText>{'RN TODO APP'}</RNText>
      </View>
    </RNContainer>
  );
}

const styles = StyleSheet.create({});

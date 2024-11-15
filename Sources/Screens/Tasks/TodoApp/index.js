import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { RNContainer, RNPlus } from '../../../Common';
import { useEffect, useState } from 'react';
import { deleteTodo, getTodos } from '../../../Services';
import { RenderTodo } from '../../../Components';
import { Colors, hp } from '../../../Theme';
import { NavRoutes } from '../../../Navigation';
import { Functions } from '../../../Utils';

export default function TodoApp({ navigation }) {
  const [State, setState] = useState({
    isLoading: false,
    todos: [],
    refresh: false,
  });

  useEffect(() => {
    gettingTodos(true);
  }, []);

  const gettingTodos = async isLoading => {
    setState(p => ({ ...p, isLoading: isLoading }));
    try {
      const response = await getTodos();
      if (!response?.data?.length > 0) return;
      const todos = response?.data;
      setState(p => ({ ...p, todos: todos }));
    } catch (e) {
      console.error('Error gettingTodos -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onDeletePress = async item => {
    setState(p => ({ ...p, isLoading: true }));
    try {
      const response = deleteTodo({ id: item._id });
      const todos = State.todos.filter(v => v._id !== item._id);
      setState(p => ({ ...p, todos: todos }));
    } catch (e) {
      console.error('Error onDeletePress -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onRefresh = async () => {
    setState(p => ({ ...p, refresh: true }));
    await gettingTodos();
    await Functions.wait(1000);
    setState(p => ({ ...p, refresh: false }));
  };

  return (
    <RNContainer isLoading={State.isLoading}>
      <RNPlus
        onPress={() => navigation.navigate(NavRoutes.TodoDetail, { _id: null })}
      />
      <FlatList
        data={State.todos}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={{ paddingVertical: hp(2) }}
        renderItem={({ item, index }) => (
          <RenderTodo item={item} index={index} onDeletePress={onDeletePress} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={State.refresh}
            onRefresh={onRefresh}
            colors={[Colors.Primary]}
            tintColor={Colors.Primary}
          />
        }
      />
    </RNContainer>
  );
}

const styles = StyleSheet.create({});

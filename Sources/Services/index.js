import { FetchMethod, URL } from './Api';

const getTodos = async () => {
  const response = await FetchMethod.GET({
    EndPoint: URL.getTodos,
    NeedToken: false,
  });
  return response;
};

const addTodo = async ({ title, description }) => {
  const response = await FetchMethod.POST({
    EndPoint: URL.addTodo,
    Params: { title, description },
  });
  return response;
};

const getTodo = async ({ id }) => {
  const response = await FetchMethod.GET({
    EndPoint: `${URL.getTodo}/${id}`,
    NeedToken: false,
  });
  return response;
};

const deleteTodo = async ({ id }) => {
  const response = await FetchMethod.DELETE({
    EndPoint: `${URL.deleteTodo}/${id}`,
    NeedToken: false,
  });
  return response;
};

export { getTodos, addTodo, getTodo, deleteTodo };

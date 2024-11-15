const BASE_URL = 'http://localhost:8000';
// const BASE_URL = 'http://10.0.2.2:8000';

const URL = {
  BaseUrl: BASE_URL,
  AppUrl: `${BASE_URL}`,
  getTodos: '/todos',
  addTodo: '/todos/add-todo',
  getTodo: '/todos/get-todo',
  deleteTodo: '/todos/delete-todo',
};

export default URL;

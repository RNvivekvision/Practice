import { Functions } from '../Utils';
import { FetchMethod, URL } from './Api';

const getTodos = async () => {
  await Functions.wait(1000);
  const response = await FetchMethod.GET({
    EndPoint: URL.getTodos,
    NeedToken: false,
  });
  return response;
};

export { getTodos };

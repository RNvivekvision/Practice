// import Axios from 'axios';
import { Functions } from '../../Utils';
import URL from './URL';

const REQUEST = async ({
  Method,
  EndPoint,
  Params,
  IsformData = false,
  NeedToken = true,
}) => {
  // const appData = await Functions.getAppData();
  // console.log('appData -> ', JSON.stringify(appData, null, 2));
  const appData = {};
  const Headers = Header(NeedToken, appData?.token, IsformData);
  const payload = {
    method: Method,
    headers: Headers,
    data: Params,
    url: URL.AppUrl + EndPoint,
  };
  console.log('PAYLOAD => ', JSON.stringify(payload, null, 2));
  // const response = await Axios(payload);
  // return response.data;

  // fetch method......
  // const responseJson = await fetch(payload.url, {
  //   method: Method,
  //   body: JSON.stringify(Params),
  //   headers: Headers,
  // });
  await Functions.wait(1000);
  const responseJson = await Promise.race([
    fetch(payload.url, {
      method: Method,
      body: JSON.stringify(Params),
      headers: Headers,
    }),
    new Promise(res =>
      setTimeout(() => res(resolving), Functions.requestTimeout),
    ),
  ]);
  const response = await responseJson?.json();
  console.log('RESPONSE => ', JSON.stringify(response, null, 2));
  return Functions.handleResponse(response);
};
const Header = (NeedToken, Token, IsformData) => {
  let apiHeaders = {
    Accept: '*/*',
    'Content-Type': IsformData ? 'multipart/form-data' : 'application/json',
  };
  if (NeedToken) {
    apiHeaders = { ...apiHeaders, Authorization: `Bearer ${Token}` };
  }
  return apiHeaders;
};
const resolving = { json: () => errorResponse };
const errorResponse = {
  status: 400,
  message: 'Something went wrong. Please try again!',
  data: null,
};
export default REQUEST;

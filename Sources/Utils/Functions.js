import { Alert, Linking, Share } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const requestTimeout = 20000;
const ALERT = ({ Title, Text, Buttons }) => Alert.alert(Title, Text, Buttons);

const OpenUrl = url => Linking.openURL(url);

const wait = ms => new Promise(r => setTimeout(r, ms));

const setAppData = async data => {
  const previousValue = await getAppData();
  if (previousValue) {
    await AsyncStorage.setItem(
      'appdata',
      JSON.stringify({ ...previousValue, ...data }),
    );
  } else {
    await AsyncStorage.setItem('appdata', JSON.stringify(data));
  }
};

const getAppData = async () => {
  const value = await AsyncStorage.getItem('appdata');
  return JSON.parse(value);
};

const formatDate = ({ date, format = 'DD-MM-YYYY' }) => {
  if (!date) return null;
  const d = moment(date).format(format);
  return d;
};

const handleResponse = response => {
  if (response?.status === 401) {
    return {
      status: 401,
      message: 'Unauthorized. Please login again.',
      data: null,
    };
  }
  // if (response?.status !== 200) {
  //   if (response?.message == 'No records found') return response;
  //   Toast.error(response?.message ?? 'Something went wrong. Please try again.');
  // }
  return response;
};

const validateImage = async (pic, def) => {
  try {
    const { status } = await fetch(pic);
    const src = status === 200 ? { uri: pic } : def;
    return src;
  } catch (e) {
    // console.log('Error Functions getImage -> ', e);
    return def;
  }
};

const Functions = {
  requestTimeout,
  ALERT,
  OpenUrl,
  setAppData,
  getAppData,
  wait,
  formatDate,
  handleResponse,
  validateImage,
};

export default Functions;

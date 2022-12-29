import axios from 'axios';
import network from '../constants/network';
import {APPLE_LOGIN} from './types';

export async function appleLogin(dataToSubmit: any) {
  const request = await axios
    .post(`${network}/login/apple`, dataToSubmit)
    .then(response => response.data);
  return {
    type: APPLE_LOGIN,
    payload: request,
  };
}

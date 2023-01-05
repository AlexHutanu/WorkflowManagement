import axios, { AxiosResponse } from 'axios'
import { HttpMethods } from '../constants/httpsMethods'
import { getFromLocalStorage } from './localStorage'


interface IAxiosCallReturn<T> {
   data: T | null;
   error: boolean;
}

interface IAxiosCallOptions<T> {
   method?: HttpMethods;
   auth?: boolean;
   requestBody?: T
}

export const callAxios = async <K, T = unknown>(URL: string, options: IAxiosCallOptions<T>): Promise<IAxiosCallReturn<K>> => {
   let data: K;
   let response: AxiosResponse;
   try {
      const { auth, method, requestBody } = options;
      const token = getFromLocalStorage('token');
      let axiosConfig = {}

      if(auth) {
         axiosConfig = { headers: { authorization: `Bearer ${token}` } }
      }

      switch (method) {
         case HttpMethods.GET:
            response = await axios.get<K>(URL, axiosConfig)
            break;
         case HttpMethods.POST:
            response = await axios.post<K>(URL, requestBody, axiosConfig)
            break
         case HttpMethods.PATCH:
            response = await axios.patch<K>(URL, requestBody, axiosConfig)
            break;
         case HttpMethods.PUT:
            response = await axios.put<K>(URL, requestBody, axiosConfig)
            break;
         case HttpMethods.DELETE:
            response = await axios.delete<K>(URL, axiosConfig);
            break;
         default:
            throw new Error(`Invalid method`);
      }
      data = response.data

      return {data, error: false}
   } catch (err: unknown) {
      return {data: null, error: true}
   }
}
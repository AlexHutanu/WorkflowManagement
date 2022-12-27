import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpMethods } from '../constants/httpsMethods'
import { getFromLocalStorage } from './localStorage'


interface IAxiosCallReturn {
   data: unknown;
   error: boolean;
}

interface IAxiosCallOptions<T> {
   method?: HttpMethods;
   auth?: boolean;
   requestBody?: T
}

export const callAxios = async <T = unknown>(URL: string, options: IAxiosCallOptions<T>): Promise<IAxiosCallReturn> => {
   let data: unknown = null
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
            response = await axios.get(URL, axiosConfig)
            break;
         case HttpMethods.POST:
            response = await axios.post(URL, requestBody, axiosConfig)
            break
         case HttpMethods.PATCH:
            response = await axios.patch(URL, requestBody, axiosConfig)
            break;
         case HttpMethods.PUT:
            response = await axios.put(URL, requestBody, axiosConfig)
            break;
         case HttpMethods.DELETE:
            response = await axios.delete(URL, axiosConfig);
            break;
         default:
            throw new Error(`Invalid method`);
      }
      data = response.data

      return {data, error: false}
   } catch (err: unknown) {
      data = err
      return {data, error: true}
   }
}
import { getFromLocalStorage } from './localStorage'


export const checkJwtValidity = (): boolean => {
   const token = getFromLocalStorage("token");
   if(!token){
      return false;
   }
   // check token
   return true;
}
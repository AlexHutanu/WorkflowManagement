import { getFromLocalStorage } from './localStorage'

interface ITokenData {
   issuer: string;
   exp: number;
}

const getDecodedToken = (): ITokenData | null => {
   const token = getFromLocalStorage('token')
   if (!token) {
      return null
   }
   const base64Url = token.split('.')[1]
   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
   const jsonPayload = decodeURIComponent(
      window
         .atob(base64)
         .split('')
         .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
         .join('')
   )
   return JSON.parse(jsonPayload)

}

const getTokenExpirationDate = (): number | null => {
   const decodedToken = getDecodedToken()

   return decodedToken && decodedToken.exp
}

export const isTokenValid = (): boolean => {
   const tokenExpirationTime = getTokenExpirationDate();
   if (!tokenExpirationTime) {
      return false;
   }
   const nowUnixTime = Math.floor(Date.now() / 1000);
   return tokenExpirationTime >= nowUnixTime;
};

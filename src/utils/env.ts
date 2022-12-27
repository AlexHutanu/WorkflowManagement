export interface IEnv {
   VITE_API_URL?: string;
}

declare global {
   interface Window {
      env: IEnv;
   }
}

export const getEnvironmentVariable = (
   environmentVariableKey: keyof IEnv,
): string | undefined =>
   window.env?.[environmentVariableKey] ||
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   // @ts-ignore
   import.meta.env[environmentVariableKey];

export enum EnvironmentVariableKey {
   VITE_API_URL = 'VITE_API_URL',
}

export const API_BASE_URL = getEnvironmentVariable(
   EnvironmentVariableKey.VITE_API_URL,
);
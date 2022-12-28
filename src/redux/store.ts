import {configureStore} from '@reduxjs/toolkit';

import homepageTab from './homepageTab';

const store = configureStore({
   reducer: {
      homepageTab
   }
})

export type RootState = ReturnType<typeof store.getState>
export default store
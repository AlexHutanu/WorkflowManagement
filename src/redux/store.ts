import {configureStore} from '@reduxjs/toolkit';

import boardId from './boardId';

const store = configureStore({
   reducer: {
      boardId
   },
})

export type RootState = ReturnType<typeof store.getState>
export default store
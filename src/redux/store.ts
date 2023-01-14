import { configureStore } from '@reduxjs/toolkit'

import boardId from './boardId'
import searchModal from './searchModal'


const store = configureStore({
   reducer: {
      boardId,
      searchModal
   }
})

export type RootState = ReturnType<typeof store.getState>
export default store
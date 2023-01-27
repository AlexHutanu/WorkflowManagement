import { configureStore } from '@reduxjs/toolkit'

import boardId from './boardId'
import searchModal from './searchModal'
import createBoardModal from './createBoardModal'
import showBoardsSearchModal from './showBoardsSearchModal'


const store = configureStore({
   reducer: {
      boardId,
      searchModal,
      createBoardModal,
      showBoardsSearchModal
   }
})

export type RootState = ReturnType<typeof store.getState>
export default store
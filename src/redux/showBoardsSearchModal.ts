import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export const showBoardsSearchModalSlice = createSlice({
   name: "showBoardsSearchModal",
   initialState: {
      showBoardsSearchModal: false
   },
   reducers: {
      setShowBoardsSearchModal: (state, action: PayloadAction<boolean>) => {
         state.showBoardsSearchModal = action.payload
      }

   }
})

export const { setShowBoardsSearchModal } = showBoardsSearchModalSlice.actions
export default showBoardsSearchModalSlice.reducer
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export const createBoardModalSlice = createSlice({
   name: "createBoardModal",
   initialState: {
      createBoardModal: false
   },
   reducers: {
      setCreateBoardModal: (state, action: PayloadAction<boolean>) => {
         state.createBoardModal = action.payload
      }

   }
})

export const { setCreateBoardModal } = createBoardModalSlice.actions
export default createBoardModalSlice.reducer
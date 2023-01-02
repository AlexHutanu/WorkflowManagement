import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export const boardIdSlice = createSlice({
   name: "boardId",
   initialState: {
      boardId: ''
   },
   reducers: {
      setBoardId: (state, action: PayloadAction<string>) => {
         state.boardId = action.payload
      }

   }
})

export const { setBoardId } = boardIdSlice.actions
export default boardIdSlice.reducer
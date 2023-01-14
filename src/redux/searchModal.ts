import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export const searchModalSlice = createSlice({
   name: "searchModal",
   initialState: {
      searchModal: false
   },
   reducers: {
      setSearchModal: (state, action: PayloadAction<boolean>) => {
         state.searchModal = action.payload
      }

   }
})

export const { setSearchModal } = searchModalSlice.actions
export default searchModalSlice.reducer
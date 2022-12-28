import { createSlice } from '@reduxjs/toolkit'


export const homepageTabSlice = createSlice({
   name: "homepageTab",
   initialState: {
      dashboard: true,
      boards: false,
      tasks: false
   },
   reducers: {
      setDashboard: (state) => {
         state.dashboard = true;
         state.boards = false;
         state.tasks = false;
      },
      setBoards: (state) => {
         state.dashboard = false;
         state.boards = true;
         state.tasks = false;
      },
      setTasks: (state) => {
         state.dashboard = false;
         state.boards = false;
         state.tasks = true;
      }
   }
})

export const { setDashboard, setBoards, setTasks } = homepageTabSlice.actions
export default homepageTabSlice.reducer
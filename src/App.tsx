import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { FormType } from './components/Forms/AuthForm/AuthForm'

import './components/sharedStyles/all.scss'
import { UrlPaths } from './constants/urlPaths'
import AuthPage from './pages/AuthPage'
import BoardsPage from './pages/BoardsListPage'
import DashboardPage from './pages/DashboardPage'
import TicketsPage from './pages/TasksPage/TasksPage'


export default () => {
   return (
         <Router>
            <Routes>
               <Route element={<AuthPage authType={FormType.SIGNIN}/>} path={UrlPaths.LOGIN}/>
               <Route element={<AuthPage authType={FormType.SIGNUP}/>} path={UrlPaths.REGISTER}/>
               <Route element={<DashboardPage/>} path={UrlPaths.DASHBOARD}/>
               <Route element={<BoardsPage/>} path={'/boards/:id'}/>
               <Route element={<TicketsPage/>} path={'/tickets'}/>
            </Routes>
         </Router>
   )
}
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { FormType } from './components/Forms/AuthForm/AuthForm'

import './components/sharedStyles/all.scss'
import Tickets from './components/Tickets'
import { UrlPaths } from './constants/urlPaths'
import AuthPage from './pages/AuthPage'
import BoardPage from './pages/BoardPage'
import DashboardPage from './pages/DashboardPage'
import TicketsPage from './pages/MyIssuesPage/MyIssuesPage'


export default () => {
   return (
         <Router>
            <Routes>
               <Route element={<AuthPage authType={FormType.SIGNIN}/>} path={UrlPaths.LOGIN}/>
               <Route element={<AuthPage authType={FormType.SIGNUP}/>} path={UrlPaths.REGISTER}/>
               <Route element={<DashboardPage/>} path={UrlPaths.DASHBOARD}/>
               <Route element={<TicketsPage/>} path={UrlPaths.TICKETS}/>
               <Route element={<BoardPage/>} path={'/boards/:board'} />
               <Route element={<Tickets />} path={'/tickets/:ticket'} />
            </Routes>
         </Router>
   )
}
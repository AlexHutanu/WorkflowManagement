import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { FormType } from './components/Forms/AuthForm/AuthForm'

import './components/sharedStyles/all.scss'
import { UrlPaths } from './constants/urlPaths'
import AuthPage from './pages/AuthPage'
import BoardPage from './pages/BoardPage'
import Boards from './pages/BoardsListPage'
import DashboardPage from './pages/DashboardPage'
import TicketsPage from './pages/TasksPage/TasksPage'


export default () => {
   return (
      <Router>
         <Routes>
            <Route element={<AuthPage authType={FormType.SIGNIN}/>} path={UrlPaths.LOGIN} />
            <Route element={<AuthPage authType={FormType.SIGNUP}/>} path={UrlPaths.REGISTER} />
            <Route element={<DashboardPage />} path={UrlPaths.DASHBOARD} />
            <Route element={<Boards />} path={'/boards'} />
            <Route element={<TicketsPage />} path={'/tickets'} />
            <Route element={<BoardPage />} path={'/board'} />
         </Routes>
      </Router>
   )
}
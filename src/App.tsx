import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';

import './components/sharedStyles/all.scss';
import BoardPage from './pages/BoardPage'
import Boards from './pages/BoardsListPage'
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import TicketsPage from './pages/TicketsPage/TicketsPage'

export default () => {
   return (
      <Router>
         <Routes>
            <Route element={<AuthPage />} path={'/login'} />
            <Route element={<DashboardPage />} path={'/'} />
            <Route element={<Boards />} path={'/boards'} />
            <Route element={<TicketsPage />} path={'/tickets'} />
            <Route element={<BoardPage />} path={'/board'} />
         </Routes>
      </Router>
   )
}
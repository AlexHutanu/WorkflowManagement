import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';

import './components/sharedStyles/all.scss';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

export default () => {
   return (
      <Router>
         <Routes>
            <Route element={<AuthPage />} path={'/login'} />
            <Route element={<HomePage />} path={'/'} />

         </Routes>
      </Router>
   )
}
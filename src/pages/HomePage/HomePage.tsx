import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../components/Header'
import DesktopNavBar from '../../components/DesktopNavBar'
import Board from '../../components/Board'
import Activity from '../../components/Activity'
import { UrlPaths } from '../../constants/urlPaths'
import { checkJwtValidity } from '../../utils/jwt'

export default () => {

   const navigate = useNavigate()

   useEffect(() => {
      const isJwtValid = checkJwtValidity();
      !isJwtValid && navigate(UrlPaths.LOGIN)
   }, [])

   return (
      <div className="home-page">
         <div className="home-page__section-1">
            <div className="home-page__section-1__desktop-nav-bar">
               <DesktopNavBar/>
            </div>
         </div>
         <div className="home-page__section-2">
            <div className="home-page__section-2__header">
               <Header/>
            </div>
            <div className="home-page__section-2__board">
               <Board/>
            </div>
         </div>
         <div className="home-page__section-3">
            <div className="home-page__section-3__activity">
               <Activity/>
            </div>
         </div>
      </div>
   )
}
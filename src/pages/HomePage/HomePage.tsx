import Activity from '../../components/Activity'
import Board from '../../components/Board'
import DesktopNavBar from '../../components/DesktopNavBar'
import Header from '../../components/Header'


export default () => {
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
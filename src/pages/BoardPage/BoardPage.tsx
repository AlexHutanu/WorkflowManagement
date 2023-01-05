import DesktopNavBar from '../../components/DesktopNavBar'
import Header from '../../components/Header'
import Tickets from '../../components/Tickets'


export default () => {

   return (
      <div className="board-page__wrapper">
         <div className="nav--bar">
            <DesktopNavBar />
         </div>
         <div className="board-page">
            <div className="header">
               <Header />
            </div>
            <div className="board-page__tickets">
               <Tickets />
            </div>
         </div>
      </div>
   )
}
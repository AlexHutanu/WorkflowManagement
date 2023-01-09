import DesktopNavBar from '../../components/NavBar'
import Header from '../../components/Header'


export default () => {
   return (
      <div className="tickets-page__wrapper">
         <div className="nav--bar">
            <DesktopNavBar/>
         </div>
         <div className="tickets-page">
            <Header/>
            <p>TicketsPage</p>
         </div>
      </div>
   )
}
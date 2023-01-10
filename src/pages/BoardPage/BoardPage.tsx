import { useParams } from 'react-router-dom'
import CreateTicketModal from '../../components/Modals/CreateTicket'
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'
import Tickets from '../../components/Tickets'


export default () => {

   const params = useParams()

   return (
      <div className="board-page__wrapper">
         <div className="nav--bar">
            <NavBar />
         </div>
         <div className="board-page">
            <div className="header">
               <Header />
            </div>
            <div className="board-page__create-new-ticket">
               <CreateTicketModal />
            </div>
            <div className="board-page__tickets">
               <Tickets />
            </div>
         </div>
      </div>
   )
}
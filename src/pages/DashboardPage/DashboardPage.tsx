import { useEffect, useState } from 'react'
import CircularProgress from '../../components/CircularProgress/CircularProgress'
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import DoneIcon from '../../icons/DoneIcon'
import InProgressIcon from '../../icons/InProgressIcon'
import ProjectIcon from '../../icons/ProjectIcon'
import { IBoard } from '../../interfaces/Board'
import { ITicket } from '../../interfaces/Ticket'
import { IUser } from '../../interfaces/User'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'


export default () => {

   const [ user, setUser ] = useState<IUser>()

   const [ userTickets, setUserTickets ] = useState<ITicket[]>()

   const [ noOfBoards, setNoOfBoards ] = useState<number>()

   let inProgressTickets = userTickets && userTickets.filter(ticket => ticket.status === 1).length
   let doneTickets = userTickets && userTickets.filter(ticket => ticket.status === 2).length
   let toDoTickets = userTickets && userTickets.filter(ticket => ticket.status === 0).length

   useEffect(() => {
      (async () => {
         const {
            data: userData,
            error: userError
         } = await callAxios<IUser>(`${API_BASE_URL}${UrlPaths.LOGGED_USER}`, {
            method: HttpMethods.GET,
            auth: true
         })
         !userError && userData && setUser(userData)
         const {
            data: boardsData,
            error: boardsError
         } = await callAxios<IBoard[]>(`${API_BASE_URL}${UrlPaths.BOARDS}`, {
            method: HttpMethods.GET,
            auth: true
         })

         !boardsError && boardsData && setNoOfBoards(boardsData.length)
      })()
   }, [])


   useEffect(() => {
      if (user) {
         (async () => {
            const {
               data: userTicketsData,
               error: useTicketsError
            } = await callAxios<ITicket[]>(`${API_BASE_URL}${UrlPaths.TICKETS}/${user.id}/usertickets`, {
               method: HttpMethods.GET,
               auth: true
            })
            !useTicketsError && userTicketsData && setUserTickets(userTicketsData)
         })()
      }
   }, [ user ])

   return (
      <div className="dashboard-page__wrapper">
         <div className="nav--bar">
            <NavBar/>
         </div>
         <div className="dashboard-page">
            <Header/>
            <div className="dashboard-page__sections">
               <div className="dashboard-page__section">
                  <div className="dashboard-page__section__element">
                     <div className="dashboard-page__section__element__info">
                        <p className="dashboard-page__section__element__info__number">
                           {inProgressTickets}
                        </p>
                        <p className="dashboard-page__section__element__info__name">
                           Tasks in progress
                        </p>
                     </div>
                     <div className="dashboard-page__section__element__icon">
                        <InProgressIcon/>
                     </div>
                  </div>
                  <div className="dashboard-page__section__element">
                     <div className="dashboard-page__section__element__info">
                        <p className="dashboard-page__section__element__info__number">
                           {doneTickets}
                        </p>
                        <p className="dashboard-page__section__element__info__name">
                           Completed tickets
                        </p>
                     </div>
                     <div className="dashboard-page__section__element__icon">
                        <DoneIcon/>
                     </div>
                  </div>
                  <div className="dashboard-page__section__element">
                     <div className="dashboard-page__section__element__info">
                        <p className="dashboard-page__section__element__info__number">
                           {noOfBoards}
                        </p>
                        <p className="dashboard-page__section__element__info__name">
                           On going boards
                        </p>
                     </div>
                     <div className="dashboard-page__section__element__icon">
                        <ProjectIcon/>
                     </div>
                  </div>
               </div>
               <div className="dashboard-page__section">
                  <CircularProgress noTickets={toDoTickets ?? 0}
                                    noTotalTickets={userTickets?.length ?? 0}
                                    ticketStatus={'To Do'}/>
                  <CircularProgress noTickets={inProgressTickets ?? 0}
                                    noTotalTickets={userTickets?.length ?? 0}
                                    ticketStatus={'In Progress'}/>
                  <CircularProgress noTickets={doneTickets ?? 0}
                                    noTotalTickets={userTickets?.length ?? 0}
                                    ticketStatus={'Done'}/>
               </div>
            </div>
         </div>
      </div>
   )

}
import { useEffect, useState } from 'react'
import DesktopNavBar from '../../components/NavBar'
import Header from '../../components/Header'
import Ticket from '../../components/Ticket/Ticket'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import { ITicket } from '../../interfaces/Ticket'
import { IUser } from '../../interfaces/User'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'


export default () => {

   const [ tickets, setTickets ] = useState<ITicket[]>()
   const [ user, setUser ] = useState<IUser>()

   const [todoTickets, setTodoTickets] = useState<ITicket[] | undefined>([])
   const [inProgressTickets, setInProgressTickets] = useState<ITicket[] | undefined>([])
   const [doneTickets, setDoneTickets] = useState<ITicket[] | undefined>([])

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
      })()}, [])

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
            !useTicketsError && userTicketsData && setTickets(userTicketsData)
         })()
      }
   }, [ user ])


   useEffect(() => {
      setTodoTickets(tickets && tickets.filter(ticket => ticket.status === 0))
      setInProgressTickets(tickets && tickets.filter(ticket => ticket.status === 1))
      setDoneTickets(tickets && tickets.filter(ticket => ticket.status === 2))
   }, [tickets])

   return (
      <div className="tickets-page__wrapper">
         <div className="nav--bar">
            <DesktopNavBar/>
         </div>
         <div className="tickets-page">
            <Header/>
            <div className="tickets__categories">
               <div className="tickets__categories__category">
                  <div className="tickets__categories__category__info">
                     <p className="tickets__categories__category__info__name">TO DO</p>
                     <p className="tickets__categories__category__info__no-of-tickets">{todoTickets?.length} ISSUES</p>
                  </div>
                  <ul className="tickets__list">
                     {todoTickets?.map((ticket) =>
                        <Ticket ticketId={ticket.id} />
                     )}
                  </ul>
               </div>
               <div className="tickets__categories__category__category">
                  <div className="tickets__categories__category__info">
                     <p className="tickets__categories__category__info__name">IN PROGRESS</p>
                     <p className="tickets__categories__category__info__no-of-tickets">{inProgressTickets?.length} ISSUES</p>
                  </div>
                  <ul className="tickets__list">
                     {inProgressTickets?.map((ticket) =>
                        <Ticket ticketId={ticket.id} />
                     )}
                  </ul>
               </div>
               <div className="tickets__categories__category">
                  <div className="tickets__categories__category__info">
                     <p className="tickets__categories__category__info__name">DONE</p>
                     <p className="tickets__categories__category__info__no-of-tickets">{doneTickets?.length} ISSUES</p>
                  </div>
                  <ul className="tickets__list">
                     {doneTickets?.map((ticket) =>
                        <Ticket ticketId={ticket.id} />
                     )}
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}
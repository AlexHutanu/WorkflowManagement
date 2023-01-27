import { useEffect, useState, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import { ITicket } from '../../interfaces/Ticket'
import { IUser } from '../../interfaces/User'
import { RootState } from '../../redux/store'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'
import Ticket from '../Ticket/Ticket'

export default () => {

   const { boardId: boardId } = useSelector((state: RootState) => state.boardId)
   const [ searchParams ] = useSearchParams()
   const [ user, setUser ] = useState<IUser>()
   const [updateTickets, setUpdateTickets] = useState(false)

   const [todoTickets, setTodoTickets] = useState<ITicket[] | undefined>([])
   const [inProgressTickets, setInProgressTickets] = useState<ITicket[] | undefined>([])
   const [doneTickets, setDoneTickets] = useState<ITicket[] | undefined>([])

   let boardIdParam = searchParams.get('boardId')

   useEffect(() => {
      (async () => {
         const {
            data: tickets,
            error: ticketsError
         } = await callAxios<ITicket[]>(`${API_BASE_URL}${UrlPaths.TICKETS}/id/${boardId || boardIdParam}`, {
            method: HttpMethods.GET,
            auth: true
         })
         if (!ticketsError && tickets) {
            setTodoTickets(tickets && tickets.filter(ticket => ticket.status === 0))
            setInProgressTickets(tickets && tickets.filter(ticket => ticket.status === 1))
            setDoneTickets(tickets && tickets.filter(ticket => ticket.status === 2))
         }
      })()
   }, [boardId, updateTickets])

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
      })()
   }, [])



   return (
      <div className="tickets">
         <div className="tickets__categories">
            <div className="tickets__categories__category">
               <div className="tickets__categories__category__info">
                  <p className="tickets__categories__category__info__name">TO DO</p>
                  <p className="tickets__categories__category__info__no-of-tickets">{todoTickets?.length} ISSUES</p>
               </div>
               <ul className="tickets__list">
                  {todoTickets?.map((ticket) =>
                     <Ticket ticketId={ticket.id} setUpdateTickets={setUpdateTickets}/>
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
                     <Ticket ticketId={ticket.id} setUpdateTickets={setUpdateTickets}/>
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
                     <Ticket ticketId={ticket.id} setUpdateTickets={setUpdateTickets}/>
                  )}
               </ul>
            </div>
         </div>
      </div>
   )

}


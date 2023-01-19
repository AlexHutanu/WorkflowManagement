import { SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import { ITicket } from '../../interfaces/Ticket'
import { RootState } from '../../redux/store'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'


export default ({ticketType, ticketStatus, setTicketId, handleOpen}: {ticketType: string, ticketStatus: any, setTicketId:  React.Dispatch<SetStateAction<string>>, handleOpen: Function}) => {

   const [ tickets, setTickets ] = useState<ITicket[]>()
   const { boardId: boardId } = useSelector((state: RootState) => state.boardId)
   const [ searchParams, setSearchParams ] = useSearchParams()

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
         !ticketsError && tickets && setTickets(tickets)

      })()
   }, [ boardId ])


   console.log(ticketStatus)
   return (
      <div className="ticket">
         <ul className="tickets__list">
            {tickets?.map((ticket) =>
               <li className="tickets__list__ticket" key={ticket.id} onClick={() => {
                  handleOpen()
                  setTicketId(ticket.id)
               }}>
                  <span className="tickets__list__ticket__right-side">
                     <p className="tickets__list__ticket__name">{ticket.name}</p>
                     <p className="tickets__list__ticket__label">{ticket.label}</p>
                     <p className="tickets__list__ticket__type">{ticketType}</p>
                  </span>
                  <span>
                     <p className="tickets__list__ticket__status">{ticketStatus}</p>
                     <p className="tickets__list__ticket__reporter">{ticket.assignee}</p>
                  </span>
               </li>
            )}
         </ul>

      </div>
      )

}
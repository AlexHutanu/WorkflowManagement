import { Box, Modal } from '@mui/material'
import { SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import { ITicket } from '../../interfaces/Ticket'
import { RootState } from '../../redux/store'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'
import {ticketType, ticketLabel, ticketStatus} from '../../services/Tickets'


export default () => {

   const [ open, setOpen ] = useState(false)
   const [ ticket, setTicket ] = useState<ITicket>()
   const [ ticketId, setTicketId ] = useState('')
   const [ tickets, setTickets ] = useState<ITicket[]>()
   const { boardId: boardId } = useSelector((state: RootState) => state.boardId)
   const [ searchParams, setSearchParams ] = useSearchParams()

   let boardIdParam = searchParams.get('boardId')

   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)

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

   useEffect(() => {
      (async () => {
            const {
               data: ticket,
               error: ticketError
            } = await callAxios<ITicket>(`${API_BASE_URL}${UrlPaths.TICKETS}/${ticketId}`, {
               method: HttpMethods.GET,
               auth: true
            })
            !ticketError && ticket && setTicket(ticket)
         }
      )()
   }, [ ticketId ])

   console.log(ticket)



   return (
      <div className="tickets">
         <ul className="tickets__list">
            {tickets?.map((ticket) =>
               <li className="tickets__list__ticket" key={ticket.id} onClick={() => {
                  handleOpen()
                  setTicketId(ticket.id)
               }}>
                  <span className="tickets__list__ticket__right-side">
                     <p className="tickets__list__ticket__name">{ticket.name}</p>
                     <p className="tickets__list__ticket__label">{ticketLabel(ticket.label)}</p>
                     <p className="tickets__list__ticket__type">{ticketType(ticket.type)}</p>
                  </span>
                  <span>
                     <p className="tickets__list__ticket__status">{ticketStatus(ticket.status)}</p>
                     <p className="tickets__list__ticket__reporter">{ticket.assignee}</p>
                  </span>
               </li>
            )}
         </ul>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <div className="tickets__ticket-modal">
               <Box className="tickets-box">
                  <div className="tickets__ticket-modal__right-side">
                     <p className="tickets__ticket-modal__right-side__title">
                        {ticket?.name}
                     </p>
                     <div className="tickets__ticket-modal__right-side__description">
                        <p>
                           {ticket?.description}
                        </p>
                     </div>
                  </div>
                  <div className="tickets__ticket-modal__left-side">
                     <div className="tickets__ticket-modal__left-side__element">
                        <span>Assignee</span>
                        <p className="tickets__ticket-modal__left-side__element__name">
                           {ticket?.assignee}
                        </p>
                     </div>
                     <div className="tickets__ticket-modal__left-side__element">
                        <span>
                           Label
                        </span>
                        <p className="tickets__ticket-modal__left-side__element__name">
                           {ticket?.label}
                        </p>
                     </div>
                     <div className="tickets__ticket-modal__left-side__element">
                        <span>
                           Reporter
                        </span>
                        <p className="tickets__ticket-modal__left-side__element__name">
                           ReporterTest
                        </p>
                     </div>
                     <div className="tickets__ticket-modal__left-side__element">
                        <span>
                           Status
                        </span>
                        <p className="tickets__ticket-modal__left-side__element__name">
                           {ticket?.status}
                        </p>
                     </div>
                  </div>
               </Box>
            </div>
         </Modal>
      </div>
   )

}


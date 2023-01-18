import { Box, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import { ITicket } from '../../interfaces/Ticket'
import { RootState } from '../../redux/store'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'
import BoardForm from '../Forms/BoardForm'


export default () => {

   const [ tickets, setTickets ] = useState<ITicket[]>()
   const [ searchParams, setSearchParams ] = useSearchParams()
   const [ open, setOpen ] = useState<boolean>(false)
   const [ ticket, setTicket ] = useState<ITicket>()
   const [ ticketId, setTicketId ] = useState<string>('')

   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)

   const { boardId: boardId } = useSelector((state: RootState) => state.boardId)

   useEffect(() => {
      (async () => {
         const {
            data: tickets,
            error: ticketsError
         } = await callAxios<ITicket[]>(`${API_BASE_URL}${UrlPaths.TICKETS}/id/${boardId}`, {
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

   console.log(ticketId)

   return (
      <div className="tickets">
         <ul className="tickets__list">
            {tickets?.map((ticket) =>
               <li className="tickets__list__ticket" key={ticket.id} onClick={e => {
                  e.preventDefault()
                  handleOpen()
                  setTicketId(ticket.id)
               }}>
                  <span className="tickets__list__ticket__right-side">
                     <p className="tickets__list__ticket__name">{ticket.name}</p>
                     <p className="tickets__list__ticket__label">Frontend</p>
                     <p className="tickets__list__ticket__type">bug</p>
                  </span>
                  <span>
                     <p className="tickets__list__ticket__status">INP</p>
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
               <Box className='tickets-box'>
                  <div className="tickets__ticket-modal__right-side">
                     <p className="tickets__ticket-modal__right-side__title">
                        {ticket?.name}
                     </p>
                     <div className="tickets__ticket-modal__right-side__description">
                        <p>
                           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt,
                           nihil,
                           provident. Aliquid at corporis dolor dolorem earum laudantium non
                           voluptatibus!
                        </p>
                     </div>
                  </div>
                  <div className="tickets__ticket-modal__left-side">
                     <div className="tickets__ticket-modal__left-side__assignee">
                        <p>Assignee</p>
                        <p className="tickets__ticket-modal__left-side__assignee__name">
                           AssigneeTest
                        </p>
                     </div>
                     <div className="tickets__ticket-modal__left-side__label">
                        <p>
                           Label
                        </p>
                        <p className="tickets__ticket-modal__left-side__label__name">
                           LabelTest
                        </p>
                     </div>
                     <div className="tickets_ticket-modal__left-side__reporter">
                        <p>
                           Reporter
                        </p>
                        <p className="tickets_ticket-modal__left-side__reporter__name">
                           ReporterTest
                        </p>
                     </div>
                  </div>
               </Box>
            </div>
         </Modal>
      </div>
   )

}


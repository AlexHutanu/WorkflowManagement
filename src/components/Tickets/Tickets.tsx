import { Box, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import { ITicket } from '../../interfaces/Ticket'
import { IUser } from '../../interfaces/User'
import { RootState } from '../../redux/store'
import { ticketLabel, ticketStatus, ticketType } from '../../services/Tickets'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'
import TicketForm from '../Forms/TicketForm'


export default () => {

   const [ open, setOpen ] = useState(false)
   const [ ticket, setTicket ] = useState<ITicket>()
   const [ ticketId, setTicketId ] = useState('')
   const [ tickets, setTickets ] = useState<ITicket[]>()
   const { boardId: boardId } = useSelector((state: RootState) => state.boardId)
   const [ searchParams, setSearchParams ] = useSearchParams()
   const [ user, setUser ] = useState<IUser>()
   const [ description, setDescription ] = useState('')

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
      if(ticketId) {
         (async () => {
               const {
                  data: ticketData,
                  error: ticketError
               } = await callAxios<ITicket>(`${API_BASE_URL}${UrlPaths.TICKETS}/${ticketId}`, {
                  method: HttpMethods.GET,
                  auth: true
               })
               !ticketError && ticketData && setTicket(ticketData)
               console.log(ticketData)
            }
         )()
      }
   }, [ ticketId ])

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
         <ul className="tickets__list">
            {tickets?.map((ticket) =>
               <li className="tickets__list__ticket" key={ticket.id} onClick={() => {
                  handleOpen()
                  setTicketId(ticket.id)
               }}>
                  <span className="tickets__list__ticket__right-side">
                     <p className="tickets__list__ticket__name">{ticket.name}</p>
                     <p className="tickets__list__ticket__label">{ticketLabel(ticket.label)}</p>
                     <p className="tickets__list__ticket__type">{ticketType[ticket.type]}</p>
                  </span>
                  <span>
                     <p className="tickets__list__ticket__status">{ticketStatus(ticket.status)}</p>
                     <p className="tickets__list__ticket__reporter">{ticket.assignee}</p>
                  </span>
               </li>
            )}
         </ul>
         {ticket && <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <div className="create-ticket-modal__box">
               <Box >
                  <TicketForm handleClose={handleClose} ticketData={ticket!} createMode={false}/>
               </Box>
            </div>
         </Modal>}
      </div>
   )

}


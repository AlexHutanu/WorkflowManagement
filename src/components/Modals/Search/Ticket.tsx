import { Box, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HttpMethods } from '../../../constants/httpsMethods'
import { UrlPaths } from '../../../constants/urlPaths'
import { ITicket } from '../../../interfaces/Ticket'
import { RootState } from '../../../redux/store'
import { callAxios } from '../../../utils/axios'
import {setShowBoardsSearchModal} from '../../../redux/showBoardsSearchModal'
import { API_BASE_URL } from '../../../utils/env'
import TicketForm from '../../Forms/TicketForm'


export default ({ ticketId }: { ticketId: string }) => {

   const [ ticket, setTicket ] = useState<ITicket>()
   const [ open, setOpen ] = useState(false)



   useEffect(() => {
      if (ticketId) {
         (async () => {
               const {
                  data: ticketData,
                  error: ticketError
               } = await callAxios<ITicket>(`${API_BASE_URL}${UrlPaths.TICKETS}/${ticketId}`, {
                  method: HttpMethods.GET,
                  auth: true
               })
               !ticketError && ticketData && setTicket(ticketData)
            }
         )()
      }
   }, [ ticketId ])

   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)

   return (
      <>
         <li className="element"
             key={ticketId}
             onClick={() => {
                handleOpen()
             }}>
            <p className="element__name">{ticket?.name}</p>
            <p className="element__provenance">from Tickets</p>
         </li>
         {ticket && <Modal
             open={open}
             onClose={handleClose}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
         >
             <div className="create-ticket-modal__box">
                 <Box>
                     <TicketForm
                         handleClose={handleClose}
                         ticketData={ticket!}
                         createMode={false}
                     />
                 </Box>
             </div>
         </Modal>}
      </>
   )
}
import { Box, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import { ITicket } from '../../interfaces/Ticket'
import { ticketLabel, ticketType } from '../../services/Tickets'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'
import TicketForm from '../Forms/TicketForm'


export default ({ ticketId }: { ticketId: string }) => {

   const [ticket, setTicket] = useState<ITicket>();
   const [open, setOpen] = useState(false);

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
   }, [ ticketId ]);

   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)

   return (
      <>
      <li className="tickets__list__ticket"
          key={ticketId}
          onClick={() => {
            handleOpen()
         }}>
         <span className="tickets__list__ticket__right-side">
            <p className="tickets__list__ticket__right-side__name">{ticket?.name}</p>
         </span>
         <span className="tickets__list__ticket__left-side">
            <p className="tickets__list__ticket__left-side__status">{ticketLabel(ticket?.label)}</p>
            <p className="tickets__list__ticket__left-side__type">{ticketType[ticket?.type ?? 0]}</p>
         </span>
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
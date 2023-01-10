import { Box, Button, Modal } from '@mui/material'
import { useState } from 'react'
import TicketForm from '../../Forms/TicketForm'


export default () => {

   const [open, setOpen] = useState<boolean>(false)

   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)

   return (
      <div className="create-ticket-modal">
         <Button onClick={handleOpen}>Create new ticket</Button>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <div className="create-ticket-modal__box">
               <Box >
                  <TicketForm/>
               </Box>
            </div>
         </Modal>
      </div>
   )
}
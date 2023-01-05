import { Box, Button, Modal } from '@mui/material'
import { useState } from 'react'
import BoardForm from '../../Forms/BoardForm'


export default () => {

   const [ open, setOpen ] = useState(false)

   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)
   return (
      <div className="create-board-modal">
         <Button onClick={handleOpen}>Create new board</Button>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <div className="create-board-modal__box">
               <Box >
                  <BoardForm/>
               </Box>
            </div>
         </Modal>
      </div>
   )
}
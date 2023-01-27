import { Box, Modal } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setCreateBoardModal } from '../../../redux/createBoardModal'
import { RootState } from '../../../redux/store'
import BoardForm from '../../Forms/BoardForm'


export default () => {

   const { createBoardModal } = useSelector((state: RootState) => state.createBoardModal)

   const dispatch = useDispatch()


   return (
      <div className="create-board-modal">
         <Modal
            open={createBoardModal}
            onClose={() => dispatch(setCreateBoardModal(false))}
            disableAutoFocus={true}
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

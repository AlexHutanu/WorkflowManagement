import { Box, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HttpMethods } from '../../../constants/httpsMethods'
import { UrlPaths } from '../../../constants/urlPaths'
import useDebounce from '../../../hooks/useDebounce'
import { IBoard } from '../../../interfaces/Board'
import { ITicket } from '../../../interfaces/Ticket'
import { IUser } from '../../../interfaces/User'
import { setSearchModal } from '../../../redux/searchModal'
import { RootState } from '../../../redux/store'
import { callAxios } from '../../../utils/axios'
import { API_BASE_URL } from '../../../utils/env'



export default () => {

   const { searchModal } = useSelector((state: RootState) => state.searchModal)

   const dispatch = useDispatch()

   const [ boards, setBoards ] = useState<IBoard[]>()
   const [ tickets, setTickets ] = useState<ITicket[]>()
   const [ users, setUsers ] = useState<IUser[]>()

   const [ searchInput, setSearchInput ] = useState('')

   const debouncedSearchInput = useDebounce(searchInput, 500)


   useEffect(() => {

      (async () => {
         const boardsUrl = debouncedSearchInput ?
            `${API_BASE_URL}${UrlPaths.BOARD}/?name=${debouncedSearchInput}` :
            `${API_BASE_URL}${UrlPaths.BOARDS}`

         const {
            data: boards,
            error: boardsError
         } = await callAxios<IBoard[]>(boardsUrl, {
            method: HttpMethods.GET,
            auth: true
         })
         !boardsError && boards && setBoards((boards))
         /*      const {
                  data: tickets,
                  error: ticketsError
               } = await callAxios<ITicket[]>(`${API_BASE_URL}${UrlPaths.TICKETS}`, {
                  method: HttpMethods.GET,
                  auth: true
               })
               !ticketsError && tickets && setTickets((tickets))


               const {
                  data: users,
                  error: usersError
               } = await callAxios<IUser[]>(`${API_BASE_URL}${UrlPaths.USER}`, {
                  method: HttpMethods.GET,
                  auth: true
               })
               !usersError && users && setUsers((users))*/
      })()
   }, [ debouncedSearchInput ])


   return (
      <div className="search-modal__wrapper">
         <Modal
            open={searchModal}
            onClose={() => dispatch(setSearchModal(false))}
         >
            <div className="search-modal">
               <Box>
                  <div className="search-modal__categories">
                     <span className="search-modal__categories__element">
                        Boards
                     </span>
                     <span className="search-modal__categories__element">
                        Tickets
                     </span>
                     <span className="search-modal__categories__element">
                        Users
                     </span>
                  </div>
                  <div className="search-modal__search-bar">
                     <input type="text" placeholder="Search..."
                            onChange={e => setSearchInput(e.target.value)}/>
                  </div>
                  <div className="search-modal__results">
                     {boards?.map((board) => <p>{board.name}</p>)}
                     {/*                     {tickets?.map((ticket) => <p>{ticket.name}</p>)}*/}
                  </div>
               </Box>
            </div>
         </Modal>
      </div>
   )
}
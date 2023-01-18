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
import Element from './Element'


export default () => {

   const { searchModal } = useSelector((state: RootState) => state.searchModal)

   const dispatch = useDispatch()

   const [ boards, setBoards ] = useState<IBoard[]>()
   const [ tickets, setTickets ] = useState<ITicket[]>()
   const [ users, setUsers ] = useState<IUser[]>()

   const [ showBoards, setShowBoards ] = useState(false)
   const [ showTickets, setShowTickets ] = useState(false)
   const [ showUsers, setShowUsers ] = useState(false)
   const [ showAllSearches, setShowAllSearches ] = useState(true)


   const handleEvent = (element: string) => {

      if (element == 'showBoards') {
         setShowBoards(true)
         setShowTickets(false)
         setShowUsers(false)
         setShowAllSearches(false)
      }

      if (element == 'showTickets') {
         setShowTickets(true)
         setShowBoards(false)
         setShowUsers(false)
         setShowAllSearches(false)
      }

      if (element == 'showUsers') {
         setShowUsers(true)
         setShowAllSearches(false)
         setShowTickets(false)
         setShowBoards(false)
      }
   }


   const [ searchInput, setSearchInput ] = useState('')

   const debouncedSearchInput = useDebounce(searchInput, 500)

   enum elementType {
      TICKETS = 'from Tickets',
      BOARDS = 'from Boards',
      USERS = 'from Users'
   }



   useEffect(() => {

      (async () => {
         const boardsUrl = debouncedSearchInput ?
            `${API_BASE_URL}${UrlPaths.BOARD}/?name=${debouncedSearchInput}` :
            `${API_BASE_URL}${UrlPaths.BOARDS}`

         const ticketsUrl = debouncedSearchInput ?
            `${API_BASE_URL}${UrlPaths.TICKET}/?name=${debouncedSearchInput}` :
            `${API_BASE_URL}${UrlPaths.TICKETS}`

         const usersUrl = debouncedSearchInput ?
            `${API_BASE_URL}${UrlPaths.USER}/?name=${debouncedSearchInput}` :
            `${API_BASE_URL}${UrlPaths.USERS}`


         const {
            data: boards,
            error: boardsError
         } = await callAxios<IBoard[]>(boardsUrl, {
            method: HttpMethods.GET,
            auth: true
         })
         !boardsError && boards && setBoards((boards))

         const {
            data: tickets,
            error: ticketsError
         } = await callAxios<ITicket[]>(ticketsUrl, {
            method: HttpMethods.GET,
            auth: true
         })
         !ticketsError && tickets && setTickets((tickets))


         const {
            data: users,
            error: usersError
         } = await callAxios<IUser[]>(usersUrl, {
            method: HttpMethods.GET,
            auth: true
         })
         !usersError && users && setUsers((users))
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
                     <span
                        className={showBoards ? 'search-modal__categories__element__is-active' :
                           'search-modal__categories__element'}
                        onClick={() => handleEvent('showBoards')}>
                        Boards
                     </span>
                     <span
                        className={showTickets ? 'search-modal__categories__element__is-active' :
                           'search-modal__categories__element'}
                        onClick={() => handleEvent('showTickets')}>
                        Tickets
                     </span>
                     <span
                        className={showUsers ? 'search-modal__categories__element__is-active' :
                           'search-modal__categories__element'}
                        onClick={() => handleEvent('showUsers')}>
                        Users
                     </span>
                  </div>
                  <div className="search-modal__search-bar">
                     <input type="text" placeholder="Search..."
                            onChange={e => setSearchInput(e.target.value)}/>
                  </div>
                  <div className="search-modal__results__wrapper">
                     <div className="search-modal__results">
                        {showBoards || showAllSearches ? boards?.map((board) => <Element
                           key={board.id}
                           elementUrlPath={UrlPaths.BOARD}
                           elementName={board.name}
                           elementType={elementType.BOARDS}
                           boardId={board.id}/>) : ''}
                        {showTickets || showAllSearches ? tickets?.map((ticket) => <Element
                           key={ticket.id}
                           elementUrlPath={UrlPaths.TICKET}
                           elementName={ticket.name}
                           elementType={elementType.TICKETS}/>) : ''}
                        {showUsers || showAllSearches ? users?.map((user) => <Element
                           key={user.id}
                           elementUrlPath={UrlPaths.USER}
                           elementName={user.name}
                           elementType={elementType.USERS}/>) : ''}
                     </div>
                  </div>
               </Box>
            </div>
         </Modal>
      </div>
   )
}
import { Box, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HttpMethods } from '../../../constants/httpsMethods'
import { UrlPaths } from '../../../constants/urlPaths'
import useDebounce from '../../../hooks/useDebounce'
import { IBoard } from '../../../interfaces/Board'
import { ITicket } from '../../../interfaces/Ticket'
import { setShowBoardsSearchModal } from '../../../redux/showBoardsSearchModal'
import { setSearchModal } from '../../../redux/searchModal'
import { RootState } from '../../../redux/store'
import { callAxios } from '../../../utils/axios'
import { API_BASE_URL } from '../../../utils/env'
import Ticket from './Ticket'
import Board from './Board'


export default () => {

   const { showBoardsSearchModal } = useSelector((state: RootState) => state.showBoardsSearchModal)
   const { searchModal } = useSelector((state: RootState) => state.searchModal)

   const dispatch = useDispatch()

   const [ boards, setBoards ] = useState<IBoard[]>()
   const [ tickets, setTickets ] = useState<ITicket[]>()

   const [ showTickets, setShowTickets ] = useState(false)
   const [ showAllSearches, setShowAllSearches ] = useState(true)


   const handleEvent = (element: string) => {

      if (element == 'showBoards' || showBoardsSearchModal === true) {
         dispatch(setShowBoardsSearchModal(true))
         setShowTickets(false)
         setShowAllSearches(false)
      }

      if (element == 'showTickets') {
         setShowTickets(true)
         dispatch(setShowBoardsSearchModal(false))
         setShowAllSearches(false)
      }
   }


   const [ searchInput, setSearchInput ] = useState('')

   const debouncedSearchInput = useDebounce(searchInput, 500)

   enum elementType {
      TICKETS = 'from Tickets',
      BOARDS = 'from Boards',
   }


   useEffect(() => {

      (async () => {
         const boardsUrl = debouncedSearchInput ?
            `${API_BASE_URL}${UrlPaths.BOARD}/?name=${debouncedSearchInput}` :
            `${API_BASE_URL}${UrlPaths.BOARDS}`

         const ticketsUrl = debouncedSearchInput ?
            `${API_BASE_URL}${UrlPaths.TICKET}/?name=${debouncedSearchInput}` :
            `${API_BASE_URL}${UrlPaths.TICKETS}`


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

      })()
   }, [ debouncedSearchInput ])


   return (
      <div className="search-modal__wrapper">
         <Modal
            open={searchModal}
            onClose={() => {
               dispatch(setSearchModal(false))
               setShowAllSearches(true)
               setShowTickets(false)
               dispatch(setShowBoardsSearchModal(false))
            }}
         >
            <div className="search-modal">
               <Box>
                  <div className="search-modal__categories">
                     <span
                        className={showBoardsSearchModal ? 'search-modal__categories__element__is-active' :
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
                  </div>
                  <div className="search-modal__search-bar">
                     <input type="text" placeholder="Search..."
                            onChange={e => setSearchInput(e.target.value)}/>
                  </div>
                  <div className="search-modal__results__wrapper">
                     <div className="search-modal__results">
                        {showBoardsSearchModal || showAllSearches ? boards?.map((board) => <Board
                           key={board.id}
                           elementUrlPath={UrlPaths.BOARD}
                           elementName={board.name}
                           elementType={elementType.BOARDS}
                           boardId={board.id}/>) : ''}
                        {showTickets || showAllSearches ? tickets?.map((ticket) => <Ticket
                           key={ticket.id}
                           ticketId={ticket.id}
                        />) : ''}

                     </div>
                  </div>
               </Box>
            </div>
         </Modal>
      </div>
   )
}
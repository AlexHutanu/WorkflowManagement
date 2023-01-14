import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import BoardIcon from '../../icons/BoardIcon'
import TicketIcon from '../../icons/TicketIcon'
import { IBoard } from '../../interfaces/Board'
import { IUser } from '../../interfaces/User'
import { setSearchModal } from '../../redux/searchModal'
import { RootState } from '../../redux/store'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'
import { isTokenValid } from '../../utils/jwt'
import { deleteFromLocalStorage } from '../../utils/localStorage'

export default () => {

   const navigate = useNavigate()

   const [ user, setUser ] = useState<IUser>()
   const [ boards, setBoards ] = useState<IBoard[]>([])
   const [ searchResults, setSearchResult ] = useState<IBoard[]>([])

   const { searchModal } = useSelector((state: RootState) => state.searchModal)

   const dispatch = useDispatch()

   useEffect(() => {
      if (!isTokenValid()) {
         deleteFromLocalStorage('token')
         navigate(UrlPaths.LOGIN)
      }
      (async () => {
         const { data: userData, error: userError } = await callAxios<IUser>(`${API_BASE_URL}${UrlPaths.USER}`, {
            method: HttpMethods.GET,
            auth: true
         })
         !userError && userData && setUser(userData)
         const { data: boardData, error: boardError } = await callAxios<IBoard[]>(`${API_BASE_URL}${UrlPaths.BOARDS}`, {
            method: HttpMethods.GET,
            auth: true
         })
         !boardError && boardData && setBoards((boardData))
         !boardError && boardData && setSearchResult((boardData))
      })()
   }, [])


   return <>
      <div className="desktop-nav-bar">
         <div className="desktop-nav-bar__upper-section">
            <p className="desktop-nav-bar__upper-section__title" onClick={() => navigate('/')}>
               Workflow manager
            </p>
         </div>
         <div className="desktop-nav-bar__lower-section">
            <div className="desktop-nav-bar__lower-section__profile">
               <div className="desktop-nav-bar__lower-section__profile__picture">
                  <img src="profile_picture.jpg" alt="profile picture"/>
               </div>
               <p className="desktop-nav-bar__lower-section__profile__name">
                  {user?.name}
               </p>
               <p className="desktop-nav-bar__lower-section__profile__mail-address">
                  {user?.email}
               </p>
            </div>
            <div className="desktop-nav-bar__lower-section__links">
               <div className="desktop-nav-bar__lower-section__links__element">
                  <BoardIcon/>
                  <p className="desktop-nav-bar__lower-section__links__element__name"
                     onClick={() => navigate('/')
                     }>
                     Dashboard
                  </p>
               </div>

               <div className="desktop-nav-bar__lower-section__links__element">
                  <TicketIcon/>
                  <p className="desktop-nav-bar__lower-section__links__element__name"
                     onClick={() => navigate('/tickets')
                     }>
                     Tasks
                  </p>
               </div>
               <div className="desktop-nav-bar__lower-section__links__element">
                  <TicketIcon/>
                  <p className="desktop-nav-bar__lower-section__links__element__name"
                     onClick={() => dispatch(setSearchModal(!searchModal))
                     }>
                     Boards
                  </p>
               </div>
            </div>
         </div>
      </div>
   </>
}
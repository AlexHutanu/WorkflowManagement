import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import BoardIcon from '../../icons/BoardIcon'
import PlusIcon from '../../icons/PlusIcon'
import ProjectIcon from '../../icons/ProjectIcon'
import TicketIcon from '../../icons/TicketIcon'
import { IUser } from '../../interfaces/User'
import { setCreateBoardModal } from '../../redux/createBoardModal'
import { setSearchModal } from '../../redux/searchModal'
import { RootState } from '../../redux/store'
import { callAxios } from '../../utils/axios'
import { setShowBoardsSearchModal } from '../../redux/showBoardsSearchModal'
import { API_BASE_URL } from '../../utils/env'
import { isTokenValid } from '../../utils/jwt'
import { deleteFromLocalStorage } from '../../utils/localStorage'
import CreateBoardModal from '../Modals/CreateBoard'


export default () => {

   const navigate = useNavigate()

   const [ user, setUser ] = useState<IUser>()

   const { searchModal } = useSelector((state: RootState) => state.searchModal)
   const { createBoardModal } = useSelector((state: RootState) => state.createBoardModal)
   const { showBoardsSearchModal } = useSelector((state: RootState) => state.showBoardsSearchModal)

   const dispatch = useDispatch()

   useEffect(() => {
      if (!isTokenValid()) {
         deleteFromLocalStorage('token')
         navigate(UrlPaths.LOGIN)
      }
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


   return <>
      <div className="desktop-nav-bar">
         <div className="desktop-nav-bar__upper-section">
            <p className="desktop-nav-bar__upper-section__title" onClick={() => navigate('/')}>
               Workflow Manager
            </p>
            <CreateBoardModal/>
         </div>
         <div className="desktop-nav-bar__lower-section">
            <div className="desktop-nav-bar__lower-section__profile">
               <div className="desktop-nav-bar__lower-section__profile__picture">
                  <img
                     src={`https://avatars.abstractapi.com/v1/?api_key=d62aae293278420a97a702733b89c8fb&name=${user?.name}`}
                     alt="profile picture"/>
               </div>
               <p className="desktop-nav-bar__lower-section__profile__name">
                  {user?.name}
               </p>
               <p className="desktop-nav-bar__lower-section__profile__mail-address">
                  {user?.email}
               </p>
            </div>
            <div className="desktop-nav-bar__lower-section__links">
               <div className="desktop-nav-bar__lower-section__links__element"
                    onClick={() => navigate('/')
                    }>
                  <BoardIcon/>
                  <p className="desktop-nav-bar__lower-section__links__element__name"
                  >
                     Dashboard
                  </p>
               </div>

               <div className="desktop-nav-bar__lower-section__links__element"
                    onClick={() => navigate('/tickets')
                    }>
                  <ProjectIcon/>
                  <p className="desktop-nav-bar__lower-section__links__element__name">
                     My Issues
                  </p>
               </div>
               <div className="desktop-nav-bar__lower-section__links__element"
                    onClick={() => {
                       dispatch(setSearchModal(!searchModal))
                       dispatch(setShowBoardsSearchModal(true))
                    }
                    }>
                  <TicketIcon/>
                  <p className="desktop-nav-bar__lower-section__links__element__name"
                  >
                     Boards
                  </p>
               </div>
               <div className="desktop-nav-bar__lower-section__links__element"
                    id="create-board-button"
                    onClick={() => {
                       dispatch(setCreateBoardModal(!createBoardModal))
                    }
                    }>
                  <p className="desktop-nav-bar__lower-section__links__element__name"
                     id="create-board-button__name"
                  >
                     Create Board
                  </p>
               </div>
            </div>
         </div>
      </div>
   </>
}
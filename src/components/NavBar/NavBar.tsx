import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import BoardIcon from '../../icons/BoardIcon'
import ProjectIcon from '../../icons/ProjectIcon'
import TicketIcon from '../../icons/TicketIcon'
import { IBoard } from '../../interfaces/Board'
import { IUser } from '../../interfaces/User'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'
import SearchBoard from '../SearchBoard'
import ListPage from '../SearchBoard/ListPage'


export default () => {

   const navigate = useNavigate()

   const [ user, setUser ] = useState<IUser>()
   const [ displayBoardList, setDisplayBoardList ] = useState(false)
   const [ boards, setBoards ] = useState<IBoard[]>([])
   const [ searchResults, setSearchResult ] = useState<IBoard[]>([])

   useEffect(() => {
      (async () => {
         const { data, error } = await callAxios<IUser>(`${API_BASE_URL}${UrlPaths.USER}`, {
            method: HttpMethods.GET,
            auth: true
         })
         !error && data && setUser(data)
      })()
   }, [])

   useEffect(() => {
      (async () => {
         const { data, error } = await callAxios<IBoard[]>(`${API_BASE_URL}${UrlPaths.BOARDS}`, {
            method: HttpMethods.GET,
            auth: true
         })
         !error && data && setBoards((data))
         !error && data && setSearchResult((data))
      })()
   }, [])

   console.log(boards)


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
                  <ProjectIcon/>
                  <p className="desktop-nav-bar__lower-section__links__element__name"
                     onClick={() => setDisplayBoardList(prev => !prev)
                     }>
                     Boards
                  </p>
               </div>
               <SearchBoard setSearchResults={setSearchResult} boards={boards}/>
               <ListPage searchResults={searchResults}/>
               
               <div className="desktop-nav-bar__lower-section__links__element">
                  <TicketIcon/>
                  <p className="desktop-nav-bar__lower-section__links__element__name"
                     onClick={() => navigate('/tickets')
                     }>
                     Tasks
                  </p>
               </div>
            </div>
         </div>
      </div>
   </>
}
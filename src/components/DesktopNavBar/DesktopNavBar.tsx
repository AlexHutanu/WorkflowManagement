import { useNavigate } from 'react-router-dom'
import BoardIcon from '../../icons/BoardIcon';
import ProjectIcon from '../../icons/ProjectIcon'
import TicketIcon from '../../icons/TicketIcon'

export default () => {

   const navigate = useNavigate()

   return <>
      <div className="desktop-nav-bar">
         <div className="desktop-nav-bar__upper-section">
            <p className="desktop-nav-bar__upper-section__title" onClick={() => navigate('/homepage')}>
               Workflow manager
            </p>
         </div>
         <div className="desktop-nav-bar__lower-section">
            <div className="desktop-nav-bar__lower-section__profile">
               <div className="desktop-nav-bar__lower-section__profile__picture">
                  <img src="profile_picture.jpg" alt="profile picture"/>
               </div>
               <p className="desktop-nav-bar__lower-section__profile__name">
                  Alex Hutanu
               </p>
               <p className="desktop-nav-bar__lower-section__profile__mail-address">
                  alexandru.hutanu@amdaris.com
               </p>
            </div>
            <div className="desktop-nav-bar__lower-section__links">
               <div className="desktop-nav-bar__lower-section__links__element">
                  <BoardIcon />
                  <p className="desktop-nav-bar__lower-section__links__element__name">
                     Dashboard
                  </p>
               </div>
               <div className="desktop-nav-bar__lower-section__links__element">
                  <ProjectIcon />
                  <p className="desktop-nav-bar__lower-section__links__element__name">
                     Projects
                  </p>
               </div>
               <div className="desktop-nav-bar__lower-section__links__element">
                  <TicketIcon />
                  <p className="desktop-nav-bar__lower-section__links__element__name">
                     Tickets
                  </p>
               </div>
            </div>
         </div>
      </div>
   </>
}
import DesktopNavBar from '../../components/DesktopNavBar'
import Header from '../../components/Header'


export default () => {
   return (
      <div className="dashboard-page__wrapper">
         <div className="nav--bar">
            <DesktopNavBar/>
         </div>
         <div className="dashboard-page">
         <Header/>
         <p>DASHBOARD</p>
         </div>
      </div>
   )

}
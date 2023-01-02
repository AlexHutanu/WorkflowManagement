import Board from '../../components/BoardsList'
import DesktopNavBar from '../../components/DesktopNavBar'
import Header from '../../components/Header'


export default () => {
   return (
      <div className="board-page__wrapper">
         <div className="nav--bar">
            <DesktopNavBar/>
         </div>
         <div className="board-page">
            <Header/>
            <Board/>
         </div>
      </div>
   )
}
import Board from '../../components/BoardsList'
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'
import CreateBoardModal from '../../components/Modals/CreateBoard'


export default () => {
   return (
      <div className="board-list-page__wrapper">
         <div className="nav--bar">
            <NavBar/>
         </div>
         <div className="board-list-page">
            <div className="header">
               <Header/>
            </div>
            <div className="board-list-page__create-new-board">
               <CreateBoardModal />
            </div>
            <div className="board-list-page__boards">
               <Board/>
            </div>
         </div>
      </div>
   )
}
import BoardForm from '../Forms/BoardForm'
import Ticket from '../Ticket'


export default () => {
   return <>
      <div className="board">
         <p>Board</p>
         <BoardForm />
         <div className="board__tickets">
            <div className="board__tickets__element">
               <Ticket/>
            </div>
            <div className="board__tickets__element">
               <Ticket/>
            </div>
            <div className="board__tickets__element">
               <Ticket/>
            </div>
            <div className="board__tickets__element">
               <Ticket/>
            </div>
            <div className="board__tickets__element">
               <Ticket/>
            </div>
            <div className="board__tickets__element">
               <Ticket/>
            </div>

         </div>
      </div>
   </>
}
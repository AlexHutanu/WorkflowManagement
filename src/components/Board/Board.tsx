import Ticket from '../Ticket'


export default () => {
   return <>
      <div className="board">
         <p>Board</p>
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
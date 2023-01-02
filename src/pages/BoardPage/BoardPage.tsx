import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HttpMethods } from '../../constants/httpsMethods'
import { IBoard } from '../../interfaces/Board'
import { ITicket } from '../../interfaces/Ticket'
import { RootState } from '../../redux/store'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'


export default () => {

   const [ tickets, setTickets ] = useState<ITicket[]>()

   const { boardId: boardId } = useSelector((state: RootState) => state.boardId)

   useEffect(() => {
      (async () => {
         const { data, error } = await callAxios<ITicket[]>(`${API_BASE_URL}/BugTickets`, {
            method: HttpMethods.GET
         })
         !error && data && setTickets(data)
         console.log(boardId)
      })()
   }, [])


   return (
      <div className="board-page">
         <ul className="board-page__tickets-list">
            {tickets?.map((ticket) =>
               <li className="board-page__tickets-list__ticket" key={ticket.id}>
                  <p>{ticket.name}</p>
                  <p>{ticket.description}</p>
                  <p>{ticket.boardId}</p>
               </li>
            )}
         </ul>
      </div>
   )
}
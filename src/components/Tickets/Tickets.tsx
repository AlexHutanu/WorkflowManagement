import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import { ITicket } from '../../interfaces/Ticket'
import { RootState } from '../../redux/store'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'


export default () => {

   const [ tickets, setTickets ] = useState<ITicket[]>()

   const { boardId: boardId } = useSelector((state: RootState) => state.boardId)

   const ticketType = ["BugTicket", "UserStory", "FeatureRequest"]

   useEffect(() => {
      (async () => {
         const { data, error } = await callAxios<ITicket[]>(`${API_BASE_URL}${UrlPaths.TICKETS}/id/${boardId}`, {
            method: HttpMethods.GET
         })
         !error && data && setTickets(data)
      })()
   }, [])

   return (
      <div className="tickets">
         <ul className="tickets__list">
            {tickets?.map((ticket) =>
               <li className="tickets__list__ticket" key={ticket.id}>
                  <p>{ticket.name}</p>
                  <p>{ticket.description}</p>
                  <p>{ticket.boardId}</p>
                  <p>{ticketType[ticket.ticketType]}</p>
               </li>
            )}
         </ul>
      </div>
   )
}
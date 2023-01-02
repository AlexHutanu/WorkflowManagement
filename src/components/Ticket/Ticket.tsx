import { useEffect, useState } from 'react'
import { HttpMethods } from '../../constants/httpsMethods'
import { ITicket } from '../../interfaces/Ticket'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'


export default ( ) => {

   const [tickets, setTickets] = useState<ITicket[]>()

   useEffect(() => {
      (async () => {
         const {data, error} = await callAxios<ITicket[]>(`${API_BASE_URL}/BugTickets`, {
            method: HttpMethods.GET
         })
         !error && data && setTickets(data)
         console.log(data)
      })()
   },[])

   return (
      <div className="ticket">
      </div>
   )
}
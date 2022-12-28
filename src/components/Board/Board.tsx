import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HttpMethods } from '../../constants/httpsMethods'
import { IBoard } from '../../interfaces/Board'
import { RootState } from '../../redux/store'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'
import BoardForm from '../Forms/BoardForm'


export default () => {

   const [ boards, setBoards ] = useState<IBoard[]>()
   const {boards: isActiveBoards, dashboard: isActiveDashboard, tasks: isActiveTasks} = useSelector((state: RootState) => state.homepageTab)

   useEffect(() => {
      (async () => {
         const { data, error } = await callAxios<IBoard[]>(`${API_BASE_URL}/boards`, {
            method: HttpMethods.GET
         })
         !error && data && setBoards(data)
      })()
   }, [])

   return <>
      {isActiveBoards && <div className="boards-wrapper">
         <ul className="boards">
            {boards?.map((board) =>
               (<>
                  <li className="boards__board">
                     <p>{board.name}</p>
                     <p>{board.description}</p>
                     <p>{board.owner}</p>
                     <p>{board.noOfTickets}</p>
                  </li>
               </>)
            )}

         </ul>
      </div>}

      {isActiveDashboard && <div>
          Dashboards
      </div>}

      {isActiveTasks && <div>
          Tasks
      </div>}
   </>
}
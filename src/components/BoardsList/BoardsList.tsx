import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import { IBoard } from '../../interfaces/Board'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'
import { setBoardId } from '../../redux/boardId'


export default () => {

   const [ boards, setBoards ] = useState<IBoard[]>()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   useEffect(() => {
      (async () => {
         const { data, error } = await callAxios<IBoard[]>(`${API_BASE_URL}${UrlPaths.BOARDS}`, {
            method: HttpMethods.GET
         })
         !error && data && setBoards(data)
      })()
   }, [])

   return <>
      <div className="boards-list-wrapper">
         <ul className="boards-list">
            {boards?.map((board) =>
               <li className="boards-list__board" key={board.id} onClick={() => {
                  navigate('/board')
                  dispatch(setBoardId(board.id)
                  )
               }}>
                  <p>{board.name}</p>
                  <p>{board.description}</p>
                  <p>{board.owner}</p>
                  <p>{board.noOfTickets}</p>
               </li>
            )}

         </ul>
      </div>

   </>
}
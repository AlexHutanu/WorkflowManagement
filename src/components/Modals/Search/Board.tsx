import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setBoardId } from '../../../redux/boardId'
import { setSearchModal } from '../../../redux/searchModal'



export default ({
                   elementName,
                   elementType,
                   elementUrlPath,
                   boardId
                }: { elementName: string, elementType: string, elementUrlPath: string, boardId?: string }) => {

   const navigate = useNavigate()
   const dispatch = useDispatch()

   return <>
      <div className="element" onClick={() => {
         dispatch(setSearchModal(false))
         boardId && dispatch(setBoardId(boardId))
         navigate(`${elementUrlPath}?name=${elementName}&boardId=${boardId}`)
      }}>
         <p className="element__name">
            {elementName}
         </p>
         <p className="element__provenance">
            {elementType}
         </p>
      </div>
   </>
}
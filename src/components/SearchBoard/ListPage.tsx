import { IBoard } from '../../interfaces/Board'
import Board from './Board'

export default ({searchResults}: {searchResults: IBoard[]}) => {

   const results = searchResults.map((board: { id: string }) => <Board key={board.id} board={board} />)

   const content = results?.length ? results : <p>No matching boards found</p>

   return <>
      <main>{content}</main>
   </>
}
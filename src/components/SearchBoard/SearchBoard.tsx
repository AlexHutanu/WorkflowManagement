import React, { SyntheticEvent } from 'react'
import { IBoard } from '../../interfaces/Board'


export default ({ boards, setSearchResults }: {boards: IBoard[], setSearchResults: React.Dispatch<React.SetStateAction<IBoard[]>>}) => {

   const handleSubmit = (e: SyntheticEvent) => e.preventDefault()

   const handleSearchChange = (e: any) => {
      if (!e.target.value)
         setSearchResults(boards)

      const resultsArray = boards.filter((board: { name: string }) => board.name.includes(e.target.value))

      setSearchResults(resultsArray)
   }

   return (
      <header>
         <form className="search-board" onSubmit={handleSubmit}>
            <input
               type="text"
               className="search-board__input"
               id="search"
               onChange={handleSearchChange}
            />
            <button className="search-board__button"></button>
         </form>
      </header>
   )

}
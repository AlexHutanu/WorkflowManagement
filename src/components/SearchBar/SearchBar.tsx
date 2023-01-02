import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Search, SearchIconWrapper, StyledInputBase } from './SearchComponents'


export default () => {

   const [ userInput, setUserInput ] = useState<string>('')

   return <>
      <div className="search-bar">
         <Search>
            <SearchIconWrapper>
               <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
               placeholder="Search…"
               inputProps={{ 'aria-label': 'search' }}
               value={userInput}
               onChange={e => setUserInput(e.target.value)}
            />
         </Search>
      </div>
   </>
}
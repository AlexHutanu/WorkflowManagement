import SearchBar from '../SearchBar'


export default () => {
   return <>
      <div className="header">
         <p className="header__greet">Hello, James</p>
         <div className="header__search-bar">
            <SearchBar />
         </div>
      </div>
   </>
}
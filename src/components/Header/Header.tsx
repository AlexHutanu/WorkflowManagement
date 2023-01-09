import { useEffect, useState } from 'react'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import { IUser } from '../../interfaces/User'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'
import SearchBar from '../SearchBar'


export default () => {

   const [user, setUser] = useState<IUser>()

   useEffect(() => {
      (async () => {
         const {data, error} = await callAxios<IUser>(`${API_BASE_URL}${UrlPaths.USER}`, {
            method: HttpMethods.GET,
            auth: true
         })
         !error && data && setUser(data)
      })()
   },[])

   return <>
      <div className="header">
         <p className="header__greet">Hello, {user?.name}</p>
         <div className="header__search-bar">
            <SearchBar />
         </div>
      </div>
   </>
}
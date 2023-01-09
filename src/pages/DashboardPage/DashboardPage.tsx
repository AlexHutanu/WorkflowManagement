import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import { IUser } from '../../interfaces/User'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'


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
   }, [])


   return (
      <div className="dashboard-page__wrapper">
         <div className="nav--bar">
            <NavBar/>
         </div>
         <div className="dashboard-page">
            <Header/>
            <p>DASHBOARD</p>
         </div>
      </div>
   )

}
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import { IUser } from '../../interfaces/User'
import { setSearchModal } from '../../redux/searchModal'
import { RootState } from '../../redux/store'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL } from '../../utils/env'
import SearchModal from '../Modals/Search'


export default () => {

   const [user, setUser] = useState<IUser>()

   const dispatch = useDispatch()

   const { searchModal } = useSelector((state: RootState) => state.searchModal)

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
            <button onClick={() => dispatch(setSearchModal(!searchModal))}>Click</button>
            <SearchModal />
         </div>
      </div>
   </>
}
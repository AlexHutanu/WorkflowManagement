import { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HttpMethods } from '../../../constants/httpsMethods'
import { callAxios } from '../../../utils/axios'
import { API_BASE_URL } from '../../../utils/env'
import { setToLocalStorage } from '../../../utils/localStorage'
import { ILogin } from '../../../interfaces/Login'
import { UrlPaths } from '../../../constants/urlPaths'


export default () => {

   const [ email, setEmail ] = useState('')
   const [ password, setPassword ] = useState('')

   const navigate = useNavigate()

   const submit = async (e: SyntheticEvent) => {
      e.preventDefault()

      const {data, error} = await callAxios<ILogin>(`${API_BASE_URL}${UrlPaths.LOGIN}`, {
         method: HttpMethods.POST,
         requestBody: {
            email,
            password
         }
      })

      !error && data && setToLocalStorage(({key: "token", value: data.token}))

   }

   return (
      <div className="auth-form">
         <form onSubmit={submit}>
            <h1>Please sign in</h1>
            <input type="text" placeholder="Email address" required
                   onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" required
                   onChange={e => setPassword(e.target.value)}/>
            <button type="submit">Sign in</button>
         </form>
      </div>
   )

}
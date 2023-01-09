import { SyntheticEvent, useState } from 'react'
import { HttpMethods } from '../../../constants/httpsMethods'
import { UrlPaths } from '../../../constants/urlPaths'
import { IAuth } from '../../../interfaces/Auth'
import { callAxios } from '../../../utils/axios'
import { API_BASE_URL } from '../../../utils/env'
import { setToLocalStorage } from '../../../utils/localStorage'

export enum FormType {
   SIGNIN = "SIGNIN",
   SIGNUP = "SIGNUP"
}

export default ({ formType }: {formType: FormType}) => {

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const submit = async (e: SyntheticEvent) => {
      e.preventDefault();

      let requestBody
      let urlPath

      switch (formType) {
         case FormType.SIGNIN:
            requestBody = {
               email,
               password
            }
            urlPath = UrlPaths.LOGIN
            break
         case FormType.SIGNUP:
            requestBody = {
               name,
               email,
               password
            }
            urlPath = UrlPaths.REGISTER
            break
      }


      const {data, error} = await callAxios<IAuth>(`${API_BASE_URL}${urlPath}`, {
         method: HttpMethods.POST,
         requestBody
      })

         !error && data && setToLocalStorage(({key: "token", value: data.token}))
   }


   return (
      <div className="auth-form">
         <form onSubmit={submit}>
            <h1>Please sign up</h1>
            { formType === FormType.SIGNUP && <input type="text" placeholder="Name" required onChange={e => setName(e.target.value)}/> }
            <input type="text" placeholder="Email address" required onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
            <button type="submit">{formType === FormType.SIGNUP? 'Sign Up': 'Sign In'}</button>
         </form>
      </div>
   )

}
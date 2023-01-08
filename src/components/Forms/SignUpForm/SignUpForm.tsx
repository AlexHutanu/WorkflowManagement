import { SyntheticEvent, useState } from 'react'
import { HttpMethods } from '../../../constants/httpsMethods'
import { IRegister } from '../../../interfaces/Register'
import { callAxios } from '../../../utils/axios'
import { API_BASE_URL } from '../../../utils/env'


export default () => {

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const submit = async (e: SyntheticEvent) => {
      e.preventDefault();

      const {data, error} = await callAxios<IRegister>(`${API_BASE_URL}/register`, {
         method: HttpMethods.POST,
         requestBody: {
            name,
            email,
            password
         }
      })
   }


   return (
      <div className="auth-form">
         <form onSubmit={submit}>
            <h1>Please sign up</h1>
            <input type="text" placeholder="Name" required onChange={e => setName(e.target.value)}/>
            <input type="text" placeholder="Email address" required onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
            <button type="submit">Sign up</button>
         </form>
      </div>
   )

}
import { SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HttpMethods } from '../../../constants/httpsMethods'
import { UrlPaths } from '../../../constants/urlPaths'
import { IAuth } from '../../../interfaces/Auth'
import { callAxios } from '../../../utils/axios'
import { API_BASE_URL } from '../../../utils/env'
import { isTokenValid } from '../../../utils/jwt'
import { setToLocalStorage } from '../../../utils/localStorage'


export enum FormType {
   SIGNIN = 'SIGNIN',
   SIGNUP = 'SIGNUP'
}

export default ({ formType }: { formType: FormType }) => {

   const [ name, setName ] = useState('')
   const [ email, setEmail ] = useState('')
   const [ password, setPassword ] = useState('')

   const navigate = useNavigate()

   useEffect(() => {
      isTokenValid() && navigate(UrlPaths.DASHBOARD)
   }, [])

   const submit = async (e: SyntheticEvent) => {
      e.preventDefault()

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


      const { data, error } = await callAxios<IAuth>(`${API_BASE_URL}${urlPath}`, {
         method: HttpMethods.POST,
         requestBody
      })


      if (!error && FormType.SIGNIN === formType) {
         data && setToLocalStorage(({ key: 'token', value: data.token }))
         navigate(UrlPaths.DASHBOARD)
      } else if (!error && FormType.SIGNUP === formType) {
         navigate(UrlPaths.LOGIN)
      }
   }


   return (
      <div className="auth-form">
         <div className="auth-form__title-container">
            <p className="auth-form__title-container__title">WorkflowManagement</p>
            <p className="auth-form__title-container__description">Lorem ipsum dolor sit amet,
               consectetur adipisicing elit. Dicta et excepturi maiores nobis quas vero!</p>
         </div>
         <form onSubmit={submit} className="auth-form__form">
            <h2>{formType === FormType.SIGNIN ? 'Login': 'Register'}</h2>
            {formType === FormType.SIGNUP &&
            <input className="auth-form__form__input" type="text" placeholder="Name" required
                   onChange={e => setName(e.target.value)}/>}
            <input type="text" className="auth-form__form__input" placeholder="Email address"
                   required onChange={e => setEmail(e.target.value)}/>
            <input type="password" className="auth-form__form__input" placeholder="Password"
                   required onChange={e => setPassword(e.target.value)}/>
            <div className="auth-form__form__button">
               { formType === FormType.SIGNIN ? <p>Don't have an account yet? <a
                  href="http://localhost:5173/register">Sign up!</a>
               </p>: <p>Have an account? <a
                  href="http://localhost:5173/login">Sign in!</a>
               </p>}
            <button type="submit"
                    className="auth-form__form__button__submit-button">{formType === FormType.SIGNUP ? 'REGISTER' : 'LOGIN'}</button>
            </div>
         </form>
      </div>
   )

}
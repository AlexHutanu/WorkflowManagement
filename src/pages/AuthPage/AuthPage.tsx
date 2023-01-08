import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SignInForm from '../../components/Forms/SignInForm'
import SignUpForm from '../../components/Forms/SignUpForm'
import { HttpMethods } from '../../constants/httpsMethods'
import { UrlPaths } from '../../constants/urlPaths'
import { callAxios } from '../../utils/axios'
import { API_BASE_URL, getEnvironmentVariable } from '../../utils/env'
import { setToLocalStorage } from '../../utils/localStorage'


export default () => {
   const [login, setLogin] = useState(false);
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const navigate = useNavigate()

/*   useEffect(() => {
      (async () => {

         await callAxios("localhost:5077", {

            method: HttpMethods.POST,
            requestBody: {username, password}
         })

         login && navigate(UrlPaths.HOMEPAGE);
      })()
   }, [login])*/

   return (
      <div className="auth-page">
         <SignUpForm />
         <SignInForm />
      </div>
   )

}
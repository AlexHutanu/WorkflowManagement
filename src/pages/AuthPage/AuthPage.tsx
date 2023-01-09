import AuthForm from '../../components/Forms/AuthForm'
import { FormType } from '../../components/Forms/AuthForm/AuthForm'


export default ({ authType }: { authType: FormType }) => {

   return (
      <div className="auth-page">
         {authType === FormType.SIGNUP && <AuthForm formType={FormType.SIGNUP}/>}
         {authType === FormType.SIGNIN && <AuthForm formType={FormType.SIGNIN}/>}
      </div>
   )

}
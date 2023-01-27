import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HttpMethods } from '../../../constants/httpsMethods'
import { UrlPaths } from '../../../constants/urlPaths'
import { IBoard, ICreateBoard } from '../../../interfaces/Board'
import { setCreateBoardModal } from '../../../redux/createBoardModal'
import { IUser } from '../../../interfaces/User'
import { RootState } from '../../../redux/store'
import { callAxios } from '../../../utils/axios'
import { API_BASE_URL } from '../../../utils/env'


export default () => {

   const [ loggedUser, setLoggedUser ] = useState<IUser>()

   const { createBoardModal } = useSelector((state: RootState) => state.createBoardModal)

   const dispatch = useDispatch()

   useEffect(() => {
      (async () => {
         const { data, error } = await callAxios<IUser>(`${API_BASE_URL}${UrlPaths.LOGGED_USER}`, {
            method: HttpMethods.GET,
            auth: true
         })
         !error && data && setLoggedUser(data)
      })()
   }, [])

   const formik = useFormik({
      initialValues: {
         name: '',
         description: ''
      },
      onSubmit: async (values) => {

         if (loggedUser) {
            const {
               data,
               error
            } = await callAxios<IBoard, ICreateBoard>(`${API_BASE_URL}${UrlPaths.BOARDS}`, {
               method: HttpMethods.POST,
               requestBody: { ...values, userId: loggedUser.id }
            })
            dispatch(setCreateBoardModal(false))
         }
      }
   })

   return (
      <div className="board-form">
         <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
               autoComplete={'off'}
               name="name"
               placeholder="Enter a name..."
               onChange={formik.handleChange}
               value={formik.values.name}
            />

            <div className="board-form__buttons">
               <button className="board-form__buttons__button" type="submit">Create board</button>
               <button
                  className="board-form__buttons__button board-form__buttons__button--cancel"
                  onClick={() => dispatch(setCreateBoardModal(false))}>Cancel
               </button>
            </div>
         </form>
      </div>
   )
}

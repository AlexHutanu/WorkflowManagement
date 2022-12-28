import { useFormik } from 'formik'
import { HttpMethods } from '../../../constants/httpsMethods'
import { IBoard, ICreateBoard } from '../../../interfaces/Board'
import { callAxios } from '../../../utils/axios'
import { API_BASE_URL } from '../../../utils/env'


export default () => {

   const formik = useFormik({
      initialValues: {
         name: '',
         description: ''
      },
      onSubmit: async (values) => {

         const {data, error} = await callAxios<IBoard, ICreateBoard>(`${API_BASE_URL}/boards`, {
            method: HttpMethods.POST,
            requestBody: {...values, owner: "fwefwe"}
         })
      }
   })


   return (
      <form onSubmit={formik.handleSubmit}>
         <label htmlFor="name">Name</label>
         <input
            name = "name"
            onChange = {formik.handleChange}
            value = {formik.values.name}
         />
         <label htmlFor="description">Description</label>
         <input
            name = "description"
            onChange={formik.handleChange}
            value = {formik.values.description}
         />

         <button type="submit">Submit</button>
      </form>
   )
}

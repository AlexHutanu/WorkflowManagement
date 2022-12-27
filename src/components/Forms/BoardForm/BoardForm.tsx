import { useFormik } from 'formik'
import { HttpMethods } from '../../../constants/httpsMethods'
import { callAxios } from '../../../utils/axios'
import { API_BASE_URL } from '../../../utils/env'


export default () => {

   const formik = useFormik({
      initialValues: {
         name: '',
         description: ''
      },
      onSubmit: async (values) => {
         console.log(API_BASE_URL)
         const {data, error} = await callAxios(`${API_BASE_URL}/boards5`, {
            method: HttpMethods.POST,
            requestBody: values
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

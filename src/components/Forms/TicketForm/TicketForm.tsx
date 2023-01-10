import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { UrlPaths } from '../../../constants/urlPaths'
import { HttpMethods } from '../../../constants/httpsMethods'
import { ICreateTicket, ITicket } from '../../../interfaces/Ticket'
import { RootState } from '../../../redux/store'
import { callAxios } from '../../../utils/axios'
import { API_BASE_URL } from '../../../utils/env'


export default () => {

   const { boardId: boardId } = useSelector((state: RootState) => state.boardId)


   const formik = useFormik({
      initialValues: {
         name: '',
         description: '',
         assignee: '',
         deadline: '',
         status: '',
      },
      onSubmit: async (values) => {

         const {
            data,
            error
         } = await callAxios<ITicket, ICreateTicket>(`${API_BASE_URL}${UrlPaths.TICKETS}`, {
            method: HttpMethods.POST,
            requestBody: { ...values, reporter: 'test', boardId: boardId }
         })
      }
   })

   return (
      <div className="ticket-form">
         <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
               type="text"
               name="name"
               onChange={formik.handleChange}
               value={formik.values.name}/>
            <label htmlFor="description">Description</label>
            <input
               type="text"
               name="description"
               onChange={formik.handleChange}
               value={formik.values.description}/>
            <label htmlFor="assignee">Assignee</label>
            <input
               type="text"
               name="assignee"
               onChange={formik.handleChange}
               value={formik.values.assignee}/>
            <label htmlFor="deadline">Deadline</label>
            <input
               type="text"
               name="deadline"
               onChange={formik.handleChange}
               value={formik.values.deadline}/>
            <label htmlFor="status">Status</label>
            <input
               type="text"
               name="status"
               onChange={formik.handleChange}
               value={formik.values.status}/>
            <button type="submit">Submit</button>
         </form>
      </div>
   )
}
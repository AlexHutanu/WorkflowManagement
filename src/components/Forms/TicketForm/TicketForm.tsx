import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HttpMethods } from '../../../constants/httpsMethods'
import { TicketLabel, TicketStatus, TicketType } from '../../../constants/ticketValues'
import { UrlPaths } from '../../../constants/urlPaths'
import { ICreateTicket, ITicket } from '../../../interfaces/Ticket'
import { IUser } from '../../../interfaces/User'
import { callAxios } from '../../../utils/axios'
import { API_BASE_URL } from '../../../utils/env'
import DescriptionSection from '../../Tickets/DescriptionSection'


export default ({ handleClose }: { handleClose: Function }) => {

   const [ user, setUser ] = useState<IUser>()
   const [ users, setUsers ] = useState<IUser[]>()
   const [ assignedUser, setAssignedUser ] = useState('')

   const [ searchParams, setSearchParams ] = useSearchParams()

   const [ showLabels, setShowLabels ] = useState(false)
   const [ showUsers, setShowUsers ] = useState(false)
   const [ showTypes, setShowTypes ] = useState(false)
   const [ showStatusUpdates, setShowStatusUpdates ] = useState(false)

   const [ label, setLabel ] = useState('')
   const [ status, setStatus ] = useState('')
   const [ type, setType ] = useState('')
   const [ description, setDescription ] = useState('')
   const [ name, setName ] = useState('')

   const [ labelNumberValue, setLabelNumberValue ] = useState<number>()
   const [ statusNumberValue, setStatusNumberValue ] = useState<number>()
   const [ typeNumberValue, setTypeNumberValue ] = useState<number>()

   let boardIdParam = searchParams.get('boardId')


   const onSubmitHandler = () => {
      (async () => {
         const {
            data,
            error
         } = await callAxios<ITicket, ICreateTicket>(`${API_BASE_URL}${UrlPaths.TICKETS}`, {
            method: HttpMethods.POST,
            requestBody: {
               name: name,
               assignee: assignedUser,
               description: description,
               status: statusNumberValue,
               label: labelNumberValue,
               type: typeNumberValue,
               boardId: boardIdParam ? boardIdParam : '',
               userId: user.id,
               reporter: user.name

            }
         })
      })()
   }

   console.log(assignedUser)

   useEffect(() => {
      (async () => {
         const {
            data: usersData,
            error: usersError
         } = await callAxios<IUser[]>(`${API_BASE_URL}${UrlPaths.USERS}`, {
            method: HttpMethods.GET,
            auth: true
         })

         !usersError && usersData && setUsers(usersData)
      })()
   }, [])


   useEffect(() => {
      (async () => {
         const {
            data: userData,
            error: userError
         } = await callAxios<IUser>(`${API_BASE_URL}${UrlPaths.LOGGED_USER}`, {
            method: HttpMethods.GET,
            auth: true
         })
         !userError && userData && setUser(userData)
      })()
   }, [])

   return (
      <div className="ticket-form">
         <div className="ticket-form__right-side">
            <input className="ticket-form__right-side__title-input" type="text"
                   placeholder="Write a title..." onChange={(e) => setName(e.target.value)}/>
            <div className="ticket-form__description">
               <DescriptionSection setDescription={setDescription}/>
            </div>
         </div>
         <div className="ticket-form__left-side">
            <div className="ticket-form__left-side__element">
               <span>
                  Reporter
               </span>
               <p className="ticket-form__left-side__element__name">
                  {user?.name}
               </p>
            </div>
            <div className="ticket-form__left-side__element">
               <span>Assignee</span>
               <div className="ticket-form__left-side__element__select">
                  <button className="label-button"
                          onClick={() => setShowUsers(prev => !prev)}>
                     {assignedUser ? assignedUser : 'Select user'}
                  </button>
                  {showUsers &&
                  <ul className="users-list">
                     {users?.map((user) =>
                        <li className="assigned-user" onClick={() => {
                           setAssignedUser(user.name)
                           setShowUsers(false)
                        }}
                            key={user.id}>{user.name}</li>
                     )}
                  </ul>
                  }

               </div>
            </div>
            <div className="ticket-form__left-side__element">
               <span>
                  Label
               </span>
               <div className="ticket-form__left-side__element__select">
                  <button className="label-button"
                          onClick={() => setShowLabels(prev => !prev)}>
                     {label ? label : 'Select label'}
                  </button>
                  {showLabels && <div className="label-options">
                     <span className="label-options__option" onClick={() => {
                        setLabel(TicketLabel.FRONT_END)
                        setLabelNumberValue(0)
                        setShowLabels(false)
                     }}>
                     {TicketLabel.FRONT_END}
                  </span>
                      <span className="label-options__option" onClick={() => {
                         setLabel(TicketLabel.BACK_END)
                         setLabelNumberValue(1)
                         setShowLabels(false)
                      }}>
                         {TicketLabel.BACK_END}
                  </span>
                  </div>}

               </div>
            </div>
            <div className="ticket-form__left-side__element">
               <span>
                  Status
               </span>
               <div className="ticket-form__left-side__element__select">
                  <button className="status-button"
                          onClick={() => setShowStatusUpdates(prev => !prev)}>
                     {status ? status : TicketStatus.TO_DO}
                  </button>
                  {showStatusUpdates && <div className="status-options">
                  <span className="status-options__option" onClick={() => {
                     setStatus(TicketStatus.TO_DO)
                     setStatusNumberValue(0)
                     setShowStatusUpdates(false)
                  }}>
                     {TicketStatus.TO_DO}
                  </span>
                      <span className="status-options__option" onClick={() => {
                         setStatus(TicketStatus.IN_PROGRESS)
                         setStatusNumberValue(1)
                         setShowStatusUpdates(false)
                      }}>
                     {TicketStatus.IN_PROGRESS}
                  </span>
                      <span className="status-options__option" onClick={() => {
                         setStatus(TicketStatus.DONE)
                         setStatusNumberValue(2)
                         setShowStatusUpdates(false)
                      }}>
                     {TicketStatus.DONE}
                  </span>
                  </div>}

               </div>
            </div>
            <div className="ticket-form__left-side__element">
               <span>
                  Type
               </span>
               <div className="ticket-form__left-side__element__select">
                  <button className="type-button"
                          onClick={() => setShowTypes(prev => !prev)}>
                     {type ? type : 'Select type'}
                  </button>
                  {showTypes && <div className="type-options">
                     <span className="type-options__option" onClick={() => {
                        setType(TicketType.TO_DO)
                        setTypeNumberValue(0)
                        setShowTypes(false)
                     }}>
                     {TicketType.TO_DO}
                  </span>
                      <span className="type-options__option" onClick={() => {
                         setType(TicketType.BUG_TICKET)
                         setTypeNumberValue(1)
                         setShowTypes(false)
                      }}>
                         {TicketType.BUG_TICKET}
                  </span>
                      <span className="type-options__option" onClick={() => {
                         setType(TicketType.FEATURE_REQUEST)
                         setTypeNumberValue(2)
                         setShowTypes(false)
                      }}>
                         {TicketType.FEATURE_REQUEST}
                  </span>
                  </div>}

               </div>
            </div>
            <button className="ticket-form__submit-button" onClick={() => {
               onSubmitHandler()
               handleClose()
            }}>Create
            </button>
         </div>
      </div>
   )
}

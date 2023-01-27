import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HttpMethods } from '../../../constants/httpsMethods'
import {
   TicketLabel,
   TicketLabels,
   TicketLabelsStatuses,
   TicketStatus,
   TicketStatuses,
   TicketStatusNumber,
   TicketType,
   TicketTypeNumber,
   TicketTypeStatuses
} from '../../../constants/ticketValues'
import { UrlPaths } from '../../../constants/urlPaths'
import { ITicket } from '../../../interfaces/Ticket'
import { IUser } from '../../../interfaces/User'
import { callAxios } from '../../../utils/axios'
import { API_BASE_URL } from '../../../utils/env'
import DescriptionSection from '../../Tickets/DescriptionSection'


interface IPatchField {
   path: string
   value: string
}

export default ({
                   handleClose,
                   ticketData,
                   createMode,
                     setUpdateTickets
                }: { handleClose: Function, ticketData?: ITicket, createMode: boolean, setUpdateTickets: Dispatch<SetStateAction<boolean>> }) => {

   const [ searchParams ] = useSearchParams()

   const [ user, setUser ] = useState<IUser>()
   const [ users, setUsers ] = useState<IUser[]>()

   const [ showLabels, setShowLabels ] = useState(false)
   const [ showUsers, setShowUsers ] = useState(false)
   const [ showTypes, setShowTypes ] = useState(false)
   const [ showStatusUpdates, setShowStatusUpdates ] = useState(false)

   const [ assignedUser, setAssignedUser ] = useState('')
   const [ label, setLabel ] = useState('')
   const [ status, setStatus ] = useState('')
   const [ type, setType ] = useState('')
   const [ description, setDescription ] = useState('')
   const [ name, setName ] = useState('')
   const [ ticketId, setTicketId ] = useState('')
   const [ reporter, setReporter ] = useState('')
   const [ assignedUserName, setAssignedUserName ] = useState('')

   const [ labelNumberValue, setLabelNumberValue ] = useState<number>()
   const [ statusNumberValue, setStatusNumberValue ] = useState<number>()
   const [ typeNumberValue, setTypeNumberValue ] = useState<number>()

   const [ editDescription, setEditDescription ] = useState(false)

   const [ editMode, setEditMode ] = useState(false)

   let boardIdParam = searchParams.get('boardId')

   const onChangeTicket = async () => {

      const patchRequestBodies = [
         { path: '/label', value: label },
         { path: '/status', value: status },
         { path: '/type', value: type },
         { path: '/description', value: description },
         { path: '/name', value: name },
         { path: '/assignee', value: assignedUser } ].map((field: IPatchField) => {
         switch (field.path) {
            case '/label':
               return {
                  path: field.path,
                  op: 'replace',
                  value: TicketLabelsStatuses[field.value as TicketLabel].valueNumber
               }
            case '/status':
               return {
                  path: field.path,
                  op: 'replace',
                  value: TicketStatuses[field.value as TicketStatus].valueNumber
               }
            case '/type':
               return {
                  path: field.path,
                  op: 'replace',
                  value: TicketTypeStatuses[field.value as TicketType].valueNumber
               }
            case '/description':
               return {
                  path: field.path,
                  op: 'replace',
                  value: field.value
               }
            case '/name':
               return {
                  path: field.path,
                  op: 'replace',
                  value: field.value
               }
            case '/assignee':
               return {
                  path: field.path,
                  op: 'replace',
                  value: field.value
               }
         }
      })

      const {
         error
      } = await callAxios<ITicket>(`${API_BASE_URL}${UrlPaths.TICKETS}/${ticketId}`, {
         method: HttpMethods.PATCH,
         auth: true,
         requestBody: patchRequestBodies
      })

      if (!error) {
         setEditMode(false)
         handleClose()
         setUpdateTickets(prev => !prev)
      }
   }

   const onSubmitHandler = async () => {
      user && await callAxios<ITicket>(`${API_BASE_URL}${UrlPaths.TICKETS}`, {
         method: HttpMethods.POST,
         requestBody: {
            name,
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
   }

   useEffect(() => {

      if (ticketData) {
         setAssignedUser(ticketData.assignee)
         setLabel(TicketLabels[ticketData.label])
         setStatus(TicketStatuses[TicketStatusNumber[ticketData.status]].value)
         setType(TicketTypeStatuses[TicketTypeNumber[ticketData.type]].value)
         setName(ticketData.name)
         setDescription(ticketData.description)
         setTicketId(ticketData.id)
         setReporter(ticketData.reporter)
      }

      (async () => {
         const {
            data: usersData,
            error: usersError
         } = await callAxios<IUser[]>(`${API_BASE_URL}${UrlPaths.USERS}`, {
            method: HttpMethods.GET,
            auth: true
         })

         if (!usersError && usersData) {
            setUsers(usersData)
            usersData.forEach((user: IUser) => ticketData && user.id === ticketData.assignee && setAssignedUserName(user.name))
         }

      })()
   }, [ ticketData ])

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
            <input className="ticket-form__right-side__title-input"
                   type="text"
                   value={name}
                   placeholder="Write a title..."
                   onChange={(e) => {
                      setEditMode(true)
                      setName(e.target.value)
                   }}/>
            <div className="ticket-form__description">
               <DescriptionSection
                  setDescription={setDescription}
                  value={description}
                  setEditMode={setEditMode}
                  setEditDescription={setEditDescription}/>
            </div>
         </div>
         <div className="ticket-form__left-side">
            {createMode &&
            <div className="ticket-form__left-side__element" style={{ visibility: 'hidden' }}>
               <span>
                  Reporter
               </span>
                <p className="ticket-form__left-side__element__name">
                   {reporter}
                </p>
            </div>}
            {!createMode && <div className="ticket-form__left-side__element">
               <span>
                  Reporter
               </span>
                <p className="ticket-form__left-side__element__name">
                   {reporter}
                </p>
            </div>}
            <div className="ticket-form__left-side__element">
               <span>Assignee</span>
               <div className="ticket-form__left-side__element__select">
                  <button className="assignee-button"
                          onClick={() => {
                             setShowTypes(false)
                             setShowLabels(false)
                             setShowStatusUpdates(false)
                             setShowUsers(prev => !prev)
                          }}>
                     {assignedUserName ? assignedUserName : 'Select user'}
                  </button>
                  {showUsers &&
                  <ul className="users-list">
                     {users?.map((user) =>
                        <li className="assigned-user" onClick={async () => {
                           if (createMode) {
                              setAssignedUser(user.id)
                              setAssignedUserName(user.name)
                           } else {
                              setAssignedUser(user.id)
                              setAssignedUserName(user.name)
                              setEditMode(true)
                           }
                           setShowUsers(false)
                        }} key={user.id}>{user.name}</li>
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
                  <button className="assignee-button"
                          onClick={() => {
                             setShowTypes(false)
                             setShowUsers(false)
                             setShowStatusUpdates(false)
                             setShowLabels(prev => !prev)
                          }}>
                     {label ? label : 'Select label'}
                  </button>
                  {showLabels && <div className="label-options">
                     <span className="label-options__option" onClick={async () => {
                        if (createMode) {
                           setLabel(TicketLabelsStatuses[TicketLabel.FRONT_END].value)
                           setLabelNumberValue(TicketLabelsStatuses[TicketLabel.FRONT_END].valueNumber)
                        } else {
                           setLabel(TicketLabelsStatuses[TicketLabel.FRONT_END].value)
                           setLabelNumberValue(TicketLabelsStatuses[TicketLabel.FRONT_END].valueNumber)
                           setEditMode(true)
                        }
                        setShowLabels(false)
                     }}>
                     {TicketLabel.FRONT_END}
                  </span>
                      <span className="label-options__option" onClick={async () => {
                         if (createMode) {
                            setLabel(TicketLabelsStatuses[TicketLabel.BACK_END].value)
                            setLabelNumberValue(TicketLabelsStatuses[TicketLabel.BACK_END].valueNumber)
                         } else {
                            setLabel(TicketLabelsStatuses[TicketLabel.BACK_END].value)
                            setLabelNumberValue(TicketLabelsStatuses[TicketLabel.BACK_END].valueNumber)
                            setEditMode(true)
                         }
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
                  <button className="assignee-button"
                          onClick={() => {
                             setShowTypes(false)
                             setShowLabels(false)
                             setShowUsers(false)
                             setShowStatusUpdates(prev => !prev)
                          }}>
                     {status ? status : TicketStatus.TO_DO}
                  </button>
                  {showStatusUpdates && <div className="status-options">
                  <span className="status-options__option"
                        onClick={async () => {
                           if (createMode) {
                              setStatus(TicketStatuses[TicketStatus.TO_DO].value)
                              setStatusNumberValue(TicketStatuses[TicketStatus.TO_DO].valueNumber)
                           } else {
                              setStatus(TicketStatuses[TicketStatus.TO_DO].value)
                              setStatusNumberValue(TicketStatuses[TicketStatus.TO_DO].valueNumber)
                              setEditMode(true)
                           }
                           setShowStatusUpdates(false)
                        }}>
                     {TicketStatus.TO_DO}
                  </span>
                      <span className="status-options__option"
                            onClick={async () => {
                               if (createMode) {

                                  setStatus(TicketStatuses[TicketStatus.IN_PROGRESS].value)
                                  setStatusNumberValue(TicketStatuses[TicketStatus.IN_PROGRESS].valueNumber)
                               } else {
                                  setStatus(TicketStatuses[TicketStatus.IN_PROGRESS].value)
                                  setStatusNumberValue(TicketStatuses[TicketStatus.IN_PROGRESS].valueNumber)
                                  setEditMode(true)
                               }
                               setShowStatusUpdates(false)
                            }}>
                     {TicketStatus.IN_PROGRESS}
                  </span>
                      <span className="status-options__option"
                            onClick={async () => {
                               if (createMode) {

                                  setStatus(TicketStatuses[TicketStatus.DONE].value)
                                  setStatusNumberValue(TicketStatuses[TicketStatus.DONE].valueNumber)
                               } else {
                                  setStatus(TicketStatuses[TicketStatus.DONE].value)
                                  setStatusNumberValue(TicketStatuses[TicketStatus.DONE].valueNumber)
                                  setEditMode(true)
                               }
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
                  <button className="assignee-button"
                          onClick={() => {
                             setShowUsers(false)
                             setShowLabels(false)
                             setShowStatusUpdates(false)
                             setShowTypes(prev => !prev)
                          }}>
                     {type ? type : 'Select type'}
                  </button>
                  {showTypes && <div className="type-options">
                     <span className="type-options__option" onClick={async () => {
                        if (createMode) {

                           setType(TicketTypeStatuses[TicketType.TASK].value)
                           setTypeNumberValue(TicketTypeStatuses[TicketType.TASK].valueNumber)
                        } else {
                           setType(TicketTypeStatuses[TicketType.TASK].value)
                           setTypeNumberValue(TicketTypeStatuses[TicketType.TASK].valueNumber)
                           setEditMode(true)
                        }
                        setShowTypes(false)
                     }}>
                     {TicketType.TASK}
                  </span>
                      <span className="type-options__option" onClick={async () => {
                         if (createMode) {

                            setType(TicketTypeStatuses[TicketType.BUG_TICKET].value)
                            setTypeNumberValue(TicketTypeStatuses[TicketType.BUG_TICKET].valueNumber)
                         } else {
                            setType(TicketTypeStatuses[TicketType.BUG_TICKET].value)
                            setTypeNumberValue(TicketTypeStatuses[TicketType.BUG_TICKET].valueNumber)
                            setEditMode(true)
                         }
                         setShowTypes(false)
                      }}>
                         {TicketType.BUG_TICKET}
                  </span>
                      <span className="type-options__option" onClick={async () => {
                         if (createMode) {
                            setType(TicketTypeStatuses[TicketType.FEATURE_REQUEST].value)
                            setTypeNumberValue(TicketTypeStatuses[TicketType.FEATURE_REQUEST].valueNumber)
                         } else {
                            setType(TicketTypeStatuses[TicketType.FEATURE_REQUEST].value)
                            setTypeNumberValue(TicketTypeStatuses[TicketType.FEATURE_REQUEST].valueNumber)
                            setEditMode(true)
                         }
                         setShowTypes(false)
                      }}>
                         {TicketType.FEATURE_REQUEST}
                  </span>

                  </div>}

               </div>
            </div>
            <div className="ticket-form__edit-description">
               {editMode && !createMode &&
               <button className="ticket-form__edit-description__save-button" onClick={async () => {
                  await onChangeTicket()
               }}>Save</button>}
               {
                  !createMode && editMode &&
                  <button className="ticket-form__edit-description__cancel-button"
                          onClick={() => {
                             setEditMode(false)
                             handleClose()
                          }}>Cancel</button>
               }
            </div>
         </div>
         {createMode && <button className="ticket-form__submit-button" onClick={async () => {
            await onSubmitHandler()
            setEditMode(false)
            handleClose()
         }}>Create
         </button>}
      </div>
   )
}

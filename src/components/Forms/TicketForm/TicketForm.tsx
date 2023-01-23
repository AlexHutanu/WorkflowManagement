import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HttpMethods } from '../../../constants/httpsMethods'
import { patchTicketsFields } from '../../../constants/patchTicketFields'
import {
   TicketLabel,
   TicketLabels, TicketLabelsStatuses,
   TicketStatus,
   TicketStatuses,
   TicketStatusNumber,
   TicketType, TicketTypeNumber, TicketTypeStatuses
} from '../../../constants/ticketValues'
import { UrlPaths } from '../../../constants/urlPaths'
import useDebounce from '../../../hooks/useDebounce'
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
                   createMode
                }: { handleClose: Function, ticketData?: ITicket, createMode: boolean }) => {

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

   const [ labelNumberValue, setLabelNumberValue ] = useState<number>()
   const [ statusNumberValue, setStatusNumberValue ] = useState<number>()
   const [ typeNumberValue, setTypeNumberValue ] = useState<number>()

   const [ editDescription, setEditDescription ] = useState(false)

   let boardIdParam = searchParams.get('boardId')

   const onStatusChanged = async (patchField: IPatchField, ticketId: string) => {

      let patchValue
      if (patchField.path === '/status') {
         patchValue = TicketStatuses[patchField.value as TicketStatus].valueNumber
      } else if (patchField.path === '/label') {
         patchValue = TicketLabelsStatuses[patchField.value as TicketLabel].valueNumber
      } else if (patchField.path === '/type') {
         patchValue = TicketTypeStatuses[patchField.value as TicketType].valueNumber
      } else {
         patchValue = patchField.value
      }
      const {
         error
      } = await callAxios<ITicket>(`${API_BASE_URL}${UrlPaths.TICKETS}/${ticketId}`, {
         method: HttpMethods.PATCH,
         auth: true,
         requestBody: [ {
            path: patchField.path,
            op: 'replace',
            value: patchValue
         } ]
      })

      if (!error) {
         switch (patchField.path) {
            case '/status': {
               setStatus(TicketStatuses[patchField.value as TicketStatus].value)
               setStatusNumberValue(TicketStatuses[patchField.value as TicketStatus].valueNumber)
               break
            }
            case '/label': {
               setLabel(TicketLabelsStatuses[patchField.value as TicketLabel].value)
               setLabelNumberValue(TicketLabelsStatuses[patchField.value as TicketLabel].valueNumber)
               break
            }
            case '/type': {
               setType(TicketTypeStatuses[patchField.value as TicketType].value)
               setTypeNumberValue(TicketTypeStatuses[patchField.value as TicketType].valueNumber)
               break
            }
            case '/assignee': {
               setAssignedUser(patchField.value)
               break
            }
            default:
               throw Error('Field path not valid')
         }
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

         !usersError && usersData && setUsers(usersData)
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
            <input className="ticket-form__right-side__title-input" type="text"
                   value={name}
                   placeholder="Write a title..." onChange={(e) => setName(e.target.value)}/>
            <div className="ticket-form__description">
               <DescriptionSection setDescription={setDescription} value={description}
                                   setEditDescription={setEditDescription}/>
            </div>
         </div>
         <div className="ticket-form__left-side">
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
                  <button className="label-button"
                          onClick={() => setShowUsers(prev => !prev)}>
                     {assignedUser ? assignedUser : 'Select user'}
                  </button>
                  {showUsers &&
                  <ul className="users-list">
                     {users?.map((user) =>
                        <li className="assigned-user" onClick={async () => {
                           if (createMode) {
                              setAssignedUser(user.name)
                           } else {
                              await onStatusChanged({
                                 path: patchTicketsFields.assignee,
                                 value: user.name
                              }, ticketId)
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
                  <button className="label-button"
                          onClick={() => setShowLabels(prev => !prev)}>
                     {label ? label : 'Select label'}
                  </button>
                  {showLabels && <div className="label-options">
                     <span className="label-options__option" onClick={async () => {
                        if (createMode) {
                           setLabel(TicketLabelsStatuses[TicketLabel.FRONT_END].value)
                           setLabelNumberValue(TicketLabelsStatuses[TicketLabel.FRONT_END].valueNumber)
                        } else {
                           await onStatusChanged({
                              path: patchTicketsFields.label,
                              value: TicketLabel.FRONT_END
                           }, ticketId)
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
                            await onStatusChanged({
                               path: patchTicketsFields.label,
                               value: TicketLabel.BACK_END
                            }, ticketId)
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
                  <button className="status-button"
                          onClick={() => setShowStatusUpdates(prev => !prev)}>
                     {status ? status : TicketStatus.TO_DO}
                  </button>
                  {showStatusUpdates && <div className="status-options">
                  <span className="status-options__option"
                        onClick={async () => {
                           if (createMode) {
                              setStatus(TicketStatuses[TicketStatus.TO_DO].value)
                              setStatusNumberValue(TicketStatuses[TicketStatus.TO_DO].valueNumber)
                              setShowStatusUpdates(false)
                           } else {
                              await onStatusChanged({
                                 path: patchTicketsFields.status,
                                 value: TicketStatus.TO_DO
                              }, ticketId)
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
                                  await onStatusChanged({
                                     path: patchTicketsFields.status,
                                     value: TicketStatus.IN_PROGRESS
                                  }, ticketId)
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
                                  await onStatusChanged({
                                     path: patchTicketsFields.status,
                                     value: TicketStatus.DONE
                                  }, ticketId)
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
                  <button className="label-button"
                          onClick={() => setShowTypes(prev => !prev)}>
                     {type ? type : 'Select type'}
                  </button>
                  {showTypes && <div className="label-options">
                     <span className="label-options__option" onClick={async () => {
                        if (createMode) {
                           setType(TicketTypeStatuses[TicketType.TO_DO].value)
                           setTypeNumberValue(TicketTypeStatuses[TicketType.TO_DO].valueNumber)
                        } else {
                           await onStatusChanged({
                              path: patchTicketsFields.type,
                              value: TicketType.TO_DO
                           }, ticketId)
                        }
                        setShowTypes(false)
                     }}>
                     {TicketType.TO_DO}
                  </span>
                      <span className="label-options__option" onClick={async () => {
                         if (createMode) {
                            setType(TicketTypeStatuses[TicketType.BUG_TICKET].value)
                            setTypeNumberValue(TicketTypeStatuses[TicketType.BUG_TICKET].valueNumber)
                         } else {
                            await onStatusChanged({
                               path: patchTicketsFields.type,
                               value: TicketType.BUG_TICKET
                            }, ticketId)
                         }
                         setShowTypes(false)
                      }}>
                         {TicketType.BUG_TICKET}
                  </span>
                      <span className="label-options__option" onClick={async () => {
                         if (createMode) {
                            setType(TicketTypeStatuses[TicketType.FEATURE_REQUEST].value)
                            setTypeNumberValue(TicketTypeStatuses[TicketType.FEATURE_REQUEST].valueNumber)
                         } else {
                            await onStatusChanged({
                               path: patchTicketsFields.type,
                               value: TicketType.FEATURE_REQUEST
                            }, ticketId)
                         }
                         setShowTypes(false)
                      }}>
                         {TicketType.FEATURE_REQUEST}
                  </span>

                  </div>}

               </div>
            </div>
             <div className="ticket-form__edit-description">
                {editDescription && !createMode &&
                <button className="ticket-form__edit-description__save-button" onClick={async () => {
                   const {
                      error
                   } = await callAxios<ITicket>(`${API_BASE_URL}${UrlPaths.TICKETS}/${ticketId}`, {
                      method: HttpMethods.PATCH,
                      auth: true,
                      requestBody: [ {
                         path: '/description',
                         op: 'replace',
                         value: description
                      } ]
                   })
                   if (!error) {
                      setEditDescription(false)
                   }
                }}>Save</button>}
                {editDescription && !createMode && <button className="ticket-form__edit-description__cancel-button"
                                                           onClick={() => setEditDescription(false)}>Cancel</button>
                }
             </div>
         </div>
         {createMode && <button className="ticket-form__submit-button" onClick={async () => {
            await onSubmitHandler()
            handleClose()
         }}>Create
         </button>}
      </div>
   )
}

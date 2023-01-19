export const ticketType = (type: number | undefined) => {
   switch (type) {
      case 0:
         return <p>Bug Ticket</p>
      case 1:
         return <p>To Do</p>
      case 2:
         return <p>Feature Request</p>
   }
}

export const ticketLabel = (label: number | undefined) => {
   switch (label) {
      case 0:
         return <p>Front-end</p>
      case 1:
         return <p>Back-end</p>
   }
}

export const ticketStatus = (status: number | undefined) => {
   switch (status) {
      case 0:
         return <p>To do</p>
      case 1:
         return <p>In Progress</p>
      case 2:
         return <p>Done</p>
   }
}
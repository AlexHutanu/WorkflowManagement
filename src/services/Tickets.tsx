export const ticketType1 = (type: number | undefined) => {
   switch (type) {
      case 0:
         return "Bug Ticket"
      case 1:
         return "To Do"
      case 2:
         return "Feature Request"
   }
}

export const ticketType = {
   '0': 'Bug Ticket',
   '1': 'To do',
   '2': 'Feature Request'
}

export const ticketLabel = (label: number | undefined) => {
   switch (label) {
      case 0:
         return "Front-end"
      case 1:
         return "Back-end"
   }
}

export const ticketStatus = (status: number | undefined) => {
   switch (status) {
      case 0:
         return "To do"
      case 1:
         return "In Progress"
      case 2:
         return "Done"
   }
}
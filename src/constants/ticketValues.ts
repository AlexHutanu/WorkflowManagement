export enum TicketLabel {
   FRONT_END = 'Frontend',
   BACK_END = 'Backend'
}

export enum TicketType {
   BUG_TICKET = 'Bug Ticket',
   TO_DO = 'To Do',
   FEATURE_REQUEST = 'Feature Request'
}

export enum TicketStatus {
   TO_DO = 'To do',
   IN_PROGRESS = 'In Progress',
   DONE = 'Done'
}

export const TicketStatuses = {
   [TicketStatus.TO_DO]: {
      value: 'To Do',
      valueNumber: 0
   },
   [TicketStatus.IN_PROGRESS]: {
      value: 'In Progress',
      valueNumber: 1
   },
   [TicketStatus.DONE]: {
      value: 'Done',
      valueNumber: 2
   }
}

export const TicketLabelsStatuses = {
   [TicketLabel.FRONT_END]: {
      value: "Frontend",
      valueNumber: 0
   },
   [TicketLabel.BACK_END]: {
      value: "Backend",
      valueNumber: 1
   }
}

export const TicketStatusNumber = {
   0: TicketStatus.TO_DO,
   1: TicketStatus.IN_PROGRESS,
   2: TicketStatus.DONE
}

export const TicketLabels = {
   0: "Frontend",
   1: "Backend"
}
//TODO replace enum with objects
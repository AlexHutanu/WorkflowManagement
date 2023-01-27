export enum TicketLabel {
   FRONT_END = 'Frontend',
   BACK_END = 'Backend'
}

export enum TicketType {
   BUG_TICKET = 'Bug Ticket',
   TASK = 'Task',
   FEATURE_REQUEST = 'Feature Request'
}

export enum TicketStatus {
   TO_DO = 'To Do',
   IN_PROGRESS = 'In Progress',
   DONE = 'Done'
}

export const TicketStatuses = {
   [TicketStatus.TO_DO]: {
      value: TicketStatus.TO_DO,
      valueNumber: 0
   },
   [TicketStatus.IN_PROGRESS]: {
      value: TicketStatus.IN_PROGRESS,
      valueNumber: 1
   },
   [TicketStatus.DONE]: {
      value: TicketStatus.DONE,
      valueNumber: 2
   }
}

export const TicketLabelsStatuses = {
   [TicketLabel.FRONT_END]: {
      value: TicketLabel.FRONT_END,
      valueNumber: 0
   },
   [TicketLabel.BACK_END]: {
      value: TicketLabel.BACK_END,
      valueNumber: 1
   }
}

export const TicketTypeStatuses = {
   [TicketType.TASK]: {
      value: TicketType.TASK,
      valueNumber: 0
   },
   [TicketType.BUG_TICKET]: {
      value: TicketType.BUG_TICKET,
      valueNumber: 1
   },
   [TicketType.FEATURE_REQUEST]: {
      value: TicketType.FEATURE_REQUEST,
      valueNumber: 2
   }
}

export const TicketStatusNumber = {
   0: TicketStatus.TO_DO,
   1: TicketStatus.IN_PROGRESS,
   2: TicketStatus.DONE
}

export const TicketTypeNumber = {
   0: TicketType.TASK,
   1: TicketType.BUG_TICKET,
   2: TicketType.FEATURE_REQUEST
}

export const TicketLabels = {
   0: "Frontend",
   1: "Backend"
}
//TODO replace enum with objects
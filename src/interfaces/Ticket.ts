export interface ITicket {
   readonly id: string;
   readonly name: string;
   readonly assignee: string;
   readonly reporter: string;
   readonly description: string;
   readonly deadline: number;
   readonly status: string;
   readonly boardId: string;
}

export interface ICreateTicket {
   readonly name: string;
   readonly assignee: string;
   readonly reporter: string;
   readonly description: string;
   readonly status: string;
   readonly boardId: string;
}
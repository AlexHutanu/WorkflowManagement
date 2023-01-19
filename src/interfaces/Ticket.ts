export interface ITicket {
   readonly id: string;
   readonly name: string;
   readonly assignee: string;
   readonly reporter: string;
   readonly description: string;
   readonly deadline: number;
   readonly status: number;
   readonly boardId: string;
   readonly type: number;
   readonly label: number;
}

export interface ICreateTicket {
   readonly name: string;
   readonly assignee: string;
   readonly reporter: string;
   readonly description: string;
   readonly status: number;
   readonly boardId: string;
}
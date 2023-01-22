export interface ITicket {
   readonly id: string;
   readonly name: string;
   readonly assignee: string;
   readonly reporter: string;
   readonly description: string;
   readonly deadline: number;
   readonly status: 0 | 1 | 2;
   readonly boardId: string;
   readonly type: 0 | 1 | 2;
   readonly label: 0 | 1;
}

export interface ICreateTicket {
   readonly name: string;
   readonly assignee: string;
   readonly reporter: string;
   readonly description: string;
   readonly status: 0 | 1 | 2;
   readonly boardId: string;
   readonly userId: string
   readonly type: 0 | 1 | 2;
   readonly label: 0 | 1;
}
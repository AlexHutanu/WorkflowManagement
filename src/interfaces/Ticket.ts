export interface ITicket {
   readonly id: string;
   readonly name: string;
   readonly asignee: string;
   readonly reporter: string;
   readonly description: string;
   readonly deadline: number;
   readonly status: string;
   readonly boardId: string;
}
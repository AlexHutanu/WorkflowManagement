export interface IBoard {
   readonly id: string;
   readonly name: string;
   readonly description: string;
   readonly owner: string;
   readonly noOfTickets: number;
}

export interface ICreateBoard {
   readonly name: string;
   readonly description: string;
   readonly owner: string;
}
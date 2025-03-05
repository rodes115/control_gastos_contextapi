
export type Category = {
     id:string
     name:string
     icon:string
}

export type Expense = {
     id:string
     expenseName:string
     amount:number
     category:string
     date:value
}

export type DraftExpense = Omit<Expense, 'id'>;


type ValuePiece = Date | null;

export type value = ValuePiece | [ValuePiece,ValuePiece]
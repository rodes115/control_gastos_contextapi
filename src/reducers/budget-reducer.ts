import {v4 as uuidv4} from 'uuid'
import { DraftExpense, Expense } from "../types"

export type BudgetActions = 
     {type:'add-budget', payload: {budget:number}} |
     {type:'open-modal'} |
     {type:'close-modal'} |
     {type:'add-expense', payload: {expense:DraftExpense}}

export type BudgetState = {
     budget:number
     model:boolean
     expenses: Expense[]
}

export const initialState:BudgetState = {
     budget:0,
     model:false,
     expenses:[]
}

const createExpense = (draftexpense: DraftExpense) : Expense=> {

     return {
          ...draftexpense,
          id:uuidv4()
     }

}

export const budgetReducer = (
     state: BudgetState = initialState,
     action: BudgetActions
) => {

     if(action.type === 'add-budget'){
          return {
               ...state,
               budget: action.payload.budget
          }
     }

     if(action.type === 'open-modal'){    
          return{
               ...state,
               model: true
          }
     }

     if(action.type === 'close-modal'){
          return {
               ...state,
               model:false
          }
     }

     if(action.type === 'add-expense'){

          const expense = createExpense(action.payload.expense)

          return{
               ...state,
               expenses:[...state.expenses, expense],
               model:false
          }
     }


     return state
}

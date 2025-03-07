import { v4 as uuidv4 } from 'uuid'
import { DraftExpense, Expense } from "../types"

export type BudgetActions =
     { type: 'add-budget', payload: { budget: number } } |
     { type: 'open-modal' } |
     { type: 'close-modal' } |
     { type: 'add-expense', payload: { expense: DraftExpense } } |
     { type: 'delete-expense', payload: { id: Expense['id'] } } |
     { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
     { type: 'update-expense', payload: { expense: Expense } } |
     { type: 'reset-budget' } |
     { type: 'add-filter-category', payload: {id: Expense['id']}}


export type BudgetState = {
     budget: number
     model: boolean
     expenses: Expense[]
     editingId: Expense['id']
     currentCategory: Expense['id']
}

const initialBudget = (): number => {
     const localStorageBudget = localStorage.getItem('budget')
     return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = (): Expense[] => {
     const localStorageExpenses = localStorage.getItem('expenses')
     return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState: BudgetState = {
     budget: initialBudget(),
     model: false,
     expenses: localStorageExpenses(),
     editingId: '',
     currentCategory: ''
}

const createExpense = (draftexpense: DraftExpense): Expense => {

     return {
          ...draftexpense,
          id: uuidv4()
     }

}

export const budgetReducer = (
     state: BudgetState = initialState,
     action: BudgetActions
) => {

     if (action.type === 'add-budget') {
          return {
               ...state,
               budget: action.payload.budget
          }
     }

     if (action.type === 'open-modal') {
          return {
               ...state,
               model: true
          }
     }

     if (action.type === 'close-modal') {
          return {
               ...state,
               model: false,
               editingId: ''
          }
     }

     if (action.type === 'add-expense') {

          const expense = createExpense(action.payload.expense)

          return {
               ...state,
               expenses: [...state.expenses, expense],
               model: false
          }
     }

     if (action.type === 'delete-expense') {
          return {
               ...state,
               expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
          }
     }

     if (action.type === 'get-expense-by-id') {


          return {
               ...state,
               editingId: action.payload.id,
               model: true
          }
     }

     if (action.type === 'update-expense') {
          return {
               ...state,
               expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
               model: false,
               editingId: ''
          }
     }

     if (action.type === 'reset-budget') {
          return {
               ...state,
               budget: 0,
               expenses:[]
          }
     }

     if (action.type === 'add-filter-category') {
          return {
               ...state,
               currentCategory: action.payload.id
          }
     }


     return state
}

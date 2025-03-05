export type BudgetActions = 
     {type:'add-budget', payload: {budget:number}} |
     {type:'open-modal'} |
     {type:'close-modal'}

export type BudgetState = {
     budget:number
     model:boolean
}

export const initialState:BudgetState = {
     budget:0,
     model:false
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


     return state
}

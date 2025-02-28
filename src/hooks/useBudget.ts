import { useContext } from "react"
import { BudgetContext } from "../context/BudgedContext"

export const useBudget = () => {
     const context = useContext (BudgetContext)

     if(!context){
          throw new Error('useBudget must he used within a BudgetProvider')
     }


     return context 
}
import { useMemo } from "react"
import BudgedForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"


function App() {

  const {state} = useBudget()
  
  const isValidBudget = useMemo (() => state.budget > 0, [state.budget])

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <div className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </div>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker/> : <BudgedForm/>}
      </div>
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <ExpenseList/>
          <ExpenseModal/>
        </main>
      )}
      

    </>
  )
}

export default App

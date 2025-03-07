import { useState, useEffect } from "react";
import { useBudget } from "../hooks/useBudget";
import type { DraftExpense } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker'
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { Value } from "react-calendar/src/shared/types.js";
import ErrorMessage from "./ErrorMessage";


export default function ExpenseForm() {
     

     const [expense, setExpense] = useState<DraftExpense>({
          amount: 0,
          expenseName: '',
          category: '',
          date: new Date()
     })

     const [error, setError] = useState('')
     const [previousAmount, setPreviousAmount] = useState(0)

     const { dispatch, state, remainingBudget } = useBudget()

     useEffect(() => {
          if (state.editingId) {
               const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
               setExpense(editingExpense)
               setPreviousAmount(editingExpense.amount)
          }

     }, [state.editingId])


     const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
          const { name, value } = e.target
          const isAmountField = ['amount'].includes(name)

          setExpense({
               ...expense,
               [name]: isAmountField ? +value : value
          })
     }

     const handleChangeDate = (value: Value) => {
          setExpense({
               ...expense,
               date: value
          })
     }

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()


          //validar
          if (Object.values(expense).includes('')) {
               setError('Todos los campos son obligatorios')
               return
          }

          //Validar que no me pase del presupuesto

          if ((expense.amount - previousAmount)> remainingBudget) {
               setError('El gasto se sale del presupuesto')
               return
          }

          //Agregar o Actualizar el gasto
          if (state.editingId) {
               dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
          } else {
               dispatch({ type: 'add-expense', payload: { expense } })
          }
          //Reiniciar el state
          setExpense({
               amount: 0,
               expenseName: '',
               category: '',
               date: new Date()
          })

     }


     return (
          <form className="space-y-5" onSubmit={handleSubmit}>
               <legend
                    className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"

               >{state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}</legend>

               {error && <ErrorMessage>{error}</ErrorMessage>}

               <div className="flex flex-col gab-2">
                    <label
                         className="text-xl"
                         htmlFor="expenseName"
                    >Nombre Gasto:</label>
                    <input
                         type="text"
                         id="expenseName"
                         placeholder="Añade el nombre del gasto"
                         className="bg-slate-100 p-2"
                         name="expenseName"
                         value={expense.expenseName}
                         onChange={handleChange}
                    />
               </div>

               <div className="flex flex-col gab-2">
                    <label
                         className="text-xl"
                         htmlFor="amount"
                    >Cantidad:</label>
                    <input
                         type="number"
                         id="amount"
                         placeholder="Añade la cantidad del gasto: ej. 300"
                         className="bg-slate-100 p-2"
                         name="amount"
                         value={expense.amount}
                         onChange={handleChange}
                    />
               </div>

               <div className="flex flex-col gab-2">
                    <label
                         className="text-xl"
                         htmlFor="category"
                    >Categoria:</label>
                    <select
                         id="category"
                         className="bg-slate-100 p-2"
                         name="category"
                         value={expense.category}
                         onChange={handleChange}
                    >
                         <option value="">-- Seleccione --</option>
                         {categories.map(category => (
                              <option
                                   key={category.id}
                                   value={category.id}
                              > {category.name} </option>
                         ))}
                    </select>
               </div>

               <div className="flex flex-col gab-2">
                    <label
                         className="text-xl"
                         htmlFor="amount"
                    >Fecha Gasto:</label>
                    <DatePicker
                         className="bg-slate-100 p-2 border-0"
                         value={expense.date}
                         onChange={handleChangeDate}
                    />
               </div>

               <input
                    type="submit"
                    value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
                    className="bg-blue-600 cursosr-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
               />
          </form>
     )
}

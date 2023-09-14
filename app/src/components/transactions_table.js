import { useEffect } from "react"
import usePagination from "../hooks/usePagination"
import Pagination from "./pagination_mod"

const TransactionsTable = ({transactions,openTransactionForm}) =>{
    const [
        total,
        paginas,
        pag,
        desde_reg,
        hasta_reg,
        setDatos,
        setCantXPag,
        setPag,
        mueve
    ] = usePagination(5)

    useEffect(() => {
        if(transactions) setDatos(transactions.length)
     }, [transactions]);

    return  <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Operation
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-end">
                        Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {transactions && transactions.slice(desde_reg, hasta_reg).map(transaction => {
                return <tr key={transaction.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {transaction.date_label}
                    </td>
                    <td className="px-6 py-4">
                        {transaction.operation>0 ?
                         <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                            Income
                         </span>
                        :
                        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            Expense
                        </span>
                        }
                    </td>
                    <td className="px-6 py-4">
                    {transaction.category_name}
                    </td>
                    <td className="px-6 py-4">
                    {transaction.description}
                    </td>
                    <td className="px-6 py-4 text-end">
                        <span className={transaction.operation>0?" text-white":"text-red-300"}>$ {transaction.amount}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button onClick={()=>openTransactionForm(transaction)} name={"edit_"+transaction.id} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                    </td>
                </tr>
                })}
            </tbody>
        </table>
        <Pagination paginas={paginas} pag={pag} mueve={mueve} setPag={setPag} />
    </div>
}

export default TransactionsTable
import { useState, useEffect } from "react";
import useTotalize from "../hooks/useTotalize";
import TransactionForm from "../components/transaction_form";
import TransactionsTable from "../components/transactions_table";
import ResumeMod from "../components/resume_mod";
import useTransactions from "../hooks/useTransactions";

const Dashboard = (props) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [total, setData] = useTotalize();
    
    const [
        transactions,
        transaction,
        from,
        to,
        id_category,
        operation,
        refresh,
        setTransaction,
        setFrom,
        setTo,
        setIdCategory,
        setOperation
    ] = useTransactions('dashboard')

    useEffect(() => {
        //getActualTransactions()
    }, [])

    useEffect(() => {
        setData(transactions)
    }, [transactions])

    const openTransactionForm = (transaction) => {
        setTransaction(transaction)
        setModalVisible(true)
    }

    const closeTransactionForm = () => {
        setTransaction(null)
        setModalVisible(false)
    }

    return <>
        <section className="flex items-center  bg-gray-50 dark:bg-gray-900">
            <div className="w-full px-4 mx-auto lg:px-4">
                <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                    <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
                        <div>
                            <h5 className="mr-3 font-semibold dark:text-white">Dashboard</h5>
                            <p className="text-gray-500 dark:text-gray-400">Your current month resume is here</p>
                        </div>
                        <button type="button"
                            onClick={() => openTransactionForm(null)}
                            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-primary-300 dark:bg-lime-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-primary-800">
                            <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                            </svg>
                            Add Transaction
                        </button>
                    </div>
                </div>
            </div>
        </section>


        <ResumeMod total={total}  location="dashboard" />

        {modalVisible &&
            <TransactionForm refresh={refresh} transaction={transaction} closeTransactionForm={closeTransactionForm} />
        }

        {transactions.length > 0 &&
            <TransactionsTable transactions={transactions} openTransactionForm={openTransactionForm} />
        }
    </>
}

export default Dashboard;

import { useState,useEffect } from 'react';
import moment from "moment";
import { useSelector } from 'react-redux';
import useTotalize from "../hooks/useTotalize";
import useTransactions from "../hooks/useTransactions";
import TransactionsTable from "../components/transactions_table";
import TransactionForm from "../components/transaction_form";
import ResumeMod from "../components/resume_mod";
import DatePickerButton from "../components/datepicker_custom";
import MonthResumeMod from '../components/month_resume_mod';

const History = (props) => {
    const data = useSelector((state) => state.data)
    const [total, setData] = useTotalize();
    const [modalVisible, setModalVisible] = useState(false)
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
        setData(transactions)
    }, [transactions])

    const handleChangeDate = (field, value) => {
        console.log(value)
        if (field === 'from') {
            setFrom(moment(value).format("YYYY-MM-DD HH:mm:ss"))
        } else if (field === 'to') {
            setTo(moment(value).format("YYYY-MM-DD"))
        }
    }

    const openTransactionForm = (transaction) => {
        setTransaction(transaction)
        setModalVisible(true)
    }

    const closeTransactionForm = () => {
        setTransaction(null)
        setModalVisible(false)
    }

    return <>
        <ResumeMod total={total}  location="history"/>

        <section className="flex items-center  bg-gray-50 dark:bg-gray-900">
            <div className="w-full px-4 mx-auto lg:px-4">
                <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                    <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
                        <DatePickerButton onChangeAct={handleChangeDate} title=" " value={from} campo="from" conFecha={true} />
                        <label className='text-white'>To</label>
                        <DatePickerButton onChangeAct={handleChangeDate} title=" " value={to} campo="to" conFecha={true} />

                        <div className="flex">
                            <div className="inline-flex rounded-md shadow-sm w-100 flex-grow" role="group">
                                <button type="button" onClick={() => setOperation(0)} className={`flex-grow px-4 py-2 text-sm font-medium text-gray-900  border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-lime-800 dark:focus:bg-lime-800 ${operation == 0 ? " bg-lime-600" : "bg-transparent"} `}>
                                    All
                                </button>
                                <button type="button" onClick={() => setOperation(1)} className={`flex-grow px-4 py-2 text-sm font-medium text-gray-900 border border-gray-900  hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-lime-800 dark:focus:bg-lime-800 ${operation > 0 ? " bg-lime-600" : "bg-transparent"} `}>
                                    Income
                                </button>
                                <button type="button" onClick={() => setOperation(-1)} className={`flex-grow px-4 py-2 text-sm font-medium text-gray-900 border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-red-900 dark:focus:bg-red-900  ${operation < 0 ? " bg-red-600" : "bg-transparent"} `}>
                                    Expense
                                </button>
                            </div>
                        </div>

                        <select id="id_category" name="id_category" onChange={(e) => setIdCategory(e.target.value)} value={id_category} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option value="">Select Category</option>
                            {data.categories.map(c =><option value={c.id} key={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </section>


        {modalVisible &&
            <TransactionForm refresh={refresh} transaction={transaction} closeTransactionForm={closeTransactionForm} />
        }

        {transactions.length > 0 &&
            <TransactionsTable transactions={transactions} openTransactionForm={openTransactionForm} />
        }
        
        <MonthResumeMod/>
    </>
}

export default History
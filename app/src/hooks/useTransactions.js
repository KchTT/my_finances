import { useEffect, useState } from 'react';
import moment from 'moment';
import { getTransactions } from "../services";

const useTransactions = (location) => {
   
	const [from,setFrom] = useState(moment().format('YYYY-MM-01 00:00:00'))
    const [to,setTo] = useState(moment().format(`YYYY-MM-${moment().daysInMonth()} 23:59:59`))
    const [id_category,setIdCategory] = useState(0)
    const [operation,setOperation] = useState(0)
    const [transactions, setTransactions] = useState([]);
    const [transaction, setTransaction] = useState(null)

   
    useEffect(() => {
        refresh()
    },[]);
    
    useEffect(() => {
        refresh()
    },[from,to, id_category,operation]);

    const getActualTransactions = async () => {
        try {
            const actual_transactions = await getTransactions(from, to, operation, id_category, 0)
            setTransactions(actual_transactions.data.transactions)
        } catch (error) {
            console.log(error)
        }
    }

    const refresh = async () => {
        await getActualTransactions()
    }

    return [
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
    ]
  };
  
  export default useTransactions;
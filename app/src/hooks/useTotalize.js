import { useEffect, useState } from 'react';

const useTotalize = (_cantxpag) => {
   
	const [total, setTotal] = useState({
        incomes:{amount:0,q:0},
        expenses:{amount:0,q:0},
        categories:[]
    });
    const [data, setData] = useState([]);
   
    useEffect(() => {
       totalize()
    },[data]);

    const totalize = () =>{
        setTotal(data.reduce((acc, item) => {
           
            if(item.operation===1){
                acc.incomes.amount += parseFloat(item.amount)
                acc.incomes.q += 1
            }else{
                acc.expenses.amount += parseFloat(item.amount)
                acc.expenses.q += 1
            }

            if(acc.categories.length===0){
                acc.categories.push({id:item.id_category,amount:parseFloat(item.amount),q:1})
            }else{
                let index = acc.categories.findIndex((obj => obj.id === item.id_category));
                if(index>=0){
                    acc.categories[index].amount += parseFloat(item.amount)
                    acc.categories[index].q += 1
                }else{
                    acc.categories.push({id:item.id_category,amount:parseFloat(item.amount),q:1})
                }
            }
            
            return acc
        }, {incomes:{amount:0,q:0},expenses:{amount:0,q:0},categories:[]}))
    }

    return [
        total,
        setData
    ]
  };
  
  export default useTotalize;
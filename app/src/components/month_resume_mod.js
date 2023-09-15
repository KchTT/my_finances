import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getMonthResume } from "../services";

const MonthResumeMod = ()=>{
    const [loading,setLoading] = useState(true)
    const [chart_data, setChartData] = useState({
        options: {
            colors : ['#059142', '#C41010'],
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
                labels: {
                    style: {
                        colors: ['#FFFFFF','#FFFFFF']
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: ['#FFFFFF','#FFFFFF']
                    }
                }
            },
            legend:{ 
                labels: {
                    colors: ['#FFFFFF','#FFFFFF']
            }},
            dataLabels: {
                style: {
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 'bold',
                colors: ['#FFFFFF','#FFFFFF']
                }
            }
        },
        series: [
          {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          }
        ]
      }
    )

    useEffect(() => {
        refresh()
    },[]);

    const refresh = async () => {
        try {
            const req_resume = await getMonthResume()
            console.log(req_resume)
            parseaData(req_resume.data.resume)
        } catch (err) {
            console.log(err)
        } finally {
        }
    }

    const parseaData = (_data)=>{
        let data_temp = {...chart_data}
        let xaxis_temp = []
        let series_temp = [
            {
                name: "Incomes",
                data: []
            },
            {
                name: "Expenses",
                data: []
            }
        ]
        _data.forEach((item)=>{
            xaxis_temp.push(item.code)
            series_temp[0].data.push(item.income)
            series_temp[1].data.push(item.expenses)
        })

        data_temp.options.xaxis.categories = xaxis_temp
        data_temp.series = series_temp
        console.log(data_temp)
        setChartData(data_temp)
        setLoading(false)
        
/*
{
    "month": 9,
    "year": 2023,
    "income_q": "1",
    "expense_q": "0",
    "income": "150.00",
    "expenses": "0.00",
    "code": "202309"
}
*/
    }

    return(
        <div className="relative px-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 m-4">
            <h1 className="text-white">Month Resume Mod</h1>
           {!loading &&
            <Chart
            options={chart_data.options}
            series={chart_data.series}
            type="bar"
            width="500"
            />
        }
        </div>
    )
}

export default MonthResumeMod
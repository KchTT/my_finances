const LimitBar = ({ amount, limit }) => {
    const ok_style = "bg-green-600 h-2.5 rounded-full dark:bg-green-500"
    const warning_style = "bg-yellow-400 h-2.5 rounded-full"
    const danger_style = "bg-red-600 h-2.5 rounded-full dark:bg-red-500"
    
    return <>
        <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500 mt-2">Month Limit - {amount} of {limit}</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
            <div className={Math.ceil((amount*100)/limit) < 50 ? ok_style : Math.ceil((amount*100)/limit) < 75 ? warning_style : danger_style} style={{width: `${Math.ceil((amount*100)/limit)}%`}}></div>
        </div>
    </>
}

export default LimitBar
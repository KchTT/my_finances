const LimitBar = ({ amount, limit }) => {
    const ok_style = "bg-green-600 h-2.5 rounded-full dark:bg-green-500"
    const warning_style = "bg-yellow-400 h-2.5 rounded-full"
    const danger_style = "bg-red-600 h-2.5 rounded-full dark:bg-red-500"

    return <>
        {parseFloat(limit) > 0 &&
            <>
            { Math.ceil((amount * 100) / limit)<100 ?
                <>
                <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500 mt-2">Month Limit - {amount} of {limit}</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    <div className={Math.ceil((amount * 100) / limit) < 50 ? ok_style : Math.ceil((amount * 100) / limit) < 75 ? warning_style : danger_style} style={{ width: `${Math.ceil((amount * 100) / limit)}%` }}></div>
                </div>
                </>
                :
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Alert!</span> The expenses month limit is exceded.
                    </div>
                </div> 
                }
            </>
        }
    </>
}

export default LimitBar
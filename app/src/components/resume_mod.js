import moment from "moment";
import LimitBar from "./limit_bar"

const ResumeMod = ({ total, location }) => {
    return <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6 m-4">
        <div id="Month">
            <h1 className="font-bold py-4 uppercase text-white">{location != "history" ? `Current Month - ${moment().format("MMMM")}` : `History`}</h1>
            <div id="stats" className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-black/60 to-white/5 p-6 rounded-lg">
                    <div className="flex flex-row space-x-4 items-center">
                        <div id="stats-1">
                            <svg className="w-[38px] h-[38px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-lime-600 text-sm font-medium uppercase leading-4">Incomes</p>
                            <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                <span>${total.incomes.amount}.-</span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                    </svg>

                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-black/60 p-6 rounded-lg">
                    <div className="flex flex-row space-x-4 items-center">
                        <div id="stats-1">
                            <svg className="w-[38px] h-[38px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" />
                            </svg>

                        </div>
                        <div>
                            <p className="text-red-500 text-sm font-medium uppercase leading-4">Expenses</p>
                            <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                <span>${total.expenses.amount}.-</span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                    </svg>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-black/60 p-6 rounded-lg">
                    <div className="flex flex-row space-x-4 items-center">
                        <div id="stats-1">

                            <svg className="w-[38px] h-[38px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 19h16m-8 0V5m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 8l-2.493 5.649A1 1 0 0 0 2.443 15h3.114a1.001 1.001 0 0 0 .936-1.351L4 8Zm0 0V6m12 2-2.493 5.649A1 1 0 0 0 14.443 15h3.114a1.001 1.001 0 0 0 .936-1.351L16 8Zm0 0V6m-4-2.8c3.073.661 3.467 2.8 6 2.8M2 6c3.359 0 3.192-2.115 6.012-2.793" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-blue-300 text-sm font-medium uppercase leading-4">Balance</p>
                            <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                <span>${total.incomes.amount - total.expenses.amount}.-</span>
                                <span>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                    </svg>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {location != "history" &&
            <LimitBar limit={250} amount={total.incomes.amount - total.expenses.amount} />
        }
    </div>
}

export default ResumeMod
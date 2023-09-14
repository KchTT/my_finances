
import { useState, useEffect } from "react";
import moment from "moment";
import { sendCategory, deleteCategory } from "../services";

const CategoryForm = (props) => {
    const [sending, setSending] = useState(false)
    const [category, setCategory] = useState({
        operation: 0,
        name: "",
        status: 1
    })

    useEffect(() => {
        if (props.category) {
            setCategory(props.category)
        }
    }, [props.category])

    const handleChange = (e) => {
        console.log(e.target.value)
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        })
    }

    const sendCategoryAct = async (e) => {
        e.preventDefault();
        try {
            if (category.name == "") {
                alert("Write a name")
            } else {
                console.log(category)
                setSending(true)
                const s_category = await sendCategory(category)
                console.log(s_category)
                props.closeCategoryForm()
                props.refresh()
                setCategory({
                    operation: 0,
                    name: "",
                    status: 1
                })
            }
        } catch (err) {
            console.log(err)
        } finally {
            setSending(false)
        }
    }

    const deleteCategoryAct = async (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure to delete this category?")) {
            try {
                setSending(true)
                const s_category = await deleteCategory(category.id)
                props.closeCategoryForm()
                props.refresh()
                setCategory({
                    operation: 0,
                    name: "",
                    status: 0
                })
            } catch (err) {
                console.log(err)
            } finally {
                setSending(false)
            }
        }
    }


    return <>
        <div id="updateProductModal" tabIndex="-1" className="flex bg-opacity-50 bg-gray-500 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Category
                        </h3>
                        <button type="button" onClick={() => props.closeCategoryForm()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    {!sending ?
                        <form action="#">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">For Operations</label>
                            <div className="flex mt-2">

                                <div className="inline-flex rounded-md shadow-sm w-100 flex-grow" role="group">
                                    <button type="button" onClick={() => setCategory({ ...category, operation: 1 })} className={`flex-grow px-4 py-2 text-sm font-medium text-gray-900  border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-lime-800 dark:focus:bg-lime-800 ${category.operation > 0 ? " bg-lime-600" : "bg-transparent"} `}>
                                        Income
                                    </button>
                                    <button type="button" onClick={() => setCategory({ ...category, operation: 0 })} className={`flex-grow px-4 py-2 text-sm font-medium text-gray-900 border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-red-900 dark:focus:bg-red-900  ${category.operation == 0 ? " bg-lime-600" : "bg-transparent"} `}>
                                        Both
                                    </button>
                                    <button type="button" onClick={() => setCategory({ ...category, operation: -1 })} className={`flex-grow px-4 py-2 text-sm font-medium text-gray-900 border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-red-900 dark:focus:bg-red-900  ${category.operation < 0 ? " bg-red-600" : "bg-transparent"} `}>
                                        Expense
                                    </button>
                                </div>
                            </div>

                            <div className=" mt-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" value={category.amount} onChange={handleChange} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Name" />
                            </div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                            <div className="flex mt-2">
                                <div className="inline-flex rounded-md shadow-sm w-100 flex-grow" role="group">
                                    <button type="button" onClick={() => setCategory({ ...category, status: 1 })} className={`flex-grow px-4 py-2 text-sm font-medium text-gray-900  border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-lime-800 dark:focus:bg-lime-800 ${category.status > 0 ? " bg-lime-600" : "bg-transparent"} `}>
                                        Active
                                    </button>
                                    <button type="button" onClick={() => setCategory({ ...category, status: 0 })} className={`flex-grow px-4 py-2 text-sm font-medium text-gray-900 border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-red-900 dark:focus:bg-red-900  ${category.status == 0 ? " bg-red-600" : "bg-transparent"} `}>
                                        Null
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 mt-2">
                                <button type="button" onClick={sendCategoryAct} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    {category.hasOwnProperty("id") ? "Update category" : "Add category"}
                                </button>
                                {category.hasOwnProperty("id") &&
                                    <button type="button" onClick={deleteCategoryAct} className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                        <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" ></path></svg>
                                        Delete
                                    </button>
                                }
                            </div>

                        </form>
                        :
                        <div className="text-center">
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </>
}
export default CategoryForm;
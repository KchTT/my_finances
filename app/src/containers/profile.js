import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import CategoryForm from "../components/category_form"
import { getProfile, updateProfile } from "../services"
import { setCategories } from "../state/reducers/data"
import { setProfile } from "../state/reducers/user"

const Profile = (props) => {
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const [sending_profile, setSendingProfile] = useState(false)
    const [sending, setSending] = useState(false)
    const [category, setCategory] = useState(null)

    const [profile, setProfilLocal] = useState({
        name: "",
        lastname: "",
        month_limit: 0
    })

    const user = useSelector((state) => state.user)
    const data = useSelector((state) => state.data)

    useEffect(() => {
        console.log(data)
        console.log(user)
        if (user.profile) setProfilLocal(user.profile)
    }, [])

    useEffect(() => {
        if (user.profile) setProfilLocal(user.profile)
    }, [user.profile])

    const openCategoryForm = (category) => {
        setCategory(category)
        setModalVisible(true)
    }

    const closeCategoryForm = () => {
        setCategory(null)
        setModalVisible(false)
    }

    const refresh = async () => {
        setSending(true)
        try {
            const req_profile = await getProfile()
            dispatch(setCategories(req_profile.data.categories))
        } catch (err) {
            console.log(err)
        } finally {
            setSending(false)
        }
    }

    const handleFocus = (event) => event.target.select();

    const handleChangeProfile = (e) => {
        console.log(e.target.value)
        setProfilLocal({
            ...profile,
            [e.target.name]: e.target.value
        })
    }

    const sendProfileAct = async (e) => {
        e.preventDefault();
        try {
            if (profile.lastname == "") {
                alert("Complete your last name")
            } else if (profile.name == "") {
                alert("Complete your name")
            } else {
                setSending(true)
                const s_profile = await updateProfile(profile)
                console.log(s_profile)
                console.log(profile)
                dispatch(setProfile(profile))
            }
        } catch (err) {
            console.log(err)
        } finally {
            setSending(false)
        }
    }

    return <>
        <div className="flex px-4">
            <div className="flex-grow p-4">
                <div className="relative px-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Profile
                        </h3>
                    </div>

                    {!sending_profile ?
                        <form action="#">
                            <div className=" mt-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lastname</label>
                                <input type="text" value={profile.lastname} onChange={handleChangeProfile} name="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Lastname" />
                            </div>

                            <div className=" mt-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" value={profile.name} onChange={handleChangeProfile} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Name" />
                            </div>

                            <div className="">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Month Limit</label>
                                <input type="number" value={profile.month_limit} onChange={handleChangeProfile} onFocus={handleFocus} name="month_limit" id="month_limit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$299" />
                            </div>

                            <div className="flex items-center space-x-4 mt-2">
                                <button type="button" onClick={sendProfileAct} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Update category
                                </button>

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


            <div className="flex-grow p-4">
                <section className="flex items-center  bg-gray-50 dark:bg-gray-900 mb-2">
                    <div className="w-full mx-auto ">
                        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                            <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
                                <div>
                                    <h5 className="mr-3 font-semibold dark:text-white">Categories</h5>
                                </div>
                                <button type="button"
                                    onClick={() => openCategoryForm(null)}
                                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-primary-300 dark:bg-lime-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-primary-800">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Add Category
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {modalVisible &&
                    <CategoryForm refresh={refresh} category={category} closeCategoryForm={closeCategoryForm} />
                }

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Operation
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.categories.map(category => {
                                return <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {category.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {category.operation > 0 ? "Income" : category.operation < 0 ? "Expense" : "Both"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {category.status == 1 ? "Active" : "Inactive"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" onClick={() => openCategoryForm(category)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}

export default Profile

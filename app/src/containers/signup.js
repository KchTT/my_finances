import React,{ useState } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { setMsj } from "../state/reducers/data"
import { validateEmail,validatePassword,hashPass } from '../utils';
import { sendSignUp } from '../services';

const SignUp = (props) =>{
    const dispatch = useDispatch()
    const [data, setData] = useState({
        email:"",
        pass:"",
        name:"",
        lastname:"",
    })
    const [sending, setSending] = useState(false)

    const handleChange = (e) =>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    const sendSignUpAct = async (e) => {
        e.preventDefault();
       try{
            if (data.lastname=="") {
                alert("Complete your lastname please")
            } else if (data.name=="") {
                alert("Complete your name please")
            } else if (!validateEmail(data.email)) {
                alert("The email is invalid")
            } else if (validatePassword(data.pass)) {
                alert("The password is unsecure")
            } else {
                setSending(true)
                const hasspass = await hashPass(data.pass)
                console.log(hasspass)
                const d_send = {...data,pass:hasspass}
                const s_up = await sendSignUp(d_send)
                console.log(s_up)
                dispatch(setMsj({
                        cont: "You Sign Up Ok!",
                        tipo: "success",
                        time: moment().unix()
                }))
                setData({
                    email:"",
                    pass:"",
                    name:"",
                    lastname:"",
                })
            }    
        }catch(err){
            console.log(err)
        } finally {
            setSending(false)
        }
    }

    return <>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    My Finances
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign Up
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lastname</label>
                                <input onChange={handleChange} value={data.lastname} type="text" name="lastname" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lastname" required="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input onChange={handleChange} value={data.name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={handleChange} value={data.email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={handleChange} value={data.pass} type="password" name="pass" id="pass" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                           
                            <button onClick={sendSignUpAct} type="button" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Do you already have an account? <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default SignUp;
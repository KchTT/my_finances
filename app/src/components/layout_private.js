import React, { useState, useEffect,useRef } from 'react';
import {  useNavigate, Outlet} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getProfile } from '../services';
import Header from "../components/header";
import Footer from "../components/footer";
import Toast from "../components/toast_mod"
import { setProfile } from "../state/reducers/user"
import { setCategories } from "../state/reducers/data"

const LayoutPrivate = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user)
    const data = useSelector((state) => state.data)

    const isMounted = useRef(false);

    useEffect(() => {
       console.log(user)
    }, [])

    useEffect(() => {
        console.log("aut  layout private")
        if (isMounted.current) {
            if(!localStorage.getItem("isAuthenticate") || localStorage.getItem("isAuthenticate")==="false"){
                if(localStorage.getItem("MFT") !== null) localStorage.removeItem("MFT");
                if(localStorage.getItem("isAuthenticate") !== null) localStorage.removeItem("isAuthenticate")
                navigate('/', { replace: true })
            }
		} else {
			isMounted.current = true;
		} 
        if(!user.profile) getProfileAct()
    }, [user.autenticate])

    useEffect(() => {
        console.log("refresca layout private")
        if(!localStorage.getItem("isAuthenticate"))  navigate("/", { replace: true });
       //
    })

    const getProfileAct = async () => {
        try{
            const profile = await getProfile()
            console.log(profile.data.profile)
            console.log(profile.data.categories)
            dispatch(setProfile(profile.data.profile))
            dispatch(setCategories(profile.data.categories))
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Toast/>
            <Header />
            <div className="flex-grow">
                <Outlet/>
            </div>
            <Footer />
        </div>
    )
}

export default LayoutPrivate;

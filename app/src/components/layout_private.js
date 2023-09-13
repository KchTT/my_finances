import React, { useState, useEffect,useRef } from 'react';
import {  useNavigate, Outlet} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import Header from "../components/header";
import Footer from "../components/footer";

const LayoutPrivate = (props) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)

    const isMounted = useRef(false);

    useEffect(() => {
       //console.log(usuario)
    }, [])

    useEffect(() => {
    
        if (isMounted.current) {
            if(!localStorage.getItem("isAuthenticate") || localStorage.getItem("isAuthenticate")==="false"){
                if(localStorage.getItem("MFT") !== null) localStorage.removeItem("MFT");
                if(localStorage.getItem("isAuthenticate") !== null) localStorage.removeItem("isAuthenticate")
                navigate('/login', { replace: true })
            }
		} else {
			isMounted.current = true;
		}
    }, [user.autenticate])

    useEffect(() => {
        if(!localStorage.getItem("isAuthenticate"))  navigate("/", { replace: true });
    })
    
    return (
        <>
            <Header />
            <div>
                <Outlet/>
            </div>
            <Footer />
        </>
    )
}

export default LayoutPrivate;

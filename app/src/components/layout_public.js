import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Outlet,useNavigate } from "react-router-dom";
import Toast from "../components/toast_mod"

const LayoutPublic = (props) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)

    useEffect(() => {
        if (localStorage.getItem("isAuthenticate") && localStorage.getItem("isAuthenticate") == "true"){
            navigate('/my_finances', { replace: true })
        } 
    },[user.user])

    return <>
    <Outlet />
    <Toast/>
    </>
}

export default LayoutPublic
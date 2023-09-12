import React, { useEffect } from 'react';
import { Outlet,useNavigate } from "react-router-dom";

const LayoutPublic = (props) => {
    const navigate = useNavigate()
    useEffect(() => {
    }, [])

    useEffect(() => {
        if (localStorage.getItem("isAuthenticate") && localStorage.getItem("isAuthenticate") == "true"){
            navigate('/my_finance', { replace: true })
        } 
    })

    return <Outlet />
}

export default LayoutPublic
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'


const Toast = () => {
    const data = useSelector((state) => state.data)
	useEffect(() => {
        if(data.msj.cont!="" && data.msj.tipo==="success"){
            toast.success(data.msj.cont, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }else if(data.msj.cont!="" && data.msj.tipo=="warning"){
            toast.warning(data.msj.cont, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
	}, [data.msj.time]);
    
    return <ToastContainer />
}

export default Toast
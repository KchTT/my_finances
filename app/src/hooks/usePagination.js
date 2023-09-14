import { useEffect, useState } from 'react';

const usePagination = (props) => {
   
    const [data,setData] = useState([])
	const [total, setTotal] = useState(0);
    const [filtrado,setFiltrado] = useState([])
    const [loading, setLoading] = useState(false)
	const [cantxpag, setCantXPag] = useState(5);
    const [pag, setPag] = useState(0);
    const [paginas, setPaginas] = useState(0);
    
    useEffect(() => {
        reset()
    },[cantxpag]);

    useEffect(() => {
        filtra(data)
    },[pag,data]);

    const setDatos = (_data) =>{
        setPag(0)
        setPaginas([...Array(Math.ceil(_data.length / cantxpag)).keys()])
        setTotal(_data.length)
        setData(_data)
    }

    const reset = () =>{
        setPag(0)
        setPaginas([...Array(Math.ceil(data.length / cantxpag)).keys()])
    }

    const filtra = (_data)=>{
        setFiltrado((_data && data.length > 0)? _data.slice((pag * cantxpag), (pag + 1) * cantxpag) : [])
    }

    const mueve = (e)=>{
        e.preventDefault()
        let direccion = parseInt(e.currentTarget.name)
        let newpag = pag + direccion
        if((newpag>=0 && newpag<=(paginas.length-1))) setPag(newpag)
    }
  
    return [
        data,
        total,
        filtrado,
        paginas,
        pag,
        setDatos,
        setCantXPag,
        setPag,
        mueve
    ]
  };
  
  export default usePagination;
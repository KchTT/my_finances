import { useEffect, useState } from 'react';

const usePagination = (_cantxpag) => {
   
	const [total, setTotal] = useState(0);
	const [cantxpag, setCantXPag] = useState(_cantxpag?_cantxpag:20);
    const [pag, setPag] = useState(0);
    const [paginas, setPaginas] = useState(0);
    const [desde_reg, setDesde] = useState(0);
    const [hasta_reg, setHasta] = useState(cantxpag);

    useEffect(() => {
        //reset()
    },[cantxpag]);

    useEffect(() => {
        //reset()
    },[cantxpag]);

    useEffect(() => {
       const ini = pag*cantxpag 
       setDesde(ini)
       setHasta(ini+cantxpag)
    },[pag]);

    const setDatos = (_total) =>{
        setPag(0)
        setPaginas([...Array(Math.ceil(_total / cantxpag)).keys()])
        setTotal(_total)
    }

    const reset = () =>{
        setPag(0)
    }

    const mueve = (e)=>{
        e.preventDefault()
        let direccion = parseInt(e.currentTarget.name)
        let newpag = pag + direccion
        if((newpag>=0 && newpag<=(paginas.length-1))) setPag(newpag)
    }
  
    return [
        total,
        paginas,
        pag,
        desde_reg,
        hasta_reg,
        setDatos,
        setCantXPag,
        setPag,
        mueve
    ]
  };
  
  export default usePagination;
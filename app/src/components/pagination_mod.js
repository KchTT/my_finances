const Pagination = ({ paginas, pag, mueve, setPag }) => {
    return <>
        {paginas.length > 0 &&
            <nav aria-label="">
                <ul className="pagination pagination-sm justify-content-center mt-2">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous" name="-1" onClick={mueve}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {paginas.map((p, i) => {
                        return <li className={`page-item ${i == pag ? 'active' : ''}`} onClick={() => setPag(i)} key={"p_" + i}><a className="page-link" href="#">{i + 1}</a></li>
                    })}
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next" name="1" onClick={mueve}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        }
    </>
}

export default Pagination
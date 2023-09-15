// OBJECT PROPERY VALIDATION
const validateTransaction = (req, res, next) => {
    if(req.body.operation &&
        req.body.id_category &&
        req.body.date &&
        req.body.description &&
        req.body.amount){
            next()
    }else{
        res.status(400).json({ err: true, message: "Incomplete data." })
        return
    }
}

module.exports = validateTransaction;
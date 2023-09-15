// OBJECT PROPERY VALIDATION
const validateCategory = (req, res, next) => {
    if(req.body.operation &&
        req.body.name &&
        req.body.status){
            next()
    }else{
        res.status(400).json({ err: true, message: "Incomplete data." })
        return
    }
}

module.exports = validateCategory;
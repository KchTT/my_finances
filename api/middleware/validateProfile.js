// OBJECT PROPERY VALIDATION
const validateProfile = (req, res, next) => {
    if(req.body.lastname &&
        req.body.name &&
        req.body.month_limit ){
            next()
    }else{
        res.status(400).json({ err: true, message: "Incomplete data." })
        return
    }
}

module.exports = validateProfile;
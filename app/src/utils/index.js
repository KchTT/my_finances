import bcrypt from 'bcryptjs';

const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
}

const hashPass = async (pass) => new Promise((resolve, reject) => {
    bcrypt.hash(pass, 10, function (err, hash) {
        if (err) {
            reject(err)
        } else {
            resolve(hash)
        }
    });
})


export { 
    validateEmail,
    validatePassword,
    hashPass
}
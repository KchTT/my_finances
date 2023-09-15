import { axiosPublic, axiosPrivate } from "../config/axios";

const sendSignIn = async (_data) => {
    let request = await axiosPublic.post("/auth/sign_in", _data);
    return request
};

const sendSignUp = async (_data) => {
    let request = await axiosPublic.post("/auth/sign_up", _data);
    return request
};

const getTransactions = async (_from, _to, _operation,_id_category, _id) => {
    let request =  await axiosPrivate.get(`/transactions/${_from}/${_to}/${_operation}/${_id_category}${_id>0?'/'+_id:''}`);
    return request
};

const sendTransaction = async (_data) => {
    let request
    if(_data.hasOwnProperty("id") && _data.id) {
        request = await axiosPrivate.put("/transactions/"+_data.id, _data);
    }else{
        request = await axiosPrivate.post("/transactions", _data);
    }
    return request
};

const sendCategory = async (_data) => {
    let request
    if(_data.hasOwnProperty("id") && _data.id) {
        request = await axiosPrivate.put("/categories/"+_data.id, _data);
    }else{
        request = await axiosPrivate.post("/categories", _data);
    }
    return request
};

const deleteTransaction = async (_id) => {
    let request = await axiosPrivate.post("/transactions"+ _id);
    return request
};

const deleteCategory = async (_id) => {
    let request = await axiosPrivate.delete("/categories/"+ _id);
    return request
};

const getProfile = async () => {
    let request =  await axiosPrivate.get(`/profile`);
    return request
};

const updateProfile = async (_data) => {
    let request = await axiosPrivate.put("/profile", _data);
    return request
};

const getMonthResume = async () => {
    let request =  await axiosPrivate.get(`/transactions/month_resume`);
    return request
};

const chkToken = async () => {
    let request =  await axiosPrivate.post(`/auth/chk_token`);
    return request
}

export { 
    sendSignIn,
    sendSignUp,
    sendTransaction,
    sendCategory,
    deleteTransaction,
    deleteCategory,
    getTransactions,
    getProfile,
    updateProfile,
    getMonthResume,
    chkToken
};
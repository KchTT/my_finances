import { axiosPublic, axiosPrivate } from "../config/axios";

const sendSignIn = async (_data) => {
    try {
        let request = await axiosPublic.post("/auth/sign_in", _data);
        return request
    } catch (error) {
        throw new Error("Connection Error");
    }
};

const sendSignUp = async (_data) => {
    try {
        let request = await axiosPublic.post("/auth/sign_up", _data);
        return request
    } catch (error) {
        throw new Error("Connection Error");
    }
};

const getTransactions = async (_from, _to, _operation,_id_category, _id) => {
    try {
        let request =  await axiosPrivate.get(`/transactions/${_from}/${_to}/${_operation}/${_id_category}${_id>0?'/'+_id:''}`);
        return request
    } catch (error) {
        throw new Error("Connection Error");
    }
};

const sendTransaction = async (_data) => {
    try {
        let request
        if(_data.hasOwnProperty("id") && _data.id) {
            request = await axiosPrivate.put("/transactions/"+_data.id, _data);
        }else{
            request = await axiosPrivate.post("/transactions", _data);
        }
        return request
    } catch (error) {
        throw new Error("Connection Error");
    }
};

const sendCategory = async (_data) => {
    try {
        let request
        if(_data.hasOwnProperty("id") && _data.id) {
            request = await axiosPrivate.put("/categories/"+_data.id, _data);
        }else{
            request = await axiosPrivate.post("/categories", _data);
        }
        return request
    } catch (error) {
        throw new Error("Connection Error");
    }
};

const deleteTransaction = async (_id) => {
    try {
        let request = await axiosPrivate.post("/transactions"+ _id);
        return request
    } catch (error) {
        throw new Error("Connection Error");
    }
};

const deleteCategory = async (_id) => {
    try {
        let request = await axiosPrivate.delete("/categories/"+ _id);
        return request
    } catch (error) {
        throw new Error("Connection Error");
    }
};

const getProfile = async () => {
    try {
        let request =  await axiosPrivate.get(`/profile`);
        return request
    } catch (error) {
        throw new Error("Connection Error");
    }
};

const updateProfile = async (_data) => {
    try {
        let request = await axiosPrivate.put("/profile", _data);
        return request
    } catch (error) {
        throw new Error("Connection Error");
    }
};

const getMonthResume = async () => {
    try {
        let request =  await axiosPrivate.get(`/transactions/month_resume`);
        return request
    } catch (error) {
        throw new Error("Connection Error");
    }
};

const chkToken = async () => {
    try {
        let request =  await axiosPrivate.post(`/auth/chk_token`);
        console.log(request.status);
        return request
    } catch (error) {
        throw new Error("Connection Error");
    }
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
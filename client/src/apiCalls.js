import axios from "axios";

const API_URL = "http://localhost:8800/api/";
export const loginCall = async (userCredentials, dispatch) => {
    dispatch({type: "LOGIN_START"});

    try {
        const res = await axios.post(`${API_URL}auth/login`, userCredentials);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    }catch (e) {
        dispatch({type: "LOGIN_FAILURE", payload: e});
    }
};


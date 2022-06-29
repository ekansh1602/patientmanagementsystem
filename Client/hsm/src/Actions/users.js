import * as api from '../Apis/index';


export const registerUser = (userData ,navigate) => async (dispatch) => {
    
    try{
        const { data } = await api.register(userData);
        dispatch({ type: 'USER', payload: data });
        navigate(`/dashboard`);
    }
    catch(err){
        console.log(err);
        alert(err.response.data.message);
    }
}

export const loginUser = (userData, navigate) => async (dispatch) => {
    try{
        const { data } = await api.login(userData);
        dispatch({ type: 'USER', payload: data });
        navigate(`/dashboard`);
    }
    catch(err){
        console.log(err);
        alert(err.response.data.message);
    }
}

export const logout = () => async (dispatch) => {
    try{
        dispatch({type: 'LOGOUT'});
    }
    catch(err){
        console.log(err);
    }
}
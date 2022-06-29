import * as api from '../Apis/index';


export const getPatients = () => async (dispatch) => {
    try{
        const { data } = await api.getPatients();
        dispatch({ type: 'GET_PATIENTS', payload: data });
    }
    catch(err){
        console.log(err);
    }
}

export const getPatient = (id) => async (dispatch) => {
    try{
        const { data } = await api.getPatient(id);
        dispatch({ type: 'GET_PATIENT', payload: data });
    }
    catch(err){
        console.log(err);
    }
}

export const createPatient = (patient) => async (dispatch) => {
    try{
        const { data } = await api.createPatient(patient);
        dispatch({ type: 'CREATE_PATIENT', payload: data });
    }
    catch(err){
        console.log(err);
    }
}

export const deletePatient = (id) => async (dispatch) => {
    try{
        await api.deletePatient(id);
        dispatch({ type: 'DELETE_PATIENT', payload: id });
    }
    catch(err){
        console.log(err);
    }
}
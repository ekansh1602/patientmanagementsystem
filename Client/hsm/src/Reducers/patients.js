const patients = (state = { patients: [], singlePatient: {}, isLoading: true }, action) => {
    switch(action.type) {
        case 'GET_PATIENTS':
            return { ...state, patients: action.payload };
        case 'GET_PATIENT':
            return { ...state, singlePatient: action.payload };
        case 'CREATE_PATIENT':
            return { ...state, patients: [...state.patients, action.payload] };
        case 'DELETE_PATIENT':
            return { ...state, patients: state.patients.filter((item) => item.id !==action.payload )};
        default:
            return state;
    }
}

export default patients;
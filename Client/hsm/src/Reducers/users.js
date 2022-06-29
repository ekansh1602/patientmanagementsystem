const users = ( state = { userData: null }, action) => {
    switch(action.type){
        case 'USER':
            localStorage.setItem('USER', JSON.stringify(action.payload));
            return { ...state, userData: action.payload };
        case 'LOGOUT':
            localStorage.removeItem('USER');
            return { ...state, userData: null };
        default:
            return state;
    }
}

export default users;
import "./Register.css";
import { useState } from 'react';

//Redux
import { useDispatch, useSelector } from 'react-redux';

//Router
import { useNavigate } from 'react-router-dom';


//Actions
import { registerUser } from '../../Actions/users';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((store) => store.users);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    console.log(state.userData);

    const onHandleSubmit = (event) => {
        event.preventDefault();
        dispatch(registerUser(user, navigate));
    }

    return(
        <div className="register">
        <form className="register-form">
            <h1 className="regiser-title">REGISTER</h1>
            <label>Username</label>
            <input type="username" placeholder="Enter your Username" onChange={(event) => setUser({ ...user, username: event.target.value })}/>
            <label>Email</label>
            <input type="email" placeholder="Enter your Email" onChange={(event) => setUser({ ...user, email: event.target.value })}/>
            <label>Password</label>
            <input type="password" placeholder="Enter your Password" onChange={(event) => setUser({ ...user, password: event.target.value })}/>
            <button className="register-button" onClick={onHandleSubmit}>Register</button>
        </form>
        <div className="register-form-account">
                <span onClick={() => navigate(`/login`)}>Already have an account?</span>
            </div>
    </div>
    )
}

export default Register;
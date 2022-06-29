import './Login.css';
import { useState } from 'react';

//Redux
import { useDispatch } from 'react-redux';

//Actions
import { loginUser } from '../../Actions/users';

//Router
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const onHandleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginUser(user, navigate))
    }


    return(
        <div className="login">
            <form className="login-form">
            <h1 className="login-title">LOGIN</h1>
                <label>Email</label>
                <input type="email" placeholder="Enter your Email" onChange={(event) => setUser({ ...user, email: event.target.value })}/>
                <label>Password</label>
                <input type="password" placeholder="Enter your Password" onChange={(event) => setUser({ ...user, password: event.target.value })}/>
                <button className="login-button" onClick={onHandleSubmit}>Login</button>
            </form>
            <div className="login-form-account">
                <span onClick={() => navigate(`/register`)}>Don't have an account?</span>
            </div>
        </div>
    )
}

export default Login;
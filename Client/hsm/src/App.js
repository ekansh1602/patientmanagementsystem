import './App.css';
import { useState, useEffect, Fragment } from 'react';

//Components
import Dashboard from '../src/Components/Dashboard/Dashboard';
import Login from '../src/Components/Login/Login';
import Register from '../src/Components/Register/Register';
import Details from '../src/Components/Details/Details';

//Redux
import { useSelector } from 'react-redux';

//Router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  const state = useSelector((store) => store.users);

  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('USER')));
    // console.log("user");
  }, [state.userData])

  // console.log(userData);



  return (
    <Router>
      <Fragment>
        <div className="App">
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/dashboard" exact element={userData === null ? <Navigate to="/login" /> : <Dashboard />} />
            <Route path="/detail/:id" exact element={<Details />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;

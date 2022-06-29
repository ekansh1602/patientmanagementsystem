import './Dashboard.css';
import { useState, useEffect, useMemo } from 'react';

//Components
import Paginate from '../Pagination/Paginate';

//Redux
import { useDispatch, useSelector } from 'react-redux';

//Actions
import { getPatients, createPatient, deletePatient } from '../../Actions/patients';
import { logout } from '../../Actions/users';

//CSV 
import { CSVLink } from "react-csv";

//Router
import { useNavigate } from 'react-router-dom';

const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Age", key: "age" },
    { label: "Gender", key: "gender" },
];

const Dashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //States
    const state = useSelector((store) => store.patients);
    const [patient, setPatient] = useState({
        name: '',
        email: '',
        age:0,
        gender: '',
    });
    const [searchItem, setSearchItem] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [sortOrder, setSortOrder] = useState('');
    const [sortBy, setSortBy] = useState('');


    useEffect(() => {
        dispatch(getPatients());
    }, [state.patients, dispatch])

    

    //Handlers
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const onHandleDelete = (item) => {
        dispatch(deletePatient(item._id));
    }

    const onHandleSearch = (event) => {
        setSearchItem(event.target.value);
    }

    const onHandleDetails = (id) => {
        navigate(`/detail/${id}`)
    }

    const onHandleLogout = () => {
        dispatch(logout());
        navigate(`/login`);
    }

    const onHandleSubmit = (event) => {
        event.preventDefault();
        dispatch(createPatient(patient));
        setPatient({
            name: '',
            email: '',
            age: 0,
            gender: '',
        })
    }

    //CSV
    const csvReport = {
        data: state.patients,
        headers: headers,
        filename: 'Patients.csv'
    };


    let finalData = useMemo(() => {
        let data = state.patients;

        //Searching
        if(searchItem){
            setCurrentPage(1);
            data = data.filter((item) => {
                return(
                    item.name.toLowerCase().includes(searchItem.toLowerCase())
                )
            })
        }

        //Sorting
        if(sortBy && sortOrder==='ASC'){
            data = [...data].sort((a,b) => {
                return (
                    a[sortBy].toString().toLowerCase() > b[sortBy].toString().toLowerCase() ? 1 : -1
                )
            })
        }

        if(sortBy && sortOrder==='DSC'){
            data = [...data].sort((a,b) => {
                return (
                    a[sortBy].toString().toLowerCase() < b[sortBy].toString().toLowerCase() ? 1 : -1
                )
            })
        }

        //Pagination
        setTotalItems(state.patients.length);
        return data.slice(
            (currentPage - 1) * itemsPerPage,
            (currentPage - 1) * itemsPerPage + itemsPerPage
        )

    }, [state.patients, searchItem, currentPage, sortBy, sortOrder]);




    return(
        <>
        <div className="dashboard-topbar">
        <button className="btn btn-danger" onClick={onHandleLogout}>LOGOUT</button> 
             <span className="welcome">Welcome - {JSON.parse(localStorage.getItem('USER'))?.result?.username}</span>
        </div>
        <div className="dashboard">
            <div className="dashboard-top">
                <h1 className="dashboard-title">ADD PATIENT</h1>
                    <div className="dashboard-input">
                        <label>Name:</label>
                        <input type="text" value={patient.name} placeholder="Enter name" onChange={(event) => setPatient({...patient, name: event.target.value })}/>
                    </div>
                    <div className="dashboard-input">
                        <label className="label">Email:</label>
                        <input type="text" value={patient.email} className="top-text" placeholder="Enter email" onChange={(event) => setPatient({...patient, email: event.target.value })}/>
                    </div>
                    <div className="dashboard-input">
                        <label className="label">Age:</label>
                        <input type="number" value={patient.age} className="top-text" placeholder="Enter age" onChange={(event) => setPatient({...patient, age: event.target.value })}/>
                    </div>
                    <div className="dashboard-input">
                        <label className="label">Gender:</label>
                        <select className="top-select" value={patient.gender} onChange={(event) => setPatient({...patient, gender: event.target.value })}>
                            <option value="" className="top-option-value">Select</option>
                            <option value="Male" className="top-option-value">Male</option>
                            <option value="Female" className="top-option-value">Female</option>
                        </select>
                    </div>
                <button type="submit" className="top-button btn btn-success" onClick={onHandleSubmit}>Submit</button>
            </div>

            <div className="dashboard-search">
                <input type="text" placeholder="Search Patient By Name..." className="search" onChange={onHandleSearch}/>
            </div>

            <div className="dashboard-bottom">
                <table className="table table-bordered">
                    <caption style={{ marginBottom: '50px'}}>Patients List</caption>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Age</td>
                            <td>Gender</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // currentPatient.filter((item) => {
                            //     return item.name.toLowerCase().includes(searchItem.toLowerCase())
                            // })
                            
                            finalData
                            .map((item) => {
                                return(
                                    <tr key={item._id} style={{ cursor: 'pointer' }}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.age}</td>
                                        <td>{item.gender}</td>
                                        <td>
                                            <div className="buttons">
                                                <button className="table-delete-button btn btn-danger" onClick={() => onHandleDelete(item)}>DEL</button>
                                                <button className="table-info-button btn btn-info" onClick={() => onHandleDetails(item._id)} style={{ marginLeft: '10px'}}>INFO</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className="sorting-by">
                <select className="sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="age">Age</option>
                    <option value="gender">Gender</option>
                </select>
            </div>

            <div className="sorting-order">
                <select className="sort" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                    <option value="">Order</option>
                    <option value="ASC">ASC</option>
                    <option value="DSC">DSC</option>
                </select>
            </div>

            <div className="current-page">
                <span className="page">Current Page - {currentPage}</span>
            </div>

            <div className="patients-pagination">
                <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} paginate={paginate} />
            </div>

            <div className="csv-download">
                <CSVLink {...csvReport}>Export to CSV</CSVLink><br /><br />
            </div>

        </div>
        </>
    )
}

export default Dashboard;
import { useState, useEffect } from 'react';
import './Details.css';

//Router
import { useParams, useNavigate } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from 'react-redux';

//Actions
import { getPatient } from '../../Actions/patients';

const Details = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector((store) => store.patients);

    const [singlePatient, setSinglePatient] = useState();

    useEffect(() =>{
        // const item = state.patients.find((val) => {
        //     return val._id === id
        // })
        // setSinglePatient(item);
        // // console.log(singlePatient);
        dispatch(getPatient(id));
        setSinglePatient(state.singlePatient);
    }, [state.singlePatient ,id, dispatch]);

    //Handlers
    const onHandleBack = (event) => {
        event.preventDefault();
        navigate(`/dashboard`);
    }

    return(
        <div className="details">
            <h1 className="details-title">Patient Details</h1>
            <div className="details-container">
                <span className="details-text">Name - {singlePatient?.name}</span>
                <span className="details-text">Email - {singlePatient?.email}</span>
                <span className="details-text">Age - {singlePatient?.age}</span>
                <span className="details-text">Gender - {singlePatient?.gender}</span>
            </div>
            
            <button type="button" className="details-back btn btn-danger" onClick={onHandleBack}>BACK</button>
        </div>
    )
}

export default Details;
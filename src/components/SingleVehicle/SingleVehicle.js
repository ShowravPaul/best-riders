import React from 'react';
import { Link } from 'react-router-dom';
import './SingleVehicle.css'

const SingleVehicle = (props) => {
    const { imageURL, vehicleName } = props.vehicle;
    return (
        <div className="col-sm-12 col-md-6 col-lg-3">
            <Link to={`/destination/${vehicleName}`}>
                <div className="card card-custom">
                    <div className="card-body">
                        <img src={imageURL} alt="" />
                        <h4 className="card-text card-text-custom">{vehicleName}</h4>
                    </div>
                </div>
            </Link>
        </div >
    );
};

export default SingleVehicle;
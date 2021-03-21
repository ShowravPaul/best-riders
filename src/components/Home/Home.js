import React from 'react';
import './Home.css'
import vehicles from '../../data/data.json';
import SingleVehicle from '../SingleVehicle/SingleVehicle';

const Home = () => {

    return (
        <div className="background">
            <div className="row">
                {
                    vehicles.map(element => <SingleVehicle vehicle={element} key={element.id} ></SingleVehicle>)
                }
            </div>
        </div>
    );
};

export default Home;
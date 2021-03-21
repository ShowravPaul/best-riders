import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Book.css'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


const Book = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { bedType } = useParams();
    return (
        <div className="container mt-5">
            <div>
                <h6 className="date">Date: </h6>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            </div>
            <div className="row">
                <div className="col-sm-12 col-lg-4 col-md-6 search-form">
                    <form className="mt-3">
                        <input type="email" className="form-control" id="" placeholder="From"></input>
                        <br />
                        <input type="email" className="form-control" id="" placeholder="To"></input>
                        <br />
                        <button className="btn btn-primary">Search</button>
                    </form>
                </div>
                <div className="col-sm-12 col-lg-8 col-md-6">
                    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[51.505, -0.09]}>
                            <Popup>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>

    );
};

export default Book;



        // <div style={{textAlign: 'center'}}>
        //     {/* <h1 style={{color: 'black'}}>This is the {bedType} room booking area</h1> */}

        // </div>
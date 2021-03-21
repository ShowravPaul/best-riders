import React, { useState } from 'react';
import './Book.css'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


const Book = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [searched, setSearched] = useState(true);
    const [places, setPlaces]= useState([]);
    
    // const vehicleName = useParams();
    // console.log(vehicleName);

    const handleBlue = event => {
        if (event.target.name === "from") places[0] = event.target.value;
        if (event.target.name === "to") places[1] = event.target.value;
        setPlaces(places);
    }
    
    return (
        <div className="container mt-5">
            <div>
                <h6 className="date">Date: </h6>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            </div>
            <div className="row">

                {
                    searched && <div className="col-sm-12 col-lg-4 col-md-6 search-form">
                        <form className="mt-3">
                            <input className="form-control" onBlur={handleBlue} name="from" id="" placeholder="From" required></input>
                            <br />
                            <input className="form-control" onBlur={handleBlue} name="to" id="" placeholder="To" required></input>
                            <br />
                            <button className="btn btn-primary" onClick={() => setSearched(!searched)}>Search</button>
                        </form>
                    </div>
                }
                {
                    !searched && <div className="col-sm-12 col-lg-4 col-md-6 afterSearch">
                            <h1>{places[0]} <span style={{color: "red"}}>To</span> {places[1]}</h1>
                    </div>
                }

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
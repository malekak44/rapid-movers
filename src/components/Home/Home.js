import React from 'react';
import './Home.css';
import Vehicle from '../Vehicle/Vehicle';
import background from '../../images/background.jpg';

const Home = () => {
    const url = window.location.href;
    if (!url.includes('login')) {
        document.body.style.backgroundImage = `url(${background})`;
    }

    const vehicles = [{ name: "BIKE", image: "https://i.ibb.co/C1Dtv09/bike.png" },
    { name: "CAR", image: "https://i.ibb.co/c2bXgL6/car.png" },
    { name: "BUS", image: "https://i.ibb.co/80z8GMQ/bus.png" },
    { name: "TRAIN", image: "https://i.ibb.co/tHfp8HV/train.png" }]

    return (
        <div className="vehicles-container">
            {
                vehicles.map(vehicle => <Vehicle data={vehicle} key={vehicle.name}></Vehicle>)
            }
        </div>
    );
};

export default Home;
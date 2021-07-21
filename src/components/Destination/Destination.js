import React from 'react';
import './Destination.css';
import destination from '../../images/destination.webp';
import map from '../../images/Map.png';
import car from '../../images/car.png';
import people from '../../images/peopleicon.png';

const Destination = () => {
    const url = window.location.href;
    if (url.includes('destination')) {
        document.body.style.backgroundImage = `url(${destination})`;
    }

    const showResult = (e) => {
        e.preventDefault();
        const mapForm = document.getElementById("mapForm");
        mapForm.style.display = "none";
        const resultDiv = document.getElementById("result-div");
        resultDiv.style.display = "block";
    }
    return (
        <>
            <hr />
            <div className="container destination">
                <div className="row">
                    <div className="col-md-4">
                        <div id="result-div">
                            <div className="places">
                                <p style={{ marginTop: "13px" }}>• Mirpur 1</p>
                                <p>• Dhanmondi</p>
                            </div>
                            <div className="car">
                                <img className="carIcon" src={car} alt="car" />
                                <p className="carName">Car</p>
                                <img className="peopleIcon" src={people} alt="people" />
                                <span className="quantity">4</span>
                                <p>$67</p>
                            </div>
                            <div className="car">
                                <img className="carIcon" src={car} alt="car" />
                                <p className="carName">Car</p>
                                <img className="peopleIcon" src={people} alt="people" />
                                <span className="quantity">4</span>
                                <p>$67</p>
                            </div>
                            <div className="car">
                                <img className="carIcon" src={car} alt="car" />
                                <p className="carName">Car</p>
                                <img className="peopleIcon" src={people} alt="people" />
                                <span className="quantity">4</span>
                                <p>$67</p>
                            </div>
                        </div>
                        <form id="mapForm" onSubmit={showResult}>
                            <div className="form-group">
                                <label htmlFor="from">Pick From</label>
                                <input type="text" className="form-control" id="from" value="Mirpur 1" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="to">Pick To</label>
                                <input type="text" className="form-control" id="to" value="Dhanmondi" />
                            </div>
                            <button type="submit" className="btn">Submit</button>
                        </form>
                    </div>
                    <div className="col-md-8">
                        <img id="map" style={{ width: "97%" }} src={map} alt="map" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Destination;
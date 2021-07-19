import React from 'react';
import './Destination.css';
import destination from '../../images/destination.webp';

const Destination = () => {
    const url = window.location.href;
    if (url.includes('destination')) {
        document.body.style.backgroundImage = `url(${destination})`;
    }
    return (
        <div>
            <hr />
        </div>
    );
};

export default Destination;
import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';
const Header = () => {
    const [signedInUser, setSignedInUser] = useContext(UserContext);
    let loginStatus;
    if (signedInUser.name) {
        loginStatus = <><li className="nav-item"><p style={{ width: "185px", textShadow: "0px 0px 10px white", color: "#FFAF24" }}>{signedInUser.name}</p></li><li className="nav-item"><button onClick={() => setSignedInUser({})} type="button">Signout</button></li></>
    } else {
        loginStatus = <><li className="nav-item"><Link to="/login"><button type="button">Login</button></Link></li></>;
    }
    return (
        <div className="container header">
            <nav className="navbar navbar-expand-lg">
                <h1 className="navbar-brand">Rapid Movers</h1>
                <div className="container nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/destination" style={{ textDecoration: "none", color: "white" }}>
                                <p>Destination</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <p>Contact</p>
                        </li>
                        {loginStatus}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
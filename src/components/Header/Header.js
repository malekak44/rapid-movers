import React from 'react';
import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';
const Header = () => {
    const [signedInUser, setSignedInUser] = useContext(UserContext);
    let loginStatus;
    let brand = document.getElementById("brand");
    if (signedInUser.name) {
        loginStatus = <><Nav.Link><p id="username" style={{ textShadow: "0px 0px 10px white", color: "#FFAF24" }}>{signedInUser.name}</p></Nav.Link><Nav.Link className="nav-item"><button onClick={() => setSignedInUser({})} type="button">Signout</button></Nav.Link></>
        brand.style.marginTop = "-16px";
    } else {
        loginStatus = <><Nav.Link className="nav-item"><Link to="/login"><button type="button">Login</button></Link></Nav.Link></>;
        if (brand)
            brand.style.marginTop = "-2px";
    }
    return (
        <div className="container header">
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand id="brand">Rapid Movers</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>
                                <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link>
                            </Nav.Link>
                            <Nav.Link >
                                <Link to="/destination" style={{ textDecoration: "none", color: "white" }}>Destination</Link>
                            </Nav.Link>
                            <Nav.Link>
                                Contact
                            </Nav.Link>
                            {loginStatus}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
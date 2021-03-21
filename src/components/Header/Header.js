import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Book from '../Book/Book';
import './Header.css';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <nav className=" header navbar navbar-default" role="navigation">
                <div className="container-fluid">
                    <h1>BEST RIDERS</h1>
                    <div className="navbar-header navbar-right">
                        <ul className="nav navbar-link">
                            <li>
                                <Link to="/home">Home</Link>
                            </li>
                            <li>
                                <Link to="/book">Destination</Link>
                            </li>
                            <li>
                                <Link to="/home">Blog</Link>
                            </li>
                            <li>
                                <Link to="/home">Contact</Link>
                            </li>
                            <li>
                                {
                                    loggedInUser.name ? <h5 className="header-user-name"> {loggedInUser.name} </h5> : <Link to="/login">Login</Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Header;

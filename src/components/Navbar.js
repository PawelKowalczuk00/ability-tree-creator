import React from "react";
import { Link } from "react-router-dom";

import '../styles/Navbar.css';

import logoPicture from '../images/logo.png';

export default class Navbar extends React.Component {

    render() {
        return (
            <nav>
                <div>
                    <Link to="/ability-tree-creator">
                        <img className="logo" src={logoPicture} alt='D I A B L O' />
                    </Link>
                </div>
                <div className="account">
                    <Link to="/ability-tree-creator/login">
                        Login
                    </Link>
                </div>
            </nav>
        );
    }
}
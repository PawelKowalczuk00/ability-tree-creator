import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useStateIfMounted } from "use-state-if-mounted";

import useGlobal from "../store";
import Loader from './utils/loaders/LoaderWidth.js';

import '../styles/Login.css';

let redirectTo = false;
let showLoader = false;
let email, setEmail, password, setPassword, setRedirectTo, setShowLoader, globalState, globalActions, isMounted, setIsMounted;

export default () => {
    [email, setEmail] = useState();
    [password, setPassword] = useState();
    [redirectTo, setRedirectTo] = useStateIfMounted();
    [showLoader, setShowLoader] = useStateIfMounted();
    [globalState, globalActions] = useGlobal();

    if (redirectTo)
        return (
            <div>
                <Redirect to={`/ability-tree-creator/${redirectTo}`} />
            </div>
        );
    else if (showLoader)
        return (
            <div className="content">
                <Loader />
            </div>
        );
    else return (
        <div className="content">
            <h2 className="row">
                Login
            </h2>
            <form className="row" onSubmit={onLoginSubmit}>
                <label className="row">
                    Email: <br />
                    <input type="email" placeholder="example@xd.com" onChange={e => setEmail(e.target.value)} />
                </label>
                <label className="row">
                    Password: <br />
                    <input type="password" placeholder="********" onChange={e => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Login" />
            </form>
            <Link to="/ability-tree-creator/register" className="row">
                <div>
                    Register instead
                </div>
            </Link>
        </div>
    );
};

const onLoginSubmit = async e => {
    e.preventDefault();
    setShowLoader(true);

    globalActions.userDetails.login({
        email, password
    })
        .then(res => {
            if (res >= 200 && res < 300)
                setRedirectTo('/ability-tree-creator');
        })
        .finally(() => {
            setShowLoader(false);
        });
}
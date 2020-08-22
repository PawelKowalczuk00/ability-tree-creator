import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useStateIfMounted } from "use-state-if-mounted";

import useGlobal from "../store";
import Loader from './utils/loaders/LoaderWidth.js';

import '../styles/Login.css';

let redirectTo = false;
let showLoader = false;
let email, setEmail, password, setPassword, setRedirectTo, setShowLoader, globalState, globalActions;

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
                Register
            </h2>
            <form className="row" onSubmit={onRegisterSubmit}>
                <label className="row">
                    Email: <br />
                    <input type="email" placeholder="example@xd.com" onChange={e => setEmail(e.target.value)} />
                </label>
                <label className="row">
                    Password: <br />
                    <input type="password" placeholder="********" onChange={e => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Register" />
            </form>
            <Link to="/ability-tree-creator/login" className="row">
                <div>
                    Login instead
                </div>
            </Link>
        </div>
    );
};

const onRegisterSubmit = e => {
    e.preventDefault();
    setShowLoader(true);

    globalActions.userDetails.register({
        email, password
    })
        .then(res => {
            if (res >= 200 && res < 300) {
                setRedirectTo('/ability-tree-creator');
            }
        })
        .finally(() => {
            setShowLoader(false);
        });

}
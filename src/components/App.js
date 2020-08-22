import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./Navbar.js";
import Footer from './Footer.js';
import Error from './Error.js';
import Login from "./Login.js";
import Register from './Register.js';
import Heroes from './Heroes.js';
/*import HeroDetail from './HeroDetail.js'; */

import '../styles/App.css';

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Navbar />
                <Error />
                <Switch>
                    <Route path='/ability-tree-creator/login' component={Login} />
                    <Route path='/ability-tree-creator/register' component={Register} />
                    
                    <Route path='/' component={Heroes} />
                </Switch>
                <Footer />
            </div>
        );
    }
}
                    /*
                    
<Route path='/hero' component={HeroDetail} />
*/
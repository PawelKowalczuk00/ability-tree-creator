import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./Navbar.js";
import Footer from './Footer.js';
import Error from './utils/loaders/Error.js';
import Login from "./Login.js";
import Register from './Register.js';
import Heroes from './Heroes.js';
import HeroDetail from './HeroDetail.js';

import '../styles/App.css';
import Cover from "./utils/loaders/CoverBg.js";
import CoverLoader from "./utils/loaders/CoverLoader.js";

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Navbar />
                <Error />
                <Cover />
                <CoverLoader />
                <Switch>
                    <Route exact path='/ability-tree-creator/login' component={Login} />
                    <Route exact path='/ability-tree-creator/register' component={Register} />
                    <Route exact path='/ability-tree-creator/hero/:id' component={HeroDetail} />
                    <Route exact path='/ability-tree-creator' component={Heroes} />
                    <Route path='/'>
                        <Redirect to='/ability-tree-creator' />
                    </Route>
                </Switch>
                <Footer />
            </div>
        );
    }
}
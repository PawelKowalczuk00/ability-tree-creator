import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useStateIfMounted } from "use-state-if-mounted";

import useGlobal from "../store";
import Loader from './utils/loaders/LoaderWidth.js';

import '../styles/Heroes.css';

export default () => {
    const [redirectTo, setRedirectTo] = useStateIfMounted(false);
    const [showLoader, setShowLoader] = useStateIfMounted(false);
    const [heroes, setHeroes] = useState([]);
    const [name, setName] = useState();
    const [globalState, globalActions] = useGlobal();

    const getResponse = async () => {
        setShowLoader(true);
        const response = await globalActions.heroes.getList();
        if (response?.status === 401)
            return setRedirectTo('login');
        else if (response?.status < 300)
            setHeroes(response.data);

        setShowLoader(false)
    }

    useEffect(() => {
        getResponse();
    }, []);

    const onNewHeroAdd = e => {
        globalActions.heroes.addOne({ name })
            .then(res => {
                globalActions.heroes.expose(res._id)
                setRedirectTo(`/ability-tree-creator/hero`);
            })
            .catch(er => {
                console.log('er :>> ', er);
            })
    }

    const renderBody = () => {
        console.log('heroes :>> ', heroes);
        return (
            <>
                {heroes.map((hero, index) => {
                    return (
                        <tr key={hero._id}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {hero.name}
                            </td>
                            <td>
                                {hero.creatorMail}
                            </td>
                            <td>
                                {(new Date(hero.creationDate)).toLocaleDateString()}
                            </td>
                            <td>
                                {hero.trees ? hero.trees.length : 'No trees'}
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    }

    const renderConditionally = () => {
        if (redirectTo)
            return (
                <tr>
                    <Redirect to={`/ability-tree-creator/${redirectTo}`} />
                </tr>
            );
        else if (showLoader)
            return (
                <tr className="content">
                    <Loader />
                </tr>
            );
        else
            return renderBody();
    }

    return (
        <div className="heroes">
            <table>
                <thead>
                    <tr>
                        <th>
                            Number
                            </th>
                        <th>
                            Name
                            </th>
                        <th>
                            Creator
                            </th>
                        <th>
                            Creation date
                            </th>
                        <th>
                            Trees
                            </th>
                    </tr>
                </thead>
                <tbody>
                    {renderConditionally()}
                    <tr className="new-hero">
                        <td>
                            Add new
                        </td>
                        <td>
                            <input type="text" onChange={e => setName(e.target.value)} />
                        </td>
                        <td>
                            {localStorage.getItem('email')}
                        </td>
                        <td>
                            {(new Date()).toLocaleDateString()}
                        </td>
                        <td>
                            <button onClick={onNewHeroAdd}>
                                +
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
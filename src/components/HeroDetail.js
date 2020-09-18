import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useStateIfMounted } from "use-state-if-mounted";

import useGlobal from "../store";
import Loader from './utils/loaders/LoaderWidth.js';

import '../styles/HeroDetail.css';
import TreesPreview from "./TreesPreview";

export default props => {
    const [redirectTo, setRedirectTo] = useStateIfMounted(false);
    const [showLoader, setShowLoader] = useStateIfMounted(true);
    const [hero, setHero] = useState([]);
    const [globalState, globalActions] = useGlobal();

    const getHero = async () => {
        setShowLoader(true);
        const response = await globalActions.heroes.getOne(props.match.params.id);
        if (response?.status === 401)
            setRedirectTo('login');
        else if (response?.status < 300 && response?.status >= 200)
            setHero(response.data);
        else
            setRedirectTo('');

        setShowLoader(false);
    }

    useEffect(() => {
        getHero();
    }, []);

    const onDeleteClick = async e => {
        e.target.disabled = true;
        const response = await globalActions.heroes.deleteOne(hero._id);
        if (response?.status === 200)
            setRedirectTo('/');
    }

    const renderBody = () => {
        return (
            <>
                <h2>{hero.name}</h2>
                <div>
                    <span>Creator: </span>
                    <span>{hero.creatorMail}</span>
                </div>
                <div>
                    <span>Creation Date: </span>
                    <span>
                        {(new Date(hero.creationDate)).toLocaleDateString()}
                    </span>
                </div>
                <button className="removeBtn" onClick={onDeleteClick}>
                    Delete
                </button>
                <TreesPreview trees={hero.trees || []} heroId={hero._id} />
            </>
        );
    }

    const renderConditionally = () => {
        if (redirectTo)
            return (
                <>
                    <Redirect to={`ability-tree-creator/${redirectTo}`} />
                </>
            );
        else if (showLoader)
            return (
                <div className="content">
                    <Loader />
                </div>
            );
        else
            return renderBody();
    }

    return (
        <div className="hero-details">

            {renderConditionally()}

        </div>
    );
}
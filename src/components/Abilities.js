import React from "react";

import useGlobal from "../store";

import '../styles/Abilities.css';

export default props => {

    const [globalState, globalActions] = useGlobal();

    console.log('props :>> ', props);

    return (
        <div className="abilities">
            <h4>{props.tree.name}</h4>
            {props.tree.abilities.map((ability, index) => {
                return (
                    <p key={index}>
                        <span>{index}:</span>
                        <span>{ability.name} lvl. {ability.level} - {ability.description}</span>
                    </p>
                );
            })}
        </div>
    );
};

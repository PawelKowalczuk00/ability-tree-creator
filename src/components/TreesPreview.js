import React, { useEffect, useState } from "react";

import '../styles/TreesPreview.css';

import useGlobal from "../store";
import Loader from "./utils/loaders/LoaderWidth";

export default props => {

    const [trees, setTrees] = useState(props.trees);
    const [detailedTrees, setDetailedTrees] = useState([]);
    const [current, setCurrent] = useState('loader');
    const [name, setName] = useState();
    const [imgUrl, setImgUrl] = useState();

    const [globalState, globalActions] = useGlobal();

    const getAllTrees = async () => {
        if (trees.length === 0)
            setCurrent('new');
        else {
            const treeList = await globalActions.trees.getAll(trees);
            setDetailedTrees(treeList.map(response => {
                return response.data
            }));
            setCurrent(trees.length-1);
        }
    }

    useEffect(() => {
        getAllTrees();
    }, [trees]);

    const onNewTreeSubmit = () => {
        setCurrent('loader');
        globalActions.trees.addOne({ name, imgUrl }, props.heroId)
            .then(res => {
                const newTreeId = res.data._id
                setTrees([...trees, newTreeId]);
            })
            .catch(() => {
                setCurrent('new');
            })
    }

    const renderConditionally = () => {
        if (current === 'loader')
            return <Loader />
        else if (current === 'new')
            return (
                <form onSubmit={onNewTreeSubmit}>
                    <label>Name <input type="text" name="name" onChange={e => setName(e.target.value)} /></label>
                    <label>Picture URL <input type="text" name="imgUrl" onChange={e => setImgUrl(e.target.value)} /></label>
                    <input type="submit" value="Create new ability tree" />
                </form>
            );
        else return (
            <div className="abilities">
                Abilities of {JSON.stringify(detailedTrees[current])}
            </div>
        );
    }

    const renderThumbnails = () => {
        return (
            <>
                {detailedTrees.map((tree, index) => {
                    return (
                        <div className="thumbnail" key={tree._id} onClick={() => setCurrent(index)}>
                            <img src={tree.imgUrl} alt="" /> <br />
                            <p>
                                {tree.name}
                            </p>
                        </div>
                    );
                })}
            </>
        );
    }

    return (
        <div className="tree">
            <div className="preview">
                {renderThumbnails()}
                <button className="new-tree" onClick={() => setCurrent('new')}>
                    +
                </button>
            </div>
            <div className="board">
                {renderConditionally()}
            </div>
        </div>
    );
}
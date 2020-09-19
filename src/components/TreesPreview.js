import React, { useEffect, useState } from "react";

import '../styles/TreesPreview.css';

import useGlobal from "../store";
import Loader from "./utils/loaders/LoaderWidth";
import Abilities from "./Abilities";

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
            setCurrent(trees.length - 1);
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

    const onRemoveTreeClick = async () => {
        globalActions.cover.showCoverLoader();
        const response = await globalActions.trees.deleteOne(detailedTrees[current]._id);
        globalActions.cover.hideCoverLoader();
        if (response?.status === 200) {
            if (detailedTrees.length > 0)
                setCurrent(detailedTrees.length - 1);
            else setCurrent('new');
        }
    }

    const renderConditionally = () => {
        if (current === 'loader')
            return <Loader />
        else if (current === 'new')
            return (
                <>
                    <form onSubmit={onNewTreeSubmit}>
                        <h4>Create new tree</h4>
                        <label>Name <input type="text" name="name" onChange={e => setName(e.target.value)} /></label>
                        <label>Picture URL <input type="text" name="imgUrl" onChange={e => setImgUrl(e.target.value)} /></label>
                        <input type="submit" value="Create new ability tree" />
                    </form>
                </>
            );
        else return (
            <>
                <button className="removeBtn" onClick={onRemoveTreeClick}>
                    Delete Tree
                </button>
                <Abilities heroId={props.heroId} tree={detailedTrees[current] || []}/>
            </>
        );
    }

    const renderThumbnails = () => {
        return (
            <>
                {detailedTrees.map((tree, index) => {
                    return (
                        <>
                            <div className="thumbnail" key={tree._id} onClick={() => setCurrent(index)}>
                                <p>
                                    {tree.name}
                                </p>
                            </div>
                            <div className="border"></div>
                        </>
                    );
                })}
            </>
        );
    }

    return (
        <div className="tree">
            <div className="preview">
                {renderThumbnails()}
                <button className="add-btn" onClick={() => setCurrent('new')}>
                    +
                </button>
            </div>
            <div className="board">
                {renderConditionally()}
            </div>
        </div>
    );
}
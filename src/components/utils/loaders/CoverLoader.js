import React from "react";

import useGlobal from "../../../store";
import Loader from "./LoaderWidth";

import '../../../styles/Cover.css';

export default () => {
  const [globalState, globalActions] = useGlobal();

  const onCoverClick = e => {
    e.stopPropagation();
  }

  return (
    <div className="cover" style={{ display: globalState.cover.loaderDisplay }} onClick={onCoverClick}>
      <div>
        <Loader />
      </div>
    </div>
  );
};
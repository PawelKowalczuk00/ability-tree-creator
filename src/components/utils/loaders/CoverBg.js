import React from "react";

import useGlobal from "../../../store";

import '../../../styles/Cover.css';

export default () => {
  const [globalState, globalActions] = useGlobal();

  const onCoverClick = e => {
    e.stopPropagation();
    globalActions.cover.hideCoverBg();
  }

  return (
    <div className="cover" style={{ display: globalState.cover.bgDisplay}} onClick={onCoverClick}></div>
  );
};
import React from "react";

import useGlobal from "../store";

import '../styles/Error.css'

export default () => {
  const [globalState, globalActions] = useGlobal();

  const style = {
    display: globalState.error.display
  }

  return (
    <div className="error" style={style}>
      <p>
          {globalState.error.message}
      </p>
      <br />
      <button onClick={globalActions.error.hide}>
          Hide
      </button>
    </div>
  );
};
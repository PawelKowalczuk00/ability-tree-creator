import React from "react";
import useGlobalHook from "use-global-hook";

import * as actions from "../actions";

const initialState = {
  token: localStorage.getItem('token') || undefined,
  error: {
    display: 'none',
    message: undefined
  },
  cover: {
    loaderDisplay: 'none',
    bgDisplay: 'none'
  }
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;

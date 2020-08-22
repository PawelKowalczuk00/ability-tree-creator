import React from "react";
import useGlobalHook from "use-global-hook";

import * as actions from "../actions";

const initialState = {
  token: undefined,
  error: {
    display: 'none',
    message: undefined
  },
  exposedHero: {
    name: '',
    _id: undefined
  }
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;

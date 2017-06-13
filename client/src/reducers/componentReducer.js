import React from 'react';

export default function reducer(state = {
  component: {},
}, action) {

  switch (action.type) {
  case 'COMPONENT_SELECTED': {
    return Object.assign({}, state, { component: action.payload.component });
  }
  case 'COMPONENT_DELETE' : {
    return Object.assign({}, state, { component: null });
  }

  }
  return state;
}
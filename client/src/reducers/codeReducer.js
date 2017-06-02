import React from 'react';
import ComponentView from '../components/View/componentView';

export default function reducer(state = {
  code: [],
  view: [],
  index: 0,
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
  case 'FETCH_CODE': {
    return Object.assign({}, state, {fetching: true});
  }
  case 'FETCH_CODE_REJECTED': {
    return Object.assign({}, state, {fetching: false, error: action.payload});
  }
  case 'FETCH_CODE_FULFILLED': {
    return Object.assign({}, state, {fetching: false, fetched: true, code: action.payload});
  }
  case 'ADD_CODE': {
    return Object.assign({}, state, {code: state.code.concat(action.payload)});
  }
  case 'CLEAR_CODE': {
    return Object.assign({}, state, {code: [] });
  }
  case 'FETCH_DEFAULT_VIEW': {
    return Object.assign({}, state, {view: state.view.concat(action.payload.view)});
  }
  case 'FETCH_VIEW': {
    return Object.assign({}, state, {fetchingView: true});
  }
  case 'CHANGE_DROP_COMPONENT': {
    return Object.assign({}, state, {view: action.payload.view});
  }
  case 'INCREMENT_INDEX': {
    return Object.assign({}, state, {index: action.payload.index});
  }
  }

  return state;
}

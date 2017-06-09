import React from 'react';

export default function reducer(state = {
  components: [],
  componentsLinkedList: {},
  head: null,
  tail: null,
  item: 1,
  fetching: false,
  fetched: false,
  error: null,
  tree: {},
  saving: false,
  saved: false,
  loading: false,
  loaded: false,
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
    return Object.assign({}, state, {components: state.components.concat(action.payload)});
  }
  case 'ADD_CODE_TOP': {
    return Object.assign({}, state, {components: [action.payload].concat(state.components)});
  }
  case 'ADD_TO_HEAD': {
    return Object.assign(
      {},
      state,
      {componentsLinkedList: action.payload.linkedData.linkedList},
      {head: action.payload.linkedData.head},
      {tail: action.payload.linkedData.tail},
      {item: action.payload.linkedData.item},
    );
  }
  case 'ADD_TO_TAIL': {
    return Object.assign(
      {},
      state,
      {componentsLinkedList: action.payload.linkedData.linkedList},
      {head: action.payload.linkedData.head},
      {tail: action.payload.linkedData.tail},
      {item: action.payload.linkedData.item},
    );
  }
  case 'CLEAR_CODE': {
    return Object.assign({}, state, {componentsLinkedList: {} });
  }
  case 'UPDATE_TREE': {
    return Object.assign({}, state, { tree: action.payload.tree });
  }
  case 'SAVE_PROJECT': {
    return Object.assign({}, state, {saving: true});
  }
  case 'SAVE_PROJECT_REJECTED': {
    return Object.assign({}, state, {saving: false, error: action.payload});
  }
  case 'SAVE_PROJECT_FULFILLED': {
    return Object.assign({}, state, {saving: false, saved: true});
  }
  case 'LOAD_PROJECTS': {
    return Object.assign({}, state, {loading: true});
  }
  case 'LOAD_PROJECTS_REJECTED': {
    return Object.assign({}, state, {loading: false, error: action.payload});
  }
  case 'LOAD_PROJECTS_FULFILLED': {
    return Object.assign({}, state, {loading: false, loaded: true});
  }
  }

  return state;
}

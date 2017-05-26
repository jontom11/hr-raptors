export default function reducer(state = {
  user: {
    id: null,
    name: null,
    age: null,
  },
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
  case 'FETCH_USER': {
    return Object.assign({}, state, {fetching: true});
  }
  case 'FETCH_USER_REJECTED': {
    return Object.assign({}, state, {fetching: false, error: action.payload});
  }
  case 'FETCH_USER_FULFILLED': {
    return Object.assign({},
        state,
      {fetching: false,
        fetched: true,
        user: action.payload, });
  }
  }

  return state;
}

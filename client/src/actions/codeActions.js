import axios from 'axios';
import CircularJSON from 'circular-json';

module.exports = {
  fetchCode: () => {
    return function(dispatch) {
      dispatch({type: 'FETCH_CODE'});

      axios.get('http://127.0.0.1:3000/api/code')
      .then((response) => {
        console.log(response.data);
        dispatch({type: 'FETCH_CODE_FULFILLED', payload: response.data});
      })
      .catch((err) => {
        dispatch({type: 'FETCH_CODE_REJECTED', payload: err});
      });
    };
  },
  addCode: (id, componentCode, isDropped, dropTarget) => {
    return {
      type: 'ADD_CODE',
      payload: {
        id,
        componentCode,
        isDropped,
        dropTarget,
      },
    };
  },
  addCodeTop: (id, componentCode, isDropped, dropTarget) => {
    return {
      type: 'ADD_CODE_TOP',
      payload: {
        id,
        componentCode,
        isDropped,
        dropTarget,
      },
    };
  },
  addToHead: (linkedData) => {
    return  {
      type: 'ADD_TO_HEAD',
      payload: { linkedData },
    };
  },
  addToTail: (linkedData) => {
    return  {
      type: 'ADD_TO_TAIL',
      payload: { linkedData },
    };
  },
  clearCode: () => {
    return {
      type: 'CLEAR_CODE',
      payload: {},
    };
  },
  updateTree: (tree) => {
    return {
      type: 'UPDATE_TREE',
      payload: { tree },
    };
  },
  saveTree: (tree) => {
    return function(dispatch) {
      dispatch({type: 'SAVE_TREE'});

      var serialized = CircularJSON.stringify(tree);
      console.log('SERIALIZED TREE?? ', serialized);

      axios.post('http://127.0.0.1:3000/postgres/tree', {codeTree: serialized})
        .then((response) => {
          dispatch({type: 'SAVE_TREE_FULFILLED', payload: response.data});
        })
        .catch((err) => {
          dispatch({type: 'SAVE_TREE_REJECTED', payload: err});
        });
    };
  },
};

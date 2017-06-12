import axios from 'axios';
import Tree from '../dataStructure/tree';
import dragItems from '../dragItems';

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
  saveProject: (tree, userData, projectName) => { //%%%%%%%%%%%%% Send username to HEre!
    return function(dispatch) {
      dispatch({type: 'SAVE_PROJECT'});
      axios.post( '/postgres/tree', { codeTree: tree, userData: userData, projectName: projectName })
        .then((response) => {
          dispatch({type: 'SAVE_PROJECT_FULFILLED', payload: response.data});
        })
        .catch((err) => {
          dispatch({type: 'SAVE_PROJECT_REJECTED', payload: err});
        });
    };
  },
  loadProjects: (user) => {
    return function(dispatch) {
      dispatch({type: 'LOAD_PROJECTS'});
      console.log(`calling loadProjects action with user: ${user}`);
      
      axios.get('/postgres/tree')
        .then((response) => {
          dispatch({type: 'LOAD_PROJECTS_FULFILLED', payload: response.data});
        })
        .catch((err) => {
          dispatch({type: 'LOAD_PROJECTS_REJECTED', payload: err});
        });
    };
  },
};


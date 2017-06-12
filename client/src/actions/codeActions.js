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
  updateTreeNew: (componentName, toID, oldTree) => {
    return function(dispatch) {
      console.log(Object.keys(oldTree).length <= 0);
      if (Object.keys(oldTree).length <= 0) {
        var tree = new Tree(
          dragItems[componentName]
        );
        dispatch({ type: 'UPDATE_TREE', payload: { tree } });
      } else if (toID === 'head') {
        var tree = oldTree;
        tree = tree.pushToHead(
          dragItems[componentName]
        );
        dispatch({ type: 'UPDATE_TREE', payload: { tree } });
      } else {
        var tree = oldTree;
        tree.add(
          dragItems[componentName],
          toID,
          tree.traverseBF
        );
        dispatch({ type: 'UPDATE_TREE', payload: { tree } });
      }

    };
  },
  updateTree: (tree) => {
    return {
      type: 'UPDATE_TREE',
      payload: { tree },
    };
  },
  saveProject: (tree, userData) => {
    return function(dispatch) {
      dispatch({type: 'SAVE_PROJECT'});

      // var postData = JSON.stringify( tree );      
      // var postData = JSON.stringify( {1:1, 2:{3:{3:{4:4}}}} );      
      // axios.post('http://127.0.0.1:3000/postgres/tree', tree )
      axios.post( '/postgres/tree', { codeTree: tree, userData: userData })
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
  updateCurrentRowObject: (currentRowObject) => {
    return {
      type: 'CURRENT_ROW_OBJECT',
      payload: currentRowObject,
    };
  },
};


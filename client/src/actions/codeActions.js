import axios from 'axios';

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
  updateTreeNew: () => {
    return function(dispatch) {
      if (nextProps.componentState.componentID !== this.props.componentState.componentID) {
        if (Object.keys(this.props.tree).length === 0) {
          var tree = new Tree(
            dragItems[nextProps.componentState.componentName]
          );
          dispatch(updateTree(tree));
        } else if (nextProps.componentState.ID === 'head') {
          var tree = this.props.tree;
          tree = tree.pushToHead(
            dragItems[nextProps.componentState.componentName]
          );
          dispatch(updateTree(tree));
        } else {
          var tree = this.props.tree;
          tree.add(
            dragItems[nextProps.componentState.componentName],
            nextProps.componentState.ID,
            tree.traverseBF
          );
          dispatch(updateTree(tree));
        }
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
};


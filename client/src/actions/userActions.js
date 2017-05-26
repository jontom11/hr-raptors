import axios from 'axios';

module.exports = {
  fetchUser: () => {
    return function(dispatch) {
      dispatch({type: 'FETCH_USER'});

      axios.get('http://127.0.0.1:3000/api/users')
      .then((response) => {
        console.log(response.data);
        dispatch({type: 'FETCH_USER_FULFILLED', payload: response.data});
      })
      .catch((err) => {
        dispatch({type: 'FETCH_USER_REJECTED', payload: err});
      });
    };
  },
};

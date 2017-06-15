module.exports = {
  selectComponent:(component) =>{
    return {
      type:'COMPONENT_SELECTED',
      payload: { component }
    };
  },
  deleteComponent:(component) =>{
    return {
      type:'COMPONENT_DELETE',
      payload: {}
    };
  }
};

import React from 'react';
import { connect } from "react-redux"
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import { updateTree, loadProjects } from '../../actions/codeActions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Tree from '../../dataStructure/tree.js'
import dragItems from '../../dragItems';

@connect((store) => {
  return {
    projects: store.code.projects,
    projectData: store.code.projects.query_rows,
    tree: store.code.tree,
    userData: store.user.user,
  };
})
class ProjectView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projectData: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.projectData !== this.props.projectData) {
      this.setState({projectData: nextProps.projectData });
    }
  }

  createNewTree(tempTree) {
    var rootComponent = tempTree._root.component;
    var inputText = tempTree._root.inputText;
    var rootComponentName = tempTree._root.componentName;
    var oldRootChildren = tempTree._root.children;
    var isRow = tempTree._root.isRow;
    var rowObject =  tempTree._root.rowObject;

    var newRootTree = new Tree(rootComponent, rowObject, isRow, rootComponentName, inputText);
    newRootTree._root.children = oldRootChildren;

    if (newRootTree._root.children.length > 0) {
      newRootTree._root.ID = newRootTree._root.children[0].parentID;
    }

    newRootTree.traverseDF((node) => {

      newRootTree.updateComponent(node.ID, newRootTree.traverseDF, dragItems[node.componentName], node.inputText, node.componentName);

      var rowObject = node.rowObject;

      _.forEach(rowObject.linkedList, (col, key) => {
        if (_.startsWith(key, 'col')) {
          col.component = dragItems[col.linkedComponentName];
        }
      });

    });
    return newRootTree;
  }

  handleClick(treeString) {
    var treeObject = JSON.parse(treeString);
    var selectedTree = this.createNewTree(treeObject);
    this.props.dispatch(updateTree(selectedTree));
  }

  deleteClick(project_name) {
    axios.post( '/postgres/delete', {project_name: project_name})
      .then((response) => {
        console.log('responded with this:', response);
        this.props.dispatch(loadProjects(this.props.userData.name));
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    var projects = this.state.projectData;

    return (
      <div className="center-content">
        <h1>{this.props.user}</h1>
        <div className="card-row">
          {
            _.map(projects, (project, index) =>
<<<<<<< HEAD
              <div className="col s4" id="card" key={index}>
                <Card id="card">
                  <CardTitle title={project.project_name} subtitle={project.time_stamp} />
                  <CardText>
                    {project.description}
                  </CardText>
                  <CardActions>
                    <FlatButton style={{border:'2px solid #555', transition: 'opacity 3s ease-in-out'}} label="Delete Project" onClick={this.deleteClick.bind(this, project.project_name)}/>
                    <Link to="/"><FlatButton style={{border:'2px solid #555' }} label="Load Project" onClick={this.handleClick.bind(this, project.object)}/></Link>
                  </CardActions>
                </Card>
=======
              <div className="card-project">
                <div className="card-project_inner">
                  <h4>{project.project_name}</h4>
                  <p>{project.time_stamp}</p>
                  <p>{project.description}</p>
                  <div className="card-button">
                    <button className="button-depth waves-effect" onClick={this.deleteClick.bind(this, project.project_name)}>Delete Project</button>
                    <Link to="/"><button className="button-depth waves-effect" onClick={this.handleClick.bind(this, project.object)}>Load Project</button></Link>
                  </div>
                </div>
>>>>>>> Re-style cards in profile
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default ProjectView;

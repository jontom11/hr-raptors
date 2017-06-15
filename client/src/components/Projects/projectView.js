import React from 'react';
import { connect } from "react-redux"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import Tree from '../../dataStructure/tree.js'
import dragItems from '../../dragItems';
import { updateTree } from '../../actions/codeActions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';



@connect((store) => {
  return {
    projects: store.code.projects,
    projectData: store.code.projects.query_rows,
    tree: store.code.tree,
  };
})

class ProjectView extends React.Component {

  constructor(props) {
    super(props);
    this.state = { projectData: [] }
    this.handleClick = this.handleClick.bind(this);
  }



  componentWillReceiveProps(nextProps) {
    console.log('@@@ inside componentWillReceiveProps')
    console.log('this.props.projectData: ', this.props.projectData);
    console.log('nextprops projectdata: ', nextProps.projectData)
    console.log('STATE!!', this.state.projectData);

    if(nextProps.projectData !== this.props.projectData) {
      console.log('@@@ inside IF nextProps.projectData !== this.props.projectData');
      this.setState({projectData: nextProps.projectData }, ()=> {
        console.log('STATE!!', this.state.projectData);
        var PD = this.state.projectData;
        PD.forEach((proj,idx) => {
          console.log(`project #${idx+1}: `, proj);
          console.log('project code: ', proj.object);
        });
      });
    }
  }

  addPrototypesToTree(tempTree) {
    console.log('I AM ROOOOOOOOOOOOOOOOOT: ', tempTree['_root']);

    var rootComponent = tempTree['_root'].component;
    var rootComponentName = tempTree['_root'].componentName;
    var rowObject =  {
      linkedList: {},
      head: null,
      tail: null,
      renderLinkedList: [],
    };

    var oldRootChildren = tempTree['_root'].children;

    // function Node(component, rowObject, isRow, compName)
    var newRootTree = new Tree(rootComponent, rowObject, false, rootComponentName );
    newRootTree['_root'].children = oldRootChildren;

    if (newRootTree['_root'].children.length > 0) {
      newRootTree['_root'].ID = newRootTree['_root'].children[0].parentID;
    }

    newRootTree.traverseDF((node) => {
      node.component = dragItems[node.componentName];
    });

    console.log('NEW ROOT TREE: ', newRootTree);

    return newRootTree;
  }

  handleClick(treeString) {
    var treeObject = JSON.parse(treeString);
    var selectedTree = this.addPrototypesToTree(treeObject);
    this.props.dispatch(updateTree(selectedTree));
  }

  render() {
    var projects = this.state.projectData;

    return (
      <div className="center-content">
        <h1>Project View</h1>
        <div className="row">
          {
            _.map(projects, (project, index) =>
              <div className="col s4" key={index}>
                <Card>
                  <CardTitle title={project.project_name} subtitle={project.time_stamp} />
                  <CardText>
                    {project.description}
                  </CardText>
                  <CardActions>
                    <Link to="/"><FlatButton label="Load Project" onClick={this.handleClick.bind(this, project.object)}/></Link>
                  </CardActions>
                </Card>
              </div>
            )
          }
        </div>
      </div>

    );
  }
}

export default ProjectView;

// const treeMap = _.map(treeArray, (node, index) => (


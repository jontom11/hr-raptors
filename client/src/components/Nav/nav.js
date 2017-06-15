import React from 'react';
import Navbar from 'react-sidebar';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import NavTitlePanel from './navTitlePanel';
import SidebarContent from './sidebarContent';
import View from '../View/view';
import Code from '../Code/code';
import Projects from '../Projects/projectView';
import { saveProject } from '../../actions/codeActions';
import { loadProjects } from '../../actions/codeActions';
import SaveProjectDialog from './saveProjectDialog';
import ContentHeader from './contentHeader';


const styles = {
  content: {
    padding: '2.5vh',
  },
  center: {
    margin: 'auto',
    width: '50%',
    padding: '10px',
  },
};

@connect((store) => {
  return {
    tree: store.code.tree,
    userData: store.user.user,
    options: store.code.options
  };
})
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      docked: true,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
      open: false,
      errorText: "This field is required (minimum 3 char)",
      projectName: "",
      errorTextDescription: "This field is required (minimum 20 char)",
      projectDescription: "",
    };
  }

  menuButtonClick() {
    this.setState({
      docked: !this.state.docked,
    });
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleCancel() {
    this.setState({
      open: false,
      projectName: "",
      projectDescription: ""
    });
  };

  handleSubmit() {
    this.props.tree.traverseDF(function(node) {
      node.rowObject.renderLinkedList = {};
    });
    this.props.dispatch(saveProject(this.props.tree, this.props.userData, this.state.projectName, this.state.projectDescription));
    this.setState({
      open: false,
      projectName: "",
      projectDescription: "",
    });
  };

  handleChange(event) {
    if (event.target.value.length > 2) {
      this.setState({errorText: ""});
    } else {
      this.setState({errorText: "This field is required (minimum 3 char)"});
    }
    this.setState({
      projectName: event.target.value,
    })
  }

  handleChangeDescription(event) {
    if (event.target.value.length > 19) {
      this.setState({errorTextDescription: ""});
    } else {
      this.setState({errorTextDescription: "This field is required (minimum 20 char)"});
    }
    this.setState({
      projectDescription: event.target.value,
    })
  }

  loadButtonClick() {
    this.props.dispatch(loadProjects(this.props.userData.name));
  }


  render() {
    const sidebar = <SidebarContent />;

    const contentHeader = <ContentHeader
      state={this.state}
      menuButtonClick={this.menuButtonClick.bind(this)}
      handleOpen={this.handleOpen.bind(this)}
      loadButtonClick={this.loadButtonClick.bind(this)}
    />;

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      styles: {
        sidebar: Object.assign({}, styles.sidebar, {position: 'fixed'})
      },
    };
      return(
        <Router>
          <div>
          <Navbar {...sidebarProps}>
            <NavTitlePanel title={contentHeader} />
            <div style={styles.content}>
              <Route exact path="/" component={View}/>
              <Route path="/code" component={Code}/>
              <Route path="/projects" component={Projects}/>
            </div>
          </Navbar>
            <SaveProjectDialog
              state={this.state}
              handleChange={this.handleChange.bind(this)}
              handleChangeDescription={this.handleChangeDescription.bind(this)}
              handleSubmit={this.handleSubmit.bind(this)}
              handleCancel={this.handleCancel.bind(this)}
            />
          </div>
        </Router>
      );
    }
}

export default Nav;

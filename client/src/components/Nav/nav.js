import React from 'react';
import Navbar from 'react-sidebar';
import NavTitlePanel from './navTitlePanel';
import SidebarContent from './sidebarContent';
import OptionBarContent from './optionBarContent';
import download from 'downloadjs';
import { saveProject } from "../../actions/codeActions"
import { loadProjects } from "../../actions/codeActions"
import { connect } from "react-redux"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import View from '../View/view';
import Code from '../Code/code';
import Projects from '../Projects/projectView';


const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
  content: {
    padding: '2.5vh',
  },
  center: {
    margin: 'auto',
    width: '50%',
    padding: '10px',
  }
}

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

  menuButtonClick(ev) {
    // ev.preventDefault();
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
    this.props.dispatch(saveProject(this.props.tree, this.props.userData, this.state.projectName, this.state.projectDescription));
    this.setState({
      open: false,
      projectName: "",
      projectDescription: "",
    });
    download(document.getElementsByTagName('code')[0].innerText, 'Material-GUI.html', 'text/html');
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
    // console.log('################# THIS.PROPS:', this.props)
    // console.log('current user is:\n', this.props.userData);
    // console.log('loading projects.....');
    this.props.dispatch(loadProjects(this.props.userData.name));
  }

  render() {
    const sidebar = <SidebarContent />;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
    ];

    const contentHeader = (
      <div className="nav-wrapper">
        <div className="left">
          {!this.state.docked ?
            <a onClick={this.menuButtonClick.bind(this)} style={styles.contentHeaderMenuLink}><i className="fa fa-bars" aria-hidden="true" /></a> :
            <a onClick={this.menuButtonClick.bind(this)} style={styles.contentHeaderMenuLink}><i className="fa fa-times" aria-hidden="true" /></a>}
          <Link to="/"><a style={styles.contentHeaderMenuLink}><i className="fa fa-desktop" aria-hidden="true" /></a></Link>
          <Link to="/code"><a style={styles.contentHeaderMenuLink}><i className="fa fa-code" aria-hidden="true" /></a></Link>
          <a onTouchTap={this.handleOpen.bind(this)} style={styles.contentHeaderMenuLink}><i className="fa fa-download" aria-hidden="true" /></a>
					<Dialog
						title="Save Project"
						actions={actions}
						modal={true}
						open={this.state.open}
					>
						<div className="center">
						<ul>
							<li>{this.state.projectName}</li>
							<li>{this.state.projectDescription}</li>
							<li>
								<TextField
								hintText="Project Name"
								errorText={this.state.errorText}
								floatingLabelText="Project Name"
								onChange={this.handleChange.bind(this)}
								/>
							</li>
							<li>
								<TextField
								hintText="Project Description"
								errorText={this.state.errorTextDescription}
								floatingLabelText="Project Description"
								onChange={this.handleChangeDescription.bind(this)}
								multiLine={true}
								/>
							</li>
						</ul>
						</div>
					</Dialog>
          <a onClick={this.loadButtonClick.bind(this)} style={styles.contentHeaderMenuLink}><i className="fa fa-user" aria-hidden="true"/></a>
          <a href={"/login"} style={styles.contentHeaderMenuLink}><i className="fa fa-sign-out" aria-hidden="true" /></a>
        </div>
      </div>);

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
    {if (this.props.options){
      return (
        <Router>
          <Navbar {...sidebarProps}>
            <NavTitlePanel title={contentHeader} />
            <div style={styles.content}>
              <Route exact path="/" component={View}/>
              <Route path="/code" component={Code}/>
            </div>
            <div className ="nav-wrapper">
              <div className='right sidebar' >
                <OptionBarContent/>
              </div>
            </div>
          </Navbar>
        </Router>
      );
    } else {
      return(
        <Router>
          <Navbar {...sidebarProps}>
            <NavTitlePanel title={contentHeader} />
            <div style={styles.content}>
              <Route exact path="/" component={View}/>
              <Route path="/code" component={Code}/>
              <Route path="/projects" component={Projects}/>
            </div>
          </Navbar>
        </Router>
      );}
    }
  }
}

export default Nav;

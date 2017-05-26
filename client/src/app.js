import React from 'react';
import ReactDOM from 'react-dom';

import '!style-loader!css-loader!sass-loader!./sass/all.scss';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap: http://stackoverflow.com/a/34015469/988941
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
injectTapEventPlugin();

import View from './components/View/view';
import Nav from './components/Nav/nav';
import SideBar from './components/SideBar/sidebar';
import Code from './components/Code/code';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewState: true,
    };
    this.toggleView = this.toggleView.bind(this);
  }

  toggleView() {
    console.log('I was clicked');
    this.setState({
      viewState: !this.state.viewState,
    });
  }


  render() {
    let main = <View />;
    if (this.state.viewState) {
      main = <View />;
    } else {
      main = <Code />;
    }
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className='wrap'>
          <Nav onClick={this.toggleView.bind(this)} />
          <div className='bodywrap'>
            <SideBar />
            {main}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

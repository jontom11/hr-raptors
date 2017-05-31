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

import { Provider } from 'react-redux';
import store from './store';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';


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
      <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className='wrap'>
          <Nav onClick={this.toggleView} />
          <div className='bodywrap'>
            <div>
              <h3 draggable="true"></h3>
            </div>
            <SideBar />
            {main}
          </div>
        </div>
      </MuiThemeProvider>
      </Provider>
    );
  }
}
App = DragDropContext(HTML5Backend)(App);
ReactDOM.render(<App />, document.getElementById('root'));

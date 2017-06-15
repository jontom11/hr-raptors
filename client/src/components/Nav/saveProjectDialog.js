import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class SaveProjectDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleCancel}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.props.handleSubmit}
      />,
    ];

    return (
      <Dialog
        title="Save Project"
        actions={actions}
        modal={true}
        open={this.props.state.open}
      >
        <div className="center">
          <ul>
            <li>{this.props.state.projectName}</li>
            <li>{this.props.state.projectDescription}</li>
            <li>
              <TextField
                hintText="Project Name"
                errorText={this.props.state.errorText}
                floatingLabelText="Project Name"
                onChange={this.props.handleChange}
              />
            </li>
            <li>
              <TextField
                hintText="Project Description"
                errorText={this.props.state.errorTextDescription}
                floatingLabelText="Project Description"
                onChange={this.props.handleChangeDescription}
                multiLine={true}
              />
            </li>
          </ul>
        </div>
      </Dialog>
    );
  }

}

export default SaveProjectDialog;

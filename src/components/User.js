import React, {PropTypes} from 'react';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { editUser } from '../actions/UserActions'
import store from '../stores/Store';

// export default const User = ({name, age}) => (
//         <tr>
//         <td ref="username" onClick={this.edit}>{this.props.user.username}</td>
//         <td ref="email">{this.props.user.email}</td>
//         {onDelete ? this.renderDelete() : null }
//         </tr>
// );

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.finishEdit = this.finishEdit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.edit = this.edit.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderUser = this.renderUser.bind(this);
    this.state = {
        editing: false
    };
  }
  render() {
    // renderUser();
    const user = this.props.user;
    // return (
    //   <tr>
    //     <td ref="username" onClick={this.edit}>{user.username}</td>
    //     <td ref="email">{user.email}</td>
    //   </tr>
    // );
        // {onDelete ? this.renderDelete() : null }

    const editing = this.state.editing;

    return (editing ? this.renderEdit() : this.renderUser());
  }
  renderEdit() {
    return (
        <tr>
        <td>
        <FormControl type="text" bsSize="medium"
          autoFocus={true}
          defaultValue={this.props.user.username} ref="username"/>
        </td>
        <td>
        <FormControl type="text" bsSize="medium"
          defaultValue={this.props.user.email} ref="email" onKeyPress={this.checkEnter}/>
        </td>
        <td>
        <Button bsSize="small" className="pull-right" onClick={this.finishEdit}>
        <Glyphicon glyph="glyphicon glyphicon-ok"/>
        </Button>
        </td>
        </tr>
    );
  }
  renderUser() {
    const onDelete = this.props.onDelete;
    const user = this.props.user;
    return (
        <tr>
        <td ref="username" onClick={this.edit}>{user.username}</td>
        <td ref="email">{user.email}</td>
        {onDelete ? this.renderDelete() : null }
        </tr>
    );
  }
  edit() {
    this.setState({
      editing: true
    });
  }
  checkEnter(e) {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  }
  finishEdit(e) {
    // TODO use state instead of refs
    this.props.user.username = this.refs.username.value;
    this.props.user.email = this.refs.email.value;
    this.props.onEdit(this.props.user);

    this.setState({
      editing: false
    });
    // TODO get index somehow
    var user = {username: this.props.user.username, email: this.props.user.email, index: 0};
    store.dispatch(editUser(0, user ));
    // store.dispatch(changeEmail(this.props.user.email));
  }
  renderDelete() {
    return (
        <td>
        <Button bsSize="small" className="pull-right" onClick={this.props.onDelete}>
        <Glyphicon glyph="glyphicon glyphicon-remove"/>
        </Button>
        </td>
    );
  }
}
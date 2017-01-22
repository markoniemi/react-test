import React, {PropTypes} from 'react';
import { Input } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

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

    // this.finishEdit = this.finishEdit.bind(this);
    // this.checkEnter = this.checkEnter.bind(this);
    // this.edit = this.edit.bind(this);
    // this.renderEdit = this.renderEdit.bind(this);
    // this.renderUser = this.renderUser.bind(this);
    //
    // this.state = {
    //     editing: false
    // };
  }
  render() {
    renderUser();
    // const editing = this.state.editing;
    //
    // return (editing ? this.renderEdit() : this.renderUser());
  }
  // renderEdit() {
  //   return (
  //       <tr>
  //       <td>
  //       <Input type="text" bsSize="medium"
  //         autoFocus={true}
  //       defaultValue={this.props.user.username} ref="username"/>
  //       </td>
  //       <td>
  //       <Input type="text" bsSize="medium"
  //         defaultValue={this.props.user.email} ref="email" onKeyPress={this.checkEnter}/>
  //       </td>
  //       <td>
  //       <Button bsSize="small" className="pull-right" onClick={this.finishEdit}>
  //       <Glyphicon glyph="glyphicon glyphicon-ok"/>
  //       </Button>
  //       </td>
  //       </tr>
  //   );
  // }
  renderUser() {
    const onDelete = this.props.onDelete;
    return (
        <tr>
        <td ref="username" onClick={this.edit}>{this.props.user.username}</td>
        <td ref="email">{this.props.user.email}</td>
        {onDelete ? this.renderDelete() : null }
        </tr>
    );
  }
  // edit() {
  //   this.setState({
  //     editing: true
  //   });
  // }
  // checkEnter(e) {
  //   if(e.key === 'Enter') {
  //     this.finishEdit(e);
  //   }
  // }
  // finishEdit(e) {
  //   this.props.user.username = this.refs.username.getValue();
  //   this.props.user.email = this.refs.email.getValue();
  //   this.props.onEdit(this.props.user);
  //
  //   this.setState({
  //     editing: false
  //   });
  // }
  // renderDelete() {
  //   return (
  //       <td>
  //       <Button bsSize="small" className="pull-right" onClick={this.props.onDelete}>
  //       <Glyphicon glyph="glyphicon glyphicon-remove"/>
  //       </Button>
  //       </td>
  //   );
  // }
}
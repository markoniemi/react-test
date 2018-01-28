import * as React from "react";
import {Table} from "react-bootstrap";
import User from "../domain/User";
import UserRow from "./UserRow";
interface IUsers {
  users: ReadonlyArray<User>;
}
export default class Users extends React.Component<IUsers, any> {
  constructor(props: IUsers) {
    super(props);
    this.renderUser = this.renderUser.bind(this);
  }

  public render(): JSX.Element {
    return (
      <Table>
        <tbody>
        {this.props.users.map(this.renderUser)}
        </tbody>
      </Table>);
  }

  private renderUser(user: User): JSX.Element {
    return (
      <UserRow user={user} key={user._id}/>
    );
  }
}

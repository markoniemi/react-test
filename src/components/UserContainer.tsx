import * as React from "react";
import {connect, DispatchProp} from "react-redux";
import {hashHistory, RouterState} from "react-router";
import {Action, Dispatch} from "redux";
import UserActions from "../actions/UserActions";
import User from "../domain/User";
import {IRootState} from "../stores/Store";
import EditUser from "./EditUser";

export interface IUserContainer {
  user: User;
}

export interface IUserContainerActions {
  addUser: () => Promise<void>;
}

export class UserContainer extends React.Component<IUserContainer, RouterState> {
  public constructor(props: IUserContainer) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <EditUser user={this.props.user}/>
    );
  }

  public static mapStateToProps(state: IRootState, props: RouterState): IUserContainer {
    let user: User = new User();
    const userId = props.params.id;
    if (0 < state.users.length && userId) {
      user = UserContainer.findUserById(state.users, userId);
    }
    return {user};
  }

  public static mapDispatchToProps(dispatch: Dispatch<IUserContainerActions>): any {
    return {
      newUser: UserContainer.newUser(),
    };
  }

  private static findUserById(users: ReadonlyArray<User>, id: string): User {
    return users.find((user: User): boolean => user._id === id);
  }

  private static newUser(): void {

  }
}

export default connect<IUserContainer, any, RouterState>
(UserContainer.mapStateToProps, UserContainer.mapDispatchToProps)
(UserContainer);

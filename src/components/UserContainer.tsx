import * as React from "react";
import {connect} from "react-redux";
import {RouterState} from "react-router";
import {Dispatch} from "redux";
import UserActions from "../actions/UserActions";
import User from "../domain/User";
import store, {IRootState} from "../stores/Store";
import EditUser from "./EditUser";

export interface IUserContainer {
  user: User;
}

export interface IUserContainerActions {
  saveUser: (user: User) => Promise<void>;
}

export class UserContainer extends React.Component<IUserContainer & IUserContainerActions, RouterState> {
  public constructor(props: IUserContainer & IUserContainerActions) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <EditUser user={this.props.user} saveUser={this.props.saveUser}/>
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

  public static mapDispatchToProps(dispatch: Dispatch<IUserContainerActions>): IUserContainerActions {
    return {
      saveUser: UserContainer.saveUser,
    };
  }

  private static findUserById(users: ReadonlyArray<User>, id: string): User {
    return users.find((user: User): boolean => user._id === id);
  }

  public static async saveUser(user: User): Promise<void> {
    if (user._id) {
      await store.dispatch(UserActions.editUser(user));
    } else {
      await store.dispatch(UserActions.addUser(user));
    }
  }
}

export default connect<IUserContainer, IUserContainerActions, RouterState>
(UserContainer.mapStateToProps, UserContainer.mapDispatchToProps)
(UserContainer);

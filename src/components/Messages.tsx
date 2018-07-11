import * as Debug from "debug";
import * as React from "react";
import {Alert} from "react-bootstrap";
import {connect} from "react-redux";
import Message from "../domain/Message";
import {IRootState} from "../stores/Store";

export interface IMessages {
  messages?: ReadonlyArray<Message>;
}

const debug: Debug.IDebugger = Debug("Messages");

class Messages extends React.Component<IMessages, any> {
  constructor(props: IMessages) {
    super(props);
  }

  public render(): JSX.Element {
    if (this.props.messages != null && this.props.messages.length > 0) {
      return (
        <div>
          {this.props.messages.map(this.renderMessage)}
        </div>
      );
    } else {
      return null;
    }
  }

  private renderMessage(message: Message): JSX.Element {
    return (
      <Alert bsStyle="danger" key={message._id}>{message.text}</Alert>
    );
  }

  public static mapStateToProps(state: IRootState): IMessages {
    return {messages: state.messages};
  }
}

export default connect(Messages.mapStateToProps)(Messages);

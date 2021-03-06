import * as Debug from "debug";
import * as React from "react";
import {Alert} from "react-bootstrap";
import {connect} from "react-redux";
import Message, {MessageType} from "../domain/Message";
import {IRootState} from "../stores/Store";

export interface IMessages {
  messages?: ReadonlyArray<Message>;
}

export class Messages extends React.Component<IMessages, {}> {
  private static readonly debug: Debug.IDebugger = Debug("Messages");

  constructor(props: IMessages) {
    super(props);
  }

  public render(): JSX.Element {
    if (this.props.messages != null && this.props.messages.length > 0) {
      return (
        <div id="messages">
          {this.props.messages.map(this.renderMessage)}
        </div>
      );
    } else {
      return null;
    }
  }

  public static mapStateToProps(state: IRootState): IMessages {
    return {messages: state.messages};
  }

  private renderMessage(message: Message): JSX.Element {
    return (
      <Alert bsStyle={Messages.mapTypeToStyle(message.type)} key={message.id}>{message.text}</Alert>
    );
  }

  private static mapTypeToStyle(type: MessageType): string {
    if (type === MessageType.ERROR) {
      return "danger";
    }
    if (type === MessageType.WARN) {
      return "warning";
    }
    if (type === MessageType.SUCCESS) {
      return "success";
    }
    return "info";
  }
}

export default connect(Messages.mapStateToProps)(Messages);

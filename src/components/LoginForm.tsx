import {Form, Formik} from "formik";
import * as React from "react";
import {
  Button,
  Col,
  ControlLabel,
  Form as BSForm,
  FormControl,
  FormGroup,
  Glyphicon,
  Grid,
  Panel,
  Row
} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import LoginActions from "../actions/LoginActions";
import store from "../stores/Store";

export interface ILoginForm {
  username: string;
  password: string;
}

export default class LoginForm extends React.Component<{}, ILoginForm> {
  private initialValues: ILoginForm;

  constructor(props: any) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.login = this.login.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.initialValues = {username: "a", password: "a"};
  }

  public render(): JSX.Element {
    return (
      <Formik initialValues={this.initialValues} onSubmit={this.onSubmit} render={this.renderForm}/>
    );
  }

  private async onSubmit(form: ILoginForm) {
    await this.setState({username: form.username, password: form.password});
    this.login();
  }

  public renderForm(props): JSX.Element {
    return (
      <Grid>
        <Row>
          <Col sm={1} md={4} mdOffset={4}>
            <Panel>
              <Panel.Heading><FormattedMessage id="login"/></Panel.Heading>
              <Panel.Body>
                  <Form id="loginForm" horizontal={true} onSubmit={props.handleSubmit}>
                    <FormGroup>
                      <Col sm={4}>
                        <ControlLabel><FormattedMessage id="username"/>:</ControlLabel>
                      </Col>
                      <Col sm={4}>
                        <FormControl
                          name="username"
                          id="username"
                          type="text"
                          bsSize="small"
                          autoFocus={true}
                          ref="username"
                          onChange={props.handleChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col sm={4}>
                        <ControlLabel><FormattedMessage id="password"/>:</ControlLabel>
                      </Col>
                      <Col sm={4}>
                        <FormControl
                          id="password"
                          name="password"
                          type="password"
                          bsSize="small"
                          ref="password"
                          onKeyPress={this.onKeyPress}
                          onChange={props.handleChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col sm={5}>
                        <Button type="submit" id="login" bsSize="small" className="pull-right">
                          <Glyphicon glyph="glyphicon glyphicon-ok"/>
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }

  private onChangeUsername(event: React.ChangeEvent<any>): void {
    this.setState({
      username: event.target.value,
    });
  }

  private onChangePassword(event: React.ChangeEvent<any>): void {
    this.setState({
      password: event.target.value,
    });
  }

  private async onKeyPress(event: React.KeyboardEvent<FormControl>): Promise<void> {
    if ("Enter" === event.key) {
      await this.login();
    }
  }

  private async login(): Promise<void> {
    const loginForm: ILoginForm = {
      password: this.state.password,
      username: this.state.username,
    };
    await store.dispatch(LoginActions.login(loginForm));
  }
}

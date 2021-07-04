import React from 'react';
import {UserAuthenticationAction} from '../../action/UserAuthenticationAction';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const user = require("../../assets/Login.json")
const email = user.username
const pass  = user.password
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
    
  }

  handleSubmit(event) {
    let username = this.state.username;
    let password = this.state.password;
    const usernamePattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const passwordPattern = /[a-zA-Z]+[0-9]/;
    if(usernamePattern.test(username) && passwordPattern.test(password)){
      if(username == email && password == pass){
        this.props.dispatch(UserAuthenticationAction(true));
        this.props.history.push({
          pathname: '/dashboardpage'
        })
      }
      else {
        alert ("User credentials are wrong, check again !!")
      }
    }
    else{
      alert ("Field are invalid, please check again !!")
    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
        </label>
        <label>
          Password:
          <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    UserAuthenticationAction: (userAuth) => { dispatch(UserAuthenticationAction(userAuth)); },
  };
 };

export default withRouter(connect(mapDispatchToProps)(LoginPage));

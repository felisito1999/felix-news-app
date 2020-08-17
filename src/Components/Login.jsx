import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import qs from "qs";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isUserLoggedIn: this.props.isUserLoggedIn,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameOnChange = this.handleUsernameOnChange.bind(this);
    this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this);
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleFailedLogin = this.handleFailedLogin.bind(this);
  }
  componentDidMount() {}

  handleSuccessfulLogin() {
    alert("Welcome " + localStorage.getItem("userName"));
    console.log("successful");
    this.props.handleUserLoggedIn(true);
    this.props.history.push("/");
  }
  handleFailedLogin() {
    // this.setState({username : ""})
    this.setState({ password: "" });

    // let usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    // // usernameInput.value = "";
    passwordInput.value = this.state.password;
    passwordInput.focus();
    // passwordInput.select();

    alert("the login has failed, check your credentials and try again");
  }
  handleUsernameOnChange(event) {
    event.preventDefault();

    let usernameValue = event.target.value;
    this.setState({ username: usernameValue });
  }
  handlePasswordOnChange(event) {
    event.preventDefault();

    let passwordValue = event.target.value;
    this.setState({ password: passwordValue });
  }
  handleSubmit(e) {
    e.preventDefault();

    let data = qs.stringify(
      {
        grant_type: "password",
        username: this.state.username,
        password: this.state.password,
      },
      { encode: false }
    );
    let config = {
      method: "post",
      url: "https://newsappapi20200817171221.azurewebsites.net/Token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        localStorage.setItem("userToken", response.data.access_token);
        localStorage.setItem("userName", response.data.userName);
        localStorage.setItem("isUserLoggedIn", true);
        this.handleSuccessfulLogin();
        window.location.reload(false);
        // this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        console.log(data);
        this.handleFailedLogin();
      });
  }

  render() {
    if (this.state.isUserLoggedIn) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-0 col-sm-0 col-md-2"></div>
            <div className="col-12 col-sm-12 col-md-8">
              <form
                className="jumbotron bg-secondary"
                onSubmit={this.handleSubmit}
              >
                <h1 className="text-center text-black">Login</h1>
                <div className="form-group">
                  <label htmlFor="username" className="text-light">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={this.handleUsernameOnChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="text-light">
                    Password
                  </label>
                  <input
                    name="password"
                    id="password"
                    type="password"
                    onChange={this.handlePasswordOnChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-dark btn-block">Login</button>
                </div>
              </form>
            </div>
            <div className="col-0 col-sm-0 col-md-2"></div>
          </div>
        </div>
      );
    }
  }
}

export default Login;

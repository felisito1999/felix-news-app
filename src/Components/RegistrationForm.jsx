import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Redirect} from "react-router-dom"
import axios from "axios";

class RegistationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      telephoneNumber: "",
      cellphoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      roleId: ""
    };
    this.handleEmailAddressChange = this.handleEmailAddressChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleTelephoneNumberChange = this.handleTelephoneNumberChange.bind(this);
    this.handleCellphoneNumberChange = this.handleCellphoneNumberChange.bind(this);
  }
  componentDidMount() {
    const emailField = document.getElementById("email-address");
    emailField.focus();
  }

  handleEmailAddressChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
    // this.setState({ userInformation.password : event.target.value})
  }

  handleConfirmPasswordChange(event) {
    this.setState({ confirmPassword: event.target.value });
  }
  handleFirstNameChange(event) {
    this.setState({firstName : event.target.value})
  }
  handleLastNameChange(event) {
    this.setState({lastName : event.target.value})
  }
  handleTelephoneNumberChange(event) { 
    this.setState({telephoneNumber : event.target.value})
  }
  handleCellphoneNumberChange(event) {
    this.setState({cellphoneNumber : event.target.value})
  }
  // handleUsernameChange(){
  //   this.setState({userInformation.username})
  // }

  handleRegistrationSubmit(event) {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      let data = JSON.stringify({
        Email: this.state.email,
        Password: this.state.password,
        ConfirmPassword: this.state.confirmPassword,
      });

      let config = {
        method: "post",
        url: "/api/Account/Register",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          console.log(response.data);

          let dataRegisterTwo = JSON.stringify({
            UserId: response.data.userId,
            Username: this.state.email,
            Password: this.state.password,
            FirstName: this.state.firstName,
            LastName: this.state.lastName,
            Email: this.state.email,
            TelephoneNumber: this.state.telephoneNumber,
            CellphoneNumber: this.state.cellphoneNumber,
          });
          let configRegisterTwo = {
            method: "post",
            url: "/api/User/Register",
            headers: {
              "Content-Type": "application/json",
            },
            data: dataRegisterTwo,
          };
          axios(configRegisterTwo)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              if(response.data.usernameAlreadyExists === false){
                alert(response.data.message)
                return <Redirect to={"/login"}/>
              }
              else {
                alert("Username already exists")
              }
            })
            .catch((error) => {
              console.log(error);
              alert("The user colud not be registered")
            });
        })
        .catch((error) => {
          console.log(error);
          alert("The user could not be registered")
        });
    } else {
      alert("The passwords dont match");
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-0 col-sm-0 col-md-2"></div>
          <div className="col-12 col-sm-12 col-md-8">
            <form
              className="jumbotron bg-secondary"
              onSubmit={this.handleRegistrationSubmit}
            >
              <h1 className="text-center text-black">Registration form</h1>
              {/* <div className="form-group">
                <label className="text-light" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  maxLength="15"
                  required
                />
              </div> */}
              <div className="form-group">
                <label className="text-light" htmlFor="email-address">
                  Email address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email-address"
                  name="email-address"
                  placeholder="Enter your email address"
                  minLength="15"
                  maxLength="35"
                  onChange={this.handleEmailAddressChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-light" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  minLength="5"
                  maxLength="20"
                  onChange={this.handlePasswordChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-light" htmlFor="confirm-password">
                  Confirm password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Confirm your password"
                  minLength="5"
                  maxLength="20"
                  onChange={this.handleConfirmPasswordChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-light" htmlFor="first-name">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="first-name"
                  name="first-name"
                  placeholder="Enter your first name"
                  minLength="2"
                  maxLength="40"
                  onChange={this.handleFirstNameChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-light" htmlFor="last-name">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="last-name"
                  name="last-name"
                  placeholder="Enter your last name"
                  minLength="2"
                  maxLength="40"
                  onChange={this.handleLastNameChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-light" htmlFor="telephone-number">
                  Telephone number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="telephone-number"
                  name="telephone-number"
                  placeholder="(000)-000-0000"
                  minLength="14"
                  maxLength="14"
                  // pattern="([0-9]{3})-[0-9]{3}-[0-9]{4}"
                  onChange={this.handleTelephoneNumberChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-light" htmlFor="cellphone-number">
                  Cellphone number
                </label>
                <input
                  type="tel"
                  name="cellphone-number"
                  id="cellphone-number"
                  placeholder="1(000)-000-0000"
                  minLength="15"
                  maxLength="15"
                  className="form-control"
                  // pattern="1([0-9]{3})-[0-9]{3}-[0-9]{4}"
                  onChange={this.handleCellphoneNumberChange}
                />
              </div>
              {/* <div className="form-group">
                <label className="text-light" htmlFor="user-type">
                  Apply to
                </label>
                <select className="form-control" id="user-type" required>
                  <option value="1">Administrator</option>
                  <option value="2">Editor</option>
                  <option value="3">Standard user</option>
                </select>
              </div> */}
              <div className="form-group">
                <button className="btn btn-dark btn-block" type="submit">
                  Register
                </button>
              </div>
              <div className="form-group">
                <Link to="/" className="btn btn-light btn-block">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          <div className="col-0 col-sm-0 col-md-2"></div>
        </div>
      </div>
    );
  }
}
export default RegistationForm;

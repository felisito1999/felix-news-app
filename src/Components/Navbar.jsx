import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: this.props.isUserLoggedIn,
      username: this.props.username,
      userFullName: this.props.userFullName,
    };
    this.logoutUser = this.logoutUser.bind(this);
  }
  // componentDidMount(){
  //   this.setState({isUserLoggedIn: localStorage.getItem("isUserLoggedIn")})
  // }
  logoutUser() {
    localStorage.clear();
    this.props.handleUserLoggedOut();
    this.setState({ isUserLoggedIn: false });
    this.props.history.push("/");
    return <Redirect to={"/"} />;
    // this.props.history.push("/");
  }
  render() {
    return (
      <Navbar bg="dark" variant="dark" fixed="top" expand="md">
        <Navbar.Brand href="/">Felix News App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Gossip</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Economy</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Dominican Republic
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                International
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="nav navbar-nav navbar-right">
            {this.state.isUserLoggedIn ? (
              <>
                <Link to={"/"} className="nav-link">
                  Hello, {this.state.username}
                </Link>
                <span className="nav-link text-secondary pr-2 pl-2">|</span>
                <button
                  onClick={this.logoutUser}
                  className="nav-link btn btn-link"
                >
                  LogOut
                </button>
              </>
            ) : (
              <div className="form-inline">
                <Link className="nav-link" to="/login">
                  Login
                </Link>{" "}
                <span className="text-secondary pr-2 pl-2">|</span>
                <Link className="nav-link" to="/registration">
                  Register
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default withRouter(NavigationBar);

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: this.props.isUserLoggedIn,
      username: this.props.username,
      userFullName: this.props.userFullName,
      categories: [],
    };
    this.logoutUser = this.logoutUser.bind(this);
    this.loadCategories = this.loadCategories.bind(this);
  }
  componentDidMount() {
    this.loadCategories();
  }
  logoutUser() {
    localStorage.clear();
    this.props.handleUserLoggedOut();
    this.setState({ isUserLoggedIn: false });
    this.props.history.push("/");
  }
  async loadCategories() {
    let data = {};
    let config = {
      method: "get",
      url: "https://newsappapi20200817171221.azurewebsites.net/api/Category",
      headers: {},
      data: data,
    };

    await axios(config)
      .then((response) => {
        this.setState({ categories: response.data.categories });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <Navbar bg="dark" variant="dark" fixed="top" expand="md">
        <div className="container">
          <Navbar.Brand href="/">Felix News App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to={"/articleAdd"}>
                Add articles
              </Link>
              <Link className="nav-link" to={"/publishArticles"}>
                Publish articles
              </Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                {this.state.categories.map((category, item) => (
                  <Link
                    key={item}
                    className="dropdown-item"
                    to={`/articles/byCategories/${category.CategoryId}`}
                  >
                    {category.Name}
                  </Link>
                ))}
              </NavDropdown>
              <Link className="nav-link" to={"/users"}>Users</Link>
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
        </div>
      </Navbar>
    );
  }
}
export default withRouter(NavigationBar);

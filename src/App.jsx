import React, { Component } from "react";
import Navigationbar from "./Components/Navbar.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import About from "./Components/About.jsx";
import RegistrationForm from "./Components/RegistrationForm.jsx";
import Login from "./Components/Login.jsx";
import ArticleDisplay from "./Components/Articles.jsx";
import ArticleView from "./Components/ArticleView.jsx";
import Error404 from "./Components/404error.jsx";
import ArticleDisplayByCategory from "./Components/ArticlesByCategoryId.jsx";
import ArticleAdd from "./Components/ArticleAdd.jsx";
import PublishArticle from "./Components/PublishArticles.jsx";
import ArticleUpdate from "./Components/ArticleUpdate.jsx";
import UserList from "./Components/UserList.jsx";
import UserUpdate from "./Components/UserUpdate.jsx";
// import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: localStorage.getItem("isUserLoggedIn"),
      username: localStorage.getItem("userName"),
    };
    this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this);
    this.handleUserLoggedOut = this.handleUserLoggedOut.bind(this);
  }

  handleUserLoggedIn(value) {
    this.setState({ isUserLoggedIn: value });
    console.log(value);
  }
  handleUserLoggedOut() {
    this.setState({ isUserLoggedIn: false });
    console.log(this.state.isUserLoggedIn);
  }

  render() {
    let isUserLoggedIn = this.state.isUserLoggedIn;
    return (
      <div className="bg-secondary min-vh-100">
        <Router>
          <Navigationbar
            isUserLoggedIn={this.state.isUserLoggedIn}
            handleUserLoggedOut={this.handleUserLoggedOut}
            username={localStorage.getItem("userName")}
            userFullName={"Félix Junior Pérez Peguero"}
          />
          <div
            className="container bg-dark min-vh-100"
            style={{ marginTop: 56 }}
          >
            <Switch>
              <Route
                exact
                path={"/felix-news-app/"}
                render={(props) => (
                  <ArticleDisplay
                    {...props}
                    isUserLoggedIn={this.state.isUserLoggedIn}
                  />
                )}
              ></Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/registration">
                {isUserLoggedIn ? <Redirect to="/" /> : <RegistrationForm />}
              </Route>
              <Route
                exact
                path={"/login"}
                render={(props) => (
                  <Login
                    {...props}
                    isUserLoggedIn={this.state.isUserLoggedIn}
                    handleUserLoggedIn={this.handleUserLoggedIn}
                  />
                )}
              />
              <Route exact path={"/articles/:id"} component={ArticleView} />
              <Route
                path={"/articles/byCategories/:id"}
                component={ArticleDisplayByCategory}
              />
              <Route path={"/publishArticles"} component={PublishArticle}/>
              <Route exact path={"/articleAdd"} component={ArticleAdd}/>
              <Route exact path={"/articleUpdate/:id"} component={ArticleUpdate}/> 
              <Route exact path={"/users"} component={UserList}/>
              <Route exact path={"/userRoleUpdate/:id"} component={UserUpdate}/> 
              <Route component={Error404} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;

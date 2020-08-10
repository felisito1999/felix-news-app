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
import ArticleDisplayByCategory from "./Components/ArticlesById.jsx";
import ArticleAdd from "./Components/ArticleAdd.jsx";
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
                path={"/"}
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
              <Route path={"/articleAdd"} component={ArticleAdd}/>
              <Route component={Error404} />
            </Switch>
          </div>
        </Router>
      </div>
    );
    // return (
    //   <div className="bg-secondary min-vh-100">
    //     <Router>
    //       <Navigationbar
    //         isUserLoggedIn={isUserLoggedIn}
    //         username={localStorage.getItem("UserName")}
    //         userFullName={"Félix Junior Pérez Peguero"}
    //       />
    //       <div className="container bg-dark min-vh-100" style={{ marginTop: 56 }}>
    //         <Switch>
    //           <Route exact path="/" component={ArticleDisplay}>
    //           </Route>
    //           <Route path="/about">
    //             <About />
    //           </Route>
    //           <Route exact path="/registration">
    //             {isUserLoggedIn ? <Redirect to="/"/> : <RegistrationForm />}
    //           </Route>
    //           <Route exact path="/login">
    //             {isUserLoggedIn ? <Redirect to="/" /> : <Login />}
    //           </Route>
    //           <Route path ="/:handle" component={ArticleView}/>
    //         </Switch>
    //       </div>
    //     </Router>
    //   </div>
    // );
  }
}
export default App;

import React, { Component } from "react";
import '../App';
import { Link } from "react-router-dom";

class Error404 extends Component {

  render() {
    return (
      <div className="container">
        <div className="row bg-secondary text-center">
          <div className="col-lg-6 offset-lg-3 col-sm-6 offset-sm-3 col-12 p-3 error-main">
            <div className="row">
              <div className="col-lg-8 col-12 col-sm-10 offset-lg-2 offset-sm-1">
                <h1 className="m-0">404</h1>
                <h6>Page not found</h6>
                <p>
                  <strong>Click here</strong> to go to the home page:
                </p>
                <Link className="btn btn-dark btn" to={"/"}>Home page</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Error404;
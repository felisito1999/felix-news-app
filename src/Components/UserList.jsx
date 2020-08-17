import React, { Component } from "react";
import {withRouter, Link} from "react-router-dom";
import axios from "axios";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };

    this.loadUsers = this.loadUsers.bind(this);
  }

  componentDidMount(){
      this.loadUsers();
  }

  loadUsers() {
    let data = {};

    let config = {
      method: "get",
      url: `https://newsappapi20200817171221.azurewebsites.net/api/User/GetAllUsers`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Session has expired, log in and try again");
          localStorage.clear();
          this.props.history.push("/login");
        }
      });
  }

  render(){
      return(
          <div>
              <table className="table table-dark">
                  <thead>
                      <tr>
                          <th>Email</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.state.users.map((user, item) => (
                          <tr key={item}>
                            <td>
                                {user.Email}
                            </td>
                            <td>
                                <Link className="btn btn-block btn-secondary" to={`/userRoleUpdate/${user.Id}`}>Edit role</Link>
                            </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      )
  }
}

export default withRouter(UserList);

import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.id,
      user: {},
      roles: [],
    };
    this.loadUser = this.loadUser.bind(this);
    this.loadRoles = this.loadRoles.bind(this);
    this.updateRole = this.updateRole.bind(this);
  }

  componentDidMount() {
    this.loadUser();
    this.loadRoles();
  }

  updateRole(event, id){

    event.preventDefault();

    let data = {};

    let config = {
        method : "put", 
        url : `https://newsappapi20200817171221.azurewebsites.net/api/User/UpdateUserRole?userId=${this.state.userId}&roleId=${id}`,
        headers : {
            Authorization : `Bearer ${localStorage.getItem("userToken")}`
        },
        data : data
    }

    axios(config)
    .then((response) => {
        this.props.history.push("/users")
    })
    .catch((error) => {
        if(error.response.status === 401){
            alert("Session expired, login and try again");
            localStorage.clear();
            this.props.history.psuh("/login");
        }
    })
  }

  async loadRoles() {
    let data = {};

    let config = {
      method: "get",
      url: `https://newsappapi20200817171221.azurewebsites.net/api/GetRolesNotInUser?id=${this.state.userId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      data: data,
    };

    await axios(config)
      .then((response) => {
        this.setState({ roles: response.data });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          alert("Session has expired, login and try again");
          localStorage.clear();
          this.props.history.push("/login");
        }
      });
  }

  async loadUser() {
    let data = {};

    let config = {
      method: "get",
      url: `https://newsappapi20200817171221.azurewebsites.net/api/User/GetById?id=${this.state.userId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      data: data,
    };

    await axios(config)
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Session has expired, login and try again");
          localStorage.clear();
          this.props.history.push("/login");
        }
      });
  }

  render() {
    return (
      <div >
        <div className="table table-dark">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Select new role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.user.Email}</td>
                <td>
                  {this.state.roles.map((role, item) => (
                    <button key={item} onClick={(event) => {this.updateRole(event, role.Id)}} className="btn btn-block btn-secondary">
                      {role.Name}
                    </button>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdateUser);

import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import qs from "qs";

class HiddenArticlesTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hiddenArticles: [],
    };
    this.loadHiddenArticles = this.loadHiddenArticles.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
  }

  componentDidMount() {
    this.loadHiddenArticles();
  }

  deleteArticle(event, id){
    event.preventDefault()

    let data = {};

    let config = {
        method : "delete",
        url : `https://newsappapi20200817171221.azurewebsites.net/api/Articles/deleteArticle?id=${id}`,
        headers : {
            Authorization : `Bearer ${localStorage.getItem("userToken")}`
        },
        data : data
    }

    axios(config)
    .then((response) => {
      this.loadHiddenArticles();
    })
    .catch((error) => {
      if(error.response.status === 401){
          alert("Session has expired, login and try again");
          localStorage.clear();
          this.props.history.push("/login");
      }
    })
}

  async handlePublish(event, articleId) {
    event.preventDefault();

    let data = qs.stringify({});

    let config = {
      method: "put",
      url: `https://newsappapi20200817171221.azurewebsites.net/api/Articles/PublishArticle/?articleId=${articleId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      data: data,
    };

    await axios(config)
      .then((response) => {
        this.loadHiddenArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async loadHiddenArticles() {
    let data = {};

    let config = {
      method: "get",
      url: "https://newsappapi20200817171221.azurewebsites.net/api/Articles/GetUnpublishedArticles",
      headers: {
          Authorization : `Bearer ${localStorage.getItem("userToken")}`
      },
      data: data,
    };

    await axios(config)
      .then((response) => {
        console.log(response.data);
        this.setState({ hiddenArticles: response.data });
        console.log("me cargué");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <table className="table table-responsive table-dark">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date created</th>
              <th>Created by</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.hiddenArticles.map((article, item) => (
              <tr key={item}>
                <td>{article.Title}</td>
                <td>{article.CreatedAt}</td>
                <td>Example user</td>
                <td>
                  <button
                    className="btn btn-secondary btn-block"
                    onClick={(event) => {
                      this.handlePublish(event, article.ArticleId);
                    }}
                  >
                    Publish
                  </button>
                  <Link className="btn btn-block btn-secondary" to={`/articleUpdate/${article.ArticleId}`}>Edit</Link>
                  <button className="btn block btn-secondary" onClick={(event) => {this.deleteArticle(event, article.ArticleId)}}>Delete</button>
                  <button
                    className="btn btn-secondary btn-block"
                    onClick={(event) => {
                      this.props.handleModalShow(
                        event,
                        true,
                        article.ArticleId
                      );
                    }}
                  >
                    Preview
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default withRouter(HiddenArticlesTable);

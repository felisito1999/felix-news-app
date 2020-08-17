import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

class PublishedArticlesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      totalPages: 0,
      pageSize: 6,
      pageCount: 1,
    };
    this.loadPublishedArticles = this.loadPublishedArticles.bind(this);
    this.handleHideArticle = this.handleHideArticle.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  componentDidMount() {
    this.loadPublishedArticles();
  }

  deleteArticle(event, id) {
    event.preventDefault();

    let data = {};

    let config = {
      method: "delete",
      url: `https://newsappapi20200817171221.azurewebsites.net/api/Articles/deleteArticle?id=${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        this.loadPublishedArticles();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Session has expired, login and try again");
          localStorage.clear();
          this.props.history.push("/login");
        }
      });
  }

  handleHideArticle(event, id) {
    event.preventDefault();

    let data = {};

    let config = {
      method: "put",
      url: `https://newsappapi20200817171221.azurewebsites.net/api/UnpublishArticle?id=${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        this.loadPublishedArticles();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("The session has expired, login and try again");
          localStorage.clear();
          this.props.history.push("/login");
        }
      });
  }

  handleShowMore(event) {
    event.preventDefault();
    if (this.state.pageCount < this.state.totalPages) {
      this.setState({ pageCount: this.state.pageCount + 1 }, () => {
        if (this.state.searchCriteria) {
          if (this.state.articles.length > 0) {
            this.setState({ loadingMore: true });
          }
          this.getArticlesByTitle(this.state.searchCriteria);
        } else {
          if (this.state.articles.length > 0) {
            this.setState({ loadingMore: true });
          }
          this.loadPublishedArticles();
        }
      });
    }
  }

  async loadPublishedArticles() {
    let data = "";

    let config = {
      method: "get",
      url: `/api/GetArticles?pageNumber=${this.state.pageCount}&pageSize=${this.state.pageSize}`,
      headers: {},
      data: data,
    };

    await axios(config)
      .then((response) => {
        let newArticles;

        if (this.state.pageCount > 1) {
          newArticles = [...this.state.articles];
          if (response.data.items.length > 0) {
            response.data.items.forEach((element) => {
              newArticles.push(element);
            });
          }
        } else {
          newArticles = response.data.items;
        }
        this.setState({ articles: newArticles });
        this.setState({ totalPages: response.data.totalPages });
        console.log(response.data);
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
            {this.state.articles.map((article, item) => (
              <tr key={item}>
                <td>{article.Title}</td>
                <td>{article.CreatedAt}</td>
                <td>Example user</td>
                <td>
                  <button
                    className="btn btn-secondary btn-block"
                    onClick={(event) => {
                      this.handleHideArticle(event, article.ArticleId);
                    }}
                  >
                    Hide article
                  </button>
                  {/* <button
                    className="btn btn-secondary btn-block"
                    onClick={(event) => {
                      this.handleHideArticle(event, article.ArticleId);
                    }}
                  >Edit
                  </button> */}
                  <Link
                    className="btn btn-block btn-secondary"
                    to={`/articleUpdate/${article.ArticleId}`}
                  >
                    Edit article
                  </Link>
                  <button
                    className="btn btn-secondary btn-block"
                    onClick={(event) => {
                      this.deleteArticle(event, article.ArticleId);
                    }}
                  >
                    Delete
                  </button>
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

        <div>
          <button
            onClick={this.handleShowMore}
            className="btn text-center btn-block btn-secondary"
          >
            Show more
          </button>
        </div>
      </>
    );
  }
}

export default withRouter(PublishedArticlesTable);

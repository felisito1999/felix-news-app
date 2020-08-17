import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class ArticleDisplayByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: this.props.match.params.id,
      articles: [],
      searchCriteria: "",
      loading: true,
      loadingMore: false,
      notFound: false,
      pageSize: 6,
      pageCount: 1,
      totalPages: 0,
      categoryName: "",
    };

    this.getArticlesByCategory = this.getArticlesByCategory.bind(this);
    this.getArticlesByCategoryAndTitle = this.getArticlesByCategoryAndTitle.bind(
      this
    );
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
    this.getCategory = this.getCategory.bind(this);
  }

  componentDidMount() {
    this.getArticlesByCategory();
    this.getCategory(this.state.categoryId);
  }

  async getCategory(id) {
    let config = {
      method: "get",
      url: `https://newsappapi20200817171221.azurewebsites.net/api/Category/${id}`,
      headers: {},
    };
    await axios(config)
      .then((response) => {
        console.log(response.data);
        this.setState({ categoryName: response.data.Name });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getArticlesByCategory() {
    let config = {
      method: "get",
      url: `https://newsappapi20200817171221.azurewebsites.net/api/Articles/GetAllArticlesByCategory?categoryId=${this.state.categoryId}&pageNumber=${this.state.pageCount}&pageSize=${this.state.pageSize}`,
      headers: {},
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
        this.setState({ loading: false });
        this.setState({ loadingMore: false });
        this.setState({ notFound: false });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getArticlesByCategoryAndTitle(title) {
    let config = {
      method: "get",
      url: `https://newsappapi20200817171221.azurewebsites.net/api/Articles/GetAllArticlesByCategoryAndTitle?categoryId=${this.state.categoryId}&title=${title}&pageNumber=${this.state.pageCount}&pageSize=${this.state.pageSize}`,
      headers: {},
    };

    await axios(config)
      .then((response) => {
        if (this.state.pageCount === 1) {
          this.setState({ articles: response.data.items });
          let totalPages = response.data.totalPages;
          this.setState({ totalPages: totalPages });
          this.setState({ loading: false });
          this.setState({ loadingMore: false });
          if (response.data.items.length === 0) {
            this.setState({ notFound: true });
          } else {
            this.setState({ notFound: false });
          }
        } else {
          let newArticles;
          newArticles = [...this.state.articles];
          if (response.data.items.length > 0) {
            response.data.items.forEach((element) => {
              newArticles.push(element);
            });
          }

          this.setState({ articles: newArticles });

          this.setState({ totalPages: response.data.totalPages });
          this.setState({ loading: false });
          this.setState({ loadingMore: false });
          if (response.data.items.length === 0) {
            this.setState({ notFound: true });
          } else {
            this.setState({ notFound: false });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleSearchChange(event) {
    event.preventDefault();

    this.setState({ searchCriteria: event.target.value }, () => {
      if (this.state.pageCount !== 1) {
        this.setState({ pageCount: 1 });
      }

      if (this.state.searchCriteria) {
        this.setState({ loading: true });
        this.getArticlesByCategoryAndTitle(this.state.searchCriteria);
      } else {
        this.setState({ articles: [] }, () => {
          this.setState({ loading: true });
          this.setState({ searchCriteria: "" });
          this.getArticlesByCategory();
        });
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
          this.getArticlesByCategoryAndTitle(this.state.searchCriteria);
        } else {
          if (this.state.articles.length > 0) {
            this.setState({ loadingMore: true });
          }
          this.getArticlesByCategory();
        }
      });
    }
  }

  render() {
    return (
      <div>
        <h1 className="text-center text-light">
          Here are the latest updates for: {this.state.categoryName}
        </h1>
        <hr className="bg-light" />
        <label className="text-light font-weight-bold mr-2" htmlFor="search">
          Search for a title:
        </label>
        <input
          className="form-control"
          name="search"
          id="search"
          type="text"
          placeholder="Title"
          onChange={this.handleSearchChange}
        />
        <hr className="bg-light" />
        {this.state.loading ? (
          <h4 className="text-center bg-secondary rounded p-5">Loading...</h4>
        ) : (
          <div>
            {this.state.notFound ? (
              <h4 className="text-center bg-secondary rounded p-5">
                No article was found for this criteria
              </h4>
            ) : (
              <div className="row">
                {this.state.articles.map((article, item) => (
                  <div key={item} className="col-12 col-sm-6 col-md-4">
                    <Card
                      className="mb-2"
                      bg="secondary"
                      key={article.ArticleId}
                    >
                      <Card.Img
                        variant="top"
                        src={`data:image/jpeg;base64,${article.MainImage}`}
                      />
                      <Card.Body>
                        <Card.Title className="text-light">
                          {article.Title}
                        </Card.Title>
                        <Card.Text className="text-light">
                          {article.Summary}
                        </Card.Text>
                        <Link
                          className="btn btn-block btn-dark"
                          to={`/articles/${article.ArticleId}`}
                        >
                          Go to the article
                        </Link>
                      </Card.Body>
                      <Card.Footer>
                        {article.Categories.map((category, item) => (
                          <Link
                            key={item}
                            className="nav-link text-light"
                            to={`/articles/byCategories/${category.CategoryId}`}
                          >
                            {category.Name}
                          </Link>
                        ))}
                      </Card.Footer>
                    </Card>
                  </div>
                ))}
                <div className="container">
                  {this.state.pageCount === this.state.totalPages ? (
                    <h4 className="text-center bg-secondary rounded p-5">
                      There are no more articles for this request...
                    </h4>
                  ) : this.state.loadingMore ? (
                    <h6 className="text-center bg-secondary rounded p-1">
                      Loading...
                    </h6>
                  ) : (
                    <button
                      className="btn btn-secondary btn-block"
                      id="show-more-button"
                      onClick={this.handleShowMore}
                    >
                      Show more
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default ArticleDisplayByCategory;

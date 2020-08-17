import React, { Component } from "react";
import axios from "axios";
import EditPreview from "./EditPreview.jsx";
// import { Tab, Tabs } from "react-bootstrap";
import qs from "qs";
import HiddenArticlesTable from "./HiddenArticles";
import PublishedArticlesTable from "./PublishedArticlesTable";
import { Route, Switch, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

class PublishArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unPublishedArticles: [],
      isModalShowing: false,
      selectedArticleId: 0,
    };
    this.loadUnPublishedArticles = this.loadUnPublishedArticles.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);
  }

  componentDidMount() {
    this.loadUnPublishedArticles();
  }

  handleModalShow(event, value, articleId) {
    if (event) {
      event.preventDefault();
    }
    this.setState(
      {
        selectedArticleId: articleId,
      },
      () => {
        this.setState({ isModalShowing: value });
      }
    );
  }

  async handlePublish(event, articleId) {
    event.preventDefault();

    let data = qs.stringify({});

    let config = {
      method: "post",
      url: `https://newsappapi20200817171221.azurewebsites.net/api/Articles/PublishArticle/?userId=b7ba64f8-9b22-4904-b6e1-0c173cd776ec&articleId=${articleId}`,
      headers: {},
      data: data,
    };

    await axios(config)
      .then((response) => {
        this.loadUnPublishedArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async loadUnPublishedArticles() {
    let data = qs.stringify({});

    let config = {
      method: "get",
      url: "https://newsappapi20200817171221.azurewebsites.net/api/articles/GetUnpublishedArticles",
      headers: {},
      data: data,
    };
    await axios(config)
      .then((response) => {
        this.setState({ unPublishedArticles: response.data });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.isModalShowing ? (
          <EditPreview
            show={true}
            articleId={this.state.selectedArticleId}
            handleModalShow={this.handleModalShow}
          />
        ) : null}
        <Nav justify variant="tabs" defaultActiveKey="/publishedArticles">
          <Nav.Item>
            <Link className="bg-secondary text-dark nav-link" to="/publishArticles/publishedArticles" eventKey="/publishedArticles">Published articles</Link>
          </Nav.Item>
          <Nav.Item>
            <Link  className="bg-secondary text-dark nav-link" to="/publishArticles/hiddenArticles" eventKey="/hiddenArticles">Unpublished articles</Link>
          </Nav.Item>
        </Nav>
        <Switch>
          <Route path={"/publishArticles/publishedArticles"}>
            <PublishedArticlesTable handleModalShow={this.handleModalShow} />
          </Route>
          <Route path={"/publishArticles/hiddenArticles"}>
            <HiddenArticlesTable handleModalShow={this.handleModalShow} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default PublishArticle;

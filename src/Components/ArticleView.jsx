import React, { Component } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

class ArticleView extends Component {
  constructor(props) {
    super(props);
    // let ArticleId;
    // if(typeof this.props.location.state == "undefined"){
    //   ArticleId = 0
    // }
    // else {
    //   ArticleId = this.props.location.state.ArticleId;
    // }
    this.state = {
      // ArticleId: ArticleId,
      Article: {},
      loading: true,
    };
    this.loadData = this.loadData.bind(this);
    this.buildArticleBody = this.buildArticleBody.bind(this);
  }
  async loadData() {
    var data = "";

    var config = {
      method: "get",
      url: "https://newsappapi20200817171221.azurewebsites.net/api/Articles/?id=" + this.props.match.params.id,
      headers: {},
      data: data,
    };

    await axios(config)
      .then((response) => {
        const article = response.data;
        this.setState({ Article: article });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.loadData();
    // this.buildArticleBody(this.state.Article.body);
  }
  componentDidUpdate() {

  }

  buildArticleBody() {
    // let articleBody = document.getElementById("articleBody");
    // articleBody.innerHTML = this.state.Article.body;
    // console.log("ready")
    console.log("ready");
    console.log(this.state.Article.body);
    return { __html: <p>hola</p> };
  }
  render() {
    if (this.state.Article.ArticleId === 0) {
      return (
        <div>
          <h1 className="text-light">La información no está disponible</h1>
        </div>
      );
    } else {
      return (
        <div>
          {this.state.loading ? (
            <h4 className="text-center bg-secondary rounded p-5">Loading...</h4>
          ) : (
            <div>
              <section className="pb-5">
                <h1 className="text-light">{this.state.Article.Title}</h1>
                <div className="text-center">
                  <img
                    className="img-fluid"
                    src={
                      "data:image/jpeg;base64," + this.state.Article.MainImage
                    }
                    style={{ maxWidth: "100%" }}
                    alt=""
                  />
                </div>
                <article
                  dangerouslySetInnerHTML={{
                    __html: this.state.Article.Body,
                  }}
                  id="articleBody"
                  className="text-light container pt-5 pb-5"
                ></article>
                <Link className="btn btn-secondary btn-block mb-5 " to={"/"}>Go back to home</Link>
              </section>
            </div>
          )}
        </div>
      );
    }
  }
}

export default ArticleView;

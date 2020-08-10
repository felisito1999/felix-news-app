import React, { Component } from "react";
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
      loading: true
    };
    this.loadData = this.loadData.bind(this);
  }
  loadData(){
    var data = "";

    var config = {
      method: "get",
      url: "/api/Articles/?id=" + this.props.match.params.id,
      headers: {},
      data: data,
    };

    axios(config)
      .then((response) => {
        const article = response.data;
        this.setState({ Article: article });
        this.setState({loading : false})
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.loadData();
  }
  render() {
    if(this.state.Article.ArticleId === 0){
      return(
        <div>
          <h1 className="text-light">La información no está disponible</h1>
        </div>
      )
    }
    else{
      return (
        <div>
          {this.state.loading ? (<h4 className="text-center bg-secondary rounded p-5">Loading...</h4>)  : (<div>
          <section>
            <h1 className="text-light">{this.state.Article.Title}</h1>
            <div className="text-center">
              <img
                className="img-fluid"
                src={"data:image/jpeg;base64," + this.state.Article.MainImage}
                style={{ maxHeight: 500, maxWidth: 500 }}
                alt=""
              />
            </div>
            <article className="text-light">{this.state.Article.Body}</article>
          </section>
        </div>)}
        </div>
      )
    }
  }
}


export default ArticleView;

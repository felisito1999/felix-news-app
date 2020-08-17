import React, { Component } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

class EditPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: this.props.articleId,
      article: {},
      isModalShowing: this.props.show,
    };
  }

  componentDidMount() {
    this.loadArticleData();
  }

  async loadArticleData() {
    let data = {};

    let config = {
      method: "get",
      url: `https://newsappapi20200817171221.azurewebsites.net/api/GetAllArticlesById?id=${this.state.articleId}`,
      headers: {},
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        this.setState({ article: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  render() {
    const styleImage = {
        maxWidth : "100%",
    }
    return (
      <Modal
        size="lg"
        show={this.state.isModalShowing}
        onHide={() => this.props.handleModalShow(null, false, null )}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {this.state.article.Title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={
                      "data:image/jpeg;base64," + this.state.article.MainImage
                    } alt=""
                style={styleImage}/>
          <article
            id="articleBody"
            dangerouslySetInnerHTML={{ __html: this.state.article.Body }}
          ></article>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditPreview;

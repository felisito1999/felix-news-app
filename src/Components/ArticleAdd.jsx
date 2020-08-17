import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ClassicEditor from "./CKEditor"
import axios from "axios";
import qs from "qs";
import { withRouter } from "react-router-dom";

class ArticleAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      summary: "",
      mainImage: "",
      body: "",
      categories: [],
      addCategories: [],
    };
    this.loadCategories = this.loadCategories.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleCreateArticle = this.handleCreateArticle.bind(this);
    this.handleMainImageOnChange = this.handleMainImageOnChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
  }
  async handleCreateArticle(event) {
    event.preventDefault();

    if (this.state.addCategories.length > 0 && this.state.body !== "") {
      let data = JSON.stringify({
        Title: this.state.title,
        Summary: this.state.summary,
        MainImage: Array.from(this.state.mainImage),
        UploadedUserId: "b7ba64f8-9b22-4904-b6e1-0c173cd776ec",
        CreatedAt: new Date().toLocaleString(),
        Body: this.state.body,
        Categories: this.state.addCategories,
      });

      let config = {
        method: "post",
        url: "https://newsappapi20200817171221.azurewebsites.net/api/Articles/AddPendingArticle",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        data: data,
      };

      await axios(config)
        .then((response) => {
          console.log(response.data);
          this.props.history.push("/");
        })
        .catch((error) => {
        
          if (error.response.status === 401) {
            alert("The session has expired, login and try again");
            localStorage.clear();
            this.props.history.push("/");
          }
        });
    } else {
      alert(
        "Could not insert article because some of the fields are not filled correctly"
      );
    }
  }
  handleMainImageOnChange(event) {
    event.preventDefault();

    let file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      var bytes = new Uint8Array(reader.result);
      console.log(bytes);
      this.setState({ mainImage: bytes });
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  }
  handleTitleChange(event) {
    event.preventDefault();
    this.setState({ title: event.target.value });
  }

  handleSummaryChange(event) {
    event.preventDefault();
    this.setState({ summary: event.target.value });
  }
  handleAddCategory(event, category) {
    event.preventDefault();
    let addedCategories = this.state.addCategories;
    let isAdded = false;

    addedCategories.forEach((element) => {
      if (element.CategoryId === category.CategoryId) {
        isAdded = true;
      }
    });

    if (isAdded) {
      addedCategories.filter((item) => item.CategoryId !== category.CategoryId);

      const removeindex = addedCategories
        .map((category) => category.CategoryId)
        .indexOf(category.CategoryId);

      removeindex >= 0 && addedCategories.splice(removeindex, 1);

      this.setState({ addCategories: addedCategories });
    } else {
      addedCategories.push(category);
      this.setState({ addCategories: addedCategories });
    }
    console.log(addedCategories);
  }
  async loadCategories() {
    let data = qs.stringify({});
    let config = {
      method: "get",
      url: "https://newsappapi20200817171221.azurewebsites.net/api/Category",
      headers: {},
      data: data,
    };

    await axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.setState({ categories: response.data.categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadCategories();
  }

  render() {
    return (
      <div>
        <div className="">
          <h1 className="text-light text-center">Article add manager</h1>
        </div>
        <hr className="bg-light" />
        <form className="bg-secondary p-3" onSubmit={this.handleCreateArticle}>
          <div className="form-group">
            <label htmlFor="article-title">Title:</label>
            <input
              type="text"
              name={"article-title"}
              placeholder={"Write the article title"}
              onChange={this.handleTitleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="article-summary">Summary:</label>
            <textarea
              className="form-control"
              onChange={this.handleSummaryChange}
              name="article-summary"
              placeholder="Write the summary here"
              id=""
              cols="30"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="article-main-image">Main image:</label>
            <input
              type="file"
              onChange={this.handleMainImageOnChange}
              className="form-control-file"
              name="article-main-image"
              id="article-main-image"
              required
            />
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="form-group">
                <label htmlFor="">Body:</label>
                <CKEditor
                  editor={ClassicEditor}
                  data="<p>Write the article here!</p>"
                  onInit={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    this.setState({ body: data });
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="jumbotron bg-secondary p-5">
                <h4>Categories:</h4>
                <hr />
                {this.state.categories.map((category, item) => (
                  <div key={item} className="form-check">
                    <input
                      type="checkbox"
                      name={`checkbox${category.CategoryId}`}
                      id={`checkbox${category.CategoryId}`}
                      className="form-check-input"
                      onInput={(event) => {
                        this.handleAddCategory(event, category);
                      }}
                    />
                    <label
                      htmlFor={`checkbock${category.CategoryId}`}
                      className="form-check-label"
                    >
                      {category.Name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="btn btn-dark btn-block" type="submit">
            Create article
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(ArticleAdd);

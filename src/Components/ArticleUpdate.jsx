import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class ArticleUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: this.props.match.params.id,
      article : {},
      title: "",
      summary: "",
      mainImage: [],
      body: "",
      categories: [],
      imageShow : []
    };
    this.loadOriginalData = this.loadOriginalData.bind(this);
    this.handleUpdateArticle = this.handleUpdateArticle.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.loadCategories = this.loadCategories.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.setOriginalCategories = this.setOriginalCategories.bind(this);
    this.handleMainImageChange = this.handleMainImageChange.bind(this);
    this.addCategories = []
  }

  //TODO: Add categories handling
  handleAddCategory(event, category) {
    event.preventDefault();
    let addedCategories = this.addCategories;
    let isAdded = false;

    this.addCategories.forEach((element) => {
      if (element.CategoryId === category.CategoryId) {
        isAdded = true;
      }
    });

    if (isAdded) {
      this.addCategories.filter((item) => item.CategoryId !== category.CategoryId);

      const removeindex = addedCategories
        .map((category) => category.CategoryId)
        .indexOf(category.CategoryId);

      removeindex >= 0 && addedCategories.splice(removeindex, 1);


    } else {
      this.addCategories.push(category);
    }
    console.log(this.addCategories)
  }

  async loadCategories(){

    let data = {};

    let config = {
      method : "get",
      url: "https://newsappapi20200817171221.azurewebsites.net/api/Category", 
      headers : {},
      data : data
    }

    await axios(config)
    .then((response) => {
      this.setState({categories : response.data.categories});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  async loadOriginalData(id) {
    let data = JSON.stringify({});

    let config = {
      method: "get",
      url: `https://newsappapi20200817171221.azurewebsites.net/api/GetAllArticlesById/?id=${id}`,
      headers: {},
      data: data,
    };

    await axios(config)
      .then((response) => {
  
        this.setState({ article: response.data });
        this.addCategories = response.data.Categories
        this.setState({ title: response.data.Title });
        this.setState({ summary: response.data.Summary });
        this.setState({ body: response.data.Body });
        this.setState({ mainImage: response.data.MainImage });
        this.setState({imageShow : response.data.MainImage})
        console.log(response.data.MainImage)
        this.setState({ title: response.data.Title });
        // this.setState({addCategories : response.data.Categories})
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleMainImageChange(event){
    event.preventDefault();

    let file = event.target.files[0];
    const reader = new FileReader();
;
    reader.onload = () => {
      var bytes = new Uint8Array(reader.result)
      console.log(bytes);
      this.setState({mainImage : Array.from(bytes)});

      this.setState({imageShow : btoa(String.fromCharCode.apply(null, bytes))});
      console.log(this.state.showImage)
    }

    if (file){
      reader.readAsArrayBuffer(file);
    }

    console.log(this.state.mainImage)
  }
  handleTitleChange(event) {
    event.preventDefault();

    this.setState({
      title: event.target.value,
    });
  }

  handleSummaryChange(event) {
    event.preventDefault();

    this.setState({
      summary: event.target.value,
    });
  }

  handleBodyChange(event) {
    event.preventDefault();

    this.setState({
      body: event.target.value,
    });
  }

  // verifyInAddedCategories(category){

  //   let addedCategories = this.state.article.Categories;
  //   let isAdded = false;

  //   addedCategories.forEach((element) => {
  //     if (element.CategoryId === category.CategoryId) {
  //       isAdded = true;

  //       // this.setState({addCategories : addCategories})
  //       // this.addToAddedCategories(element);
  //       this.addCategories.push(element);

  //     }
  //   });
  //   // this.setState({addCategories : addCategories});
  //   if(isAdded){
 
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }
  setOriginalCategories(category){

    // let addedCategories = this.addCategories; 
    let isAdded = false;

    this.addCategories.forEach((element) => {
      if(element.CategoryId === category.CategoryId){
        isAdded = true;
        // this.addCategories.push(element)
      }
    })

    if(isAdded){
      return true;
    }

  }

  handleCategoryChange(event) {
    event.preventDefault();
  }

  handleUpdateArticle(event) {
    event.preventDefault();

    let data = JSON.stringify({
      ArticleId : this.state.articleId, 
      Title : this.state.title,
      Summary : this.state.summary, 
      MainImage : this.state.mainImage,
      Body : this.state.body,
      Categories : this.addCategories
    })

    let config = {
      method : "put",
      url: "/api/Articles/UpdateArticle",
      headers : {
        "Content-Type" : "application/json"
      },
      data : data
    }

    axios(config)
    .then((response) => {
      this.props.history.push("/");
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.loadOriginalData(this.state.articleId);
    this.loadCategories();
  }

  render() {
    const styleImage = {
      width : "25%"
    }
    return (
      <div>
        <div className="">
          <h1 className="text-light text-center">Article Update manager</h1>
        </div>
        <hr className="bg-light" />
        <form className="bg-secondary p-3" onSubmit={this.handleUpdateArticle}>
          <div className="form-group">
            <label htmlFor="article-title">Title:</label>
            <input
              type="text"
              name={"article-title"}
              placeholder={"Write the article title"}
              onChange={this.handleTitleChange}
              className="form-control"
              value={this.state.title}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="article-summary">Summary:</label>
            <textarea
              className="form-control"
              onChange={this.handleSummaryChange}
              value={this.state.summary}
              name="article-summary"
              placeholder="Write the summary here"
              id=""
              cols="30"
              rows="3"
              required
            ></textarea>
          </div>
          <label htmlFor="">Main image: </label>
          <div className="form-group">
            <img
              src={"data:image/jpeg;base64," + this.state.imageShow}
              alt=""
              style={styleImage}
            />
          </div>
          <div className="form-group">
            <label htmlFor="article-main-image">Upload for a new main Image:</label>
            <input
              type="file"
              onChange={this.handleMainImageChange}
              className="form-control-file"
              name="article-main-image"
              id="article-main-image"
            />
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="form-group">
                <label htmlFor="">Body:</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={this.state.body}
                  onInit={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
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
              {/* {this.state.categories.map(
              ((category, item) => (<div className="form-check-input">
                <input type="checkbox" name={`checkbock${category.CategoryId}`} id={`checkbock${category.CategoryId}`} className="form-check-label"/>
            <label htmlFor={`checkbock${category.CategoryId}`} className="form-check-label">{category.Name}</label>
              </div>
              )} */}
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
                      defaultChecked={this.setOriginalCategories(category)}
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
            Update article
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(ArticleUpdate);

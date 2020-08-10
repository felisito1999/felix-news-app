import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

class ArticleAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      summary: "",
      mainImage: "",
      body: "",
      categories: [],
    };
  }

  render() {
    return (
      <div>
        <div className="">
            <h1 className="text-light text-center">Article add manager</h1>
        </div>
        <br/>
        <div className="col-md-6">
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
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
        </div>
        <div className="col-md-6">

        </div>
      </div>
    );
  }
}

export default ArticleAdd;

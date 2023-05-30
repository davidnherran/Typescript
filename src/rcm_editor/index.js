import React from "react";
// import { connect } from "react-redux";

import { uploadImagesRcmEditor } from "../test_rcm/api-akeportal";

import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import ImageResize from "quill-image-resize-module-react";
import MagicUrl from "quill-magic-url";
import "react-quill/dist/quill.snow.css";
import "./index.css";

class RcmEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.content,
      deletes: [],
      contentInitial: this.props.content,
      imageValidated: true,
    };

    this.handleChange = this.handleChange.bind(this);

    this.modules = {
      toolbar: {
        container: [
          [{ placeholder: this.props.varValues }], // my custom dropdown
          [{ placeholder2: this.props.anValues }], // my custom dropdown
          [{ placeholder3: this.props.dtValues }], // my custom dropdown
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote", "code-block"],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          this.props.image === "disabled" ? ["link"] : ["link", "image"],
          //[{ 'size': ['10px', '18px', '32px'] }], //si se habilita no usa line heights apropiados. ni idea por que.
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ["clean"], // remove formatting button
        ],
        handlers: {
          placeholder: function (value) {
            if (value) {
              const cursorPosition = this.quill.getSelection().index;
              this.quill.insertText(cursorPosition, value);
              this.quill.setSelection(cursorPosition + value.length);
            }
          },
          placeholder2: function (value) {
            if (value) {
              const cursorPosition = this.quill.getSelection().index;
              this.quill.insertText(cursorPosition, value);
              this.quill.setSelection(cursorPosition + value.length);
            }
          },
          placeholder3: function (value) {
            if (value) {
              const cursorPosition = this.quill.getSelection().index;
              this.quill.insertText(cursorPosition, value);
              this.quill.setSelection(cursorPosition + value.length);
            }
          },
        },
      },
      magicUrl: true,
      imageUploader: {
        upload: async (file) => {
          if (file.size > 5000000) {
            alert("El archivo es muy grande. El tamaño máximo es de 5MB");
            this.setState({ ...this.state, imageValidated: false });
          } else {
            this.setState({ ...this.state, imageValidated: true });
            const formData = new FormData();
            formData.append("file", file);
            // formData.append("userID", this.props.profile.USER_ID);
            formData.append("userID", "1003");
            return await uploadImagesRcmEditor(formData);
          }
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, contentInitial: this.state.value });

    const placeholderPickerItems = Array.prototype.slice.call(
      document.querySelectorAll(".ql-placeholder .ql-picker-item")
    );
    placeholderPickerItems.forEach(
      (item) => (item.textContent = item.dataset.value)
    );
    if (document.querySelector(".ql-placeholder .ql-picker-label")) {
      document.querySelector(".ql-placeholder .ql-picker-label").innerHTML =
        this.props.varTitle +
        " &nbsp;&nbsp;&nbsp;" +
        document.querySelector(".ql-placeholder .ql-picker-label").innerHTML;
    }

    const placeholderPickerItems2 = Array.prototype.slice.call(
      document.querySelectorAll(".ql-placeholder2 .ql-picker-item")
    );
    placeholderPickerItems2.forEach(
      (item, i) => (item.textContent = this.props.anLabels[i])
    );
    if (document.querySelector(".ql-placeholder2 .ql-picker-label")) {
      document.querySelector(".ql-placeholder2 .ql-picker-label").innerHTML =
        this.props.anTitle +
        " &nbsp;&nbsp;&nbsp;" +
        document.querySelector(".ql-placeholder2 .ql-picker-label").innerHTML;
    }

    const placeholderPickerItems3 = Array.prototype.slice.call(
      document.querySelectorAll(".ql-placeholder3 .ql-picker-item")
    );
    placeholderPickerItems3.forEach(
      (item, i) => (item.textContent = this.props.dtLabels[i])
    );
    if (document.querySelector(".ql-placeholder3 .ql-picker-label")) {
      document.querySelector(".ql-placeholder3 .ql-picker-label").innerHTML =
        this.props.dtTitle +
        " &nbsp;&nbsp;&nbsp;" +
        document.querySelector(".ql-placeholder3 .ql-picker-label").innerHTML;
    }
  }
  componentWillUnmount() {
    this.state.deletes.forEach(async (item) => {
      let imgIncludes = this.state.contentInitial.includes(item);
      if (imgIncludes) {
        return;
      } else {
        const formData = new FormData();
        formData.append("urlDelete", item);
        await uploadImagesRcmEditor(formData);
      }
    });
  }

  findDiff(str1, str2) {
    let diff = "";
    str2.split("").forEach(function (val, i) {
      if (val !== str1.charAt(i)) diff += val;
    });
    return diff;
  }

  async handleChange(val) {
    if (!this.state.imageValidated) return;
    if (val !== this.state.value) {
      let initialsImagesMatch = val.match(/<img.*?src="(.*?)">/g);
      let getSourceInitialImages = initialsImagesMatch?.map((img) =>
        img.match(/src="(.*?)"/g)[0].slice(5, -1)
      );

      let currentImagesMatch = this.state.value?.match(/<img.*?src="(.*?)">/g);
      let getSourceCurrentImages = currentImagesMatch?.map((img) =>
        img.match(/src="(.*?)"/g)[0].slice(5, -1)
      );
      let imagesIncludes = getSourceInitialImages?.filter((ini) =>
        getSourceCurrentImages?.filter((curr) => curr?.includes(ini))
      );
      let imagesNoIncludesInitial = getSourceCurrentImages?.filter(
        (item) => !imagesIncludes?.includes(item)
      );
      if (
        imagesNoIncludesInitial?.length > 0 &&
        imagesNoIncludesInitial[0]?.includes("http")
      ) {
        let newsUrls = Array.from(this.state.deletes);
        newsUrls.push(imagesNoIncludesInitial[0]);
        this.setState({ ...this.state, deletes: newsUrls });
      }
    }
    this.setState({ ...this.state, value: val });
    this.props.updateContent(val);
  }

  render() {
    let SizeStyle = Quill.import("attributors/style/size");
    let AlignStyle = Quill.import("attributors/style/align");
    Quill.register(SizeStyle, true);
    Quill.register(AlignStyle, true);
    Quill.register("modules/imageUploader", ImageUploader, true);
    Quill.register("modules/ImageResize", ImageResize, true);
    Quill.register("modules/magicUrl", MagicUrl, true);

    return (
      <div
        className="principal_rtf"
        onBlur={() =>
          this.props.handleOnBlur
            ? this.props.handleOnBlur(this.state.value)
            : null
        }
        onClick={(e) => {
          if (
            document
              .getElementsByClassName("ql-container ql-snow")[0]
              .childNodes[0].innerHTML.includes("<img")
          ) {
            this.props.updateContent(
              document.getElementsByClassName("ql-container ql-snow")[0]
                .childNodes[0].innerHTML
            );
          }
        }}
      >
        <ReactQuill
          className="quill_rtf"
          onChange={this.handleChange}
          modules={this.modules}
          theme={"snow"}
          value={this.state.value}
        />
      </div>
    );
  }
}
// const mapStateToProps = (state) => ({
//   profile: state.profile.profile,
// });
// export default connect(mapStateToProps)(RcmEditor);
export default RcmEditor;

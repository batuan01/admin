import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

const editorConfiguration = {
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "fontfamily",
      "fontsize",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "bold",
      "italic",
      "strikethrough",
      "subscript",
      "superscript",
      "code",
      "|",
      "link",
      "imageUpload",
      "blockQuote",
      "codeBlock",
      "|",
      "bulletedList",
      "numberedList",
      "todoList",
      "outdent",
      "indent",
      "|",
      "insertTable",
      "toggleImageCaption",
      "imageTextAlternative",
      "imageStyle:full",
      "imageStyle:side",
      "imageResize",
      "|",
      "alignment",
      "horizontalLine",
      "pageBreak",
      "|",
      "removeFormat",
      "|",
      "indent",
      "outdent",
      "|",
      "highlight",
    ],
    shouldNotGroupWhenFull: false,
  },
};

const CustomEditor = ({ content, setContent, height }) => {
  return (
    <div>
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
        onReady={(editor) => {
          if (height) {
            editor.ui.view.editable.element.style.minHeight = `${height}px`;
          }
        }}
      />
    </div>
  );
};

export default CustomEditor;

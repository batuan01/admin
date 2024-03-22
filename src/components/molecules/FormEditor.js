import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

export const CustomEditor = ({ content, setContent }) => {
  return (
    <div>
      {/* <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      /> */}
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />
    </div>
  );
};

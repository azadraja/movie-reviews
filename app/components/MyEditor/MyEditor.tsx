"use client";

import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import { EditorState, convertToRaw } from "draft-js";
import gql from "graphql-tag";
import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// const emptyContentState = convertFromRaw({
//   entityMap: {},
//   blocks: [
//     {
//       text: "",
//       key: "foo",
//       type: "unstyled",
//       entityRanges: [],
//       depth: 0,
//       inlineStyleRanges: [],
//       data: {},
//     },
//   ],
// });

const createCommentMutation = gql`
  mutation Mutation($movieId: Int!, $content: JSON!, $author: String!) {
    createComment(movieId: $movieId, content: $content, author: $author) {
      id
      movieId
      content
      author
      createdAt
      updatedAt
    }
  }
`;

const MyEditor = ({
  movieId,
  refetch,
}: {
  movieId: number;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
}) => {
  const [createComment, { data, loading, error }] = useMutation(
    createCommentMutation
  );
  const [author, setAuthor] = React.useState("");
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  React.useEffect(() => {
    refetch();
  }, [data, refetch]);

  const handleSubmit = () => {
    if (!author || editorState.getCurrentContent().isEmpty()) return;
    createComment({
      variables: {
        movieId: movieId,
        author: author,
        content: convertToRaw(editorState.getCurrentContent()),
      },
    });
    setEditorState(EditorState.createEmpty());
    setAuthor("");
  };

  return (
    <div className="App">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          options: ["inline", "list", "textAlign"],
        }}
      />
      <label>
        Author:
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          name="author"
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MyEditor;

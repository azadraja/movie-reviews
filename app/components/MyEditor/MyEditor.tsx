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
import styles from "./MyEditor.module.css";

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
  const [isToolbarHidden, setIsToolbarHidden] = React.useState(true);
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
    <div className={styles.container}>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        placeholder="Add a comment"
        toolbarHidden={isToolbarHidden}
        onFocus={() => setIsToolbarHidden(false)}
        onBlur={() => setIsToolbarHidden(true)}
        toolbar={{
          options: ["inline", "list", "textAlign"],
        }}
      />
      <input
        className={styles.author_input}
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        name="author"
        placeholder="Author"
      />
      <div className="flex justify-center items-center mt-5">
        <button className={styles.button} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default MyEditor;

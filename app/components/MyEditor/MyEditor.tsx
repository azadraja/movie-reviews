"use client";

import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import gql from "graphql-tag";
import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./MyEditor.module.css";
import { setegid } from "process";

const updateCommentMutation = gql`
  mutation Mutation(
    $id: Int!
    $movieId: Int!
    $content: JSON!
    $author: String!
  ) {
    updateComment(
      id: $id
      movieId: $movieId
      content: $content
      author: $author
    ) {
      id
      movieId
      content
      author
      createdAt
      updatedAt
    }
  }
`;

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
  setEdit,
  editData,
}: {
  movieId: number;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
  editData: any;
  setEdit: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [isToolbarHidden, setIsToolbarHidden] = React.useState(true);
  const [createComment, { data, loading, error }] = useMutation(
    createCommentMutation
  );

  const [
    updateComment,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(updateCommentMutation);

  const [author, setAuthor] = React.useState("");
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  React.useEffect(() => {
    refetch();
  }, [data, refetch]);

  React.useEffect(() => {
    if (!editData || !editData.content) return;
    console.log(editData);
    let newState = convertFromRaw(editData?.content || "{}");
    setEditorState(EditorState.createWithContent(newState));
    setAuthor(editData.author);
  }, [editData]);

  const handleSubmit = () => {
    if (!author || editorState.getCurrentContent().isEmpty()) return;
    if (editData?.id) {
      updateComment({
        variables: {
          id: parseInt(editData.id),
          movieId: editData.movieId,
          content: convertToRaw(editorState.getCurrentContent()),
          author: author,
        },
      });
    } else {
      createComment({
        variables: {
          movieId: movieId,
          author: author,
          content: convertToRaw(editorState.getCurrentContent()),
        },
      });
    }
    setEdit(null);
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

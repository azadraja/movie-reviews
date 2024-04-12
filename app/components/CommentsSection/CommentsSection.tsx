"use client";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import DOMPurify from "dompurify";
import draftToHtml from "draftjs-to-html";
import gql from "graphql-tag";
import MyEditor from "../MyEditor/MyEditor";
import styles from "./CommentsSection.module.css";

type comment = {
  id: number;
  movieId: number;
  content: any;
  author: string;
  createdAt: string;
  updatedAt: string;
};

// Format the date string
const formattedDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

type Data = {
  comments: Array<comment>;
};

// updateComment(id: ID!, movieId: Int!, content: JSON!, author: String!): Comment!

const deleteCommentMutation = gql`
  mutation Mutation($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

const commentsQuery = gql`
  query Query($movieId: Int!) {
    comments(movieId: $movieId) {
      id
      movieId
      content
      author
      createdAt
      updatedAt
    }
  }
`;

const CommentsSection = ({ movieId }: { movieId: number }) => {
  const { data, loading, error, refetch } = useQuery(commentsQuery, {
    variables: { movieId: movieId },
  });

  const [
    deleteComment,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(deleteCommentMutation);

  const [edit, setEdit] = React.useState();

  const handleEdit = (data: any) => {
    console.log(data);
    setEdit(data);
  };

  React.useEffect(() => {
    refetch();
  }, [deleteData]);

  const handleDelete = (id: number) => {
    if (!id) return;
    deleteComment({ variables: { id: parseInt(id + "") } });
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className={styles.commentsContainer}>
      <h1 className="text-2xl text-zinc-950">Comments</h1>
      <div className="flex flex-col gap-5">
        {(data?.comments ?? []).map((e: comment) => {
          let sanitizedData;
          try {
            sanitizedData = () => ({
              __html: DOMPurify.sanitize(
                draftToHtml(JSON.parse(JSON.stringify(e.content)))
              ),
            });
          } catch (error) {}

          return (
            <div className={styles.eachCommentContainer} key={e.id}>
              {`${e.author} says...`}
              <div
                className={styles.actualComment}
                dangerouslySetInnerHTML={
                  sanitizedData ? sanitizedData() : undefined
                }
              />
              <div className={styles.date}>
                {`at ${formattedDate(new Date(parseInt(e.updatedAt)))}`}
                <div>
                  <button onClick={() => handleEdit(e)}>✏️</button>
                  <button onClick={() => handleDelete(e.id)}>🗑️</button>
                  <button className={styles.replyButton}>Reply</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <MyEditor
        setEdit={setEdit}
        editData={edit}
        refetch={refetch}
        movieId={movieId}
      />
    </div>
  );
};

export default CommentsSection;

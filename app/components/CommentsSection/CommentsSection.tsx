"use client";
import client from "@/lib/apollo-client";
import DOMPurify from "dompurify";
import { useQuery } from "@apollo/client";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
// import { getClient } from "@/lib/apollo-client";
type comment = {
  id: number;
  movieId: number;
  content: any;
  author: string;
  createdAt: string;
  updatedAt: string;
};

type Data = {
  comments: Array<comment>;
};

import gql from "graphql-tag";
import MyEditor from "../MyEditor/MyEditor";

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

  console.log(data, "picard", loading, error, movieId);
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex w-full flex-col gap-4">
      {data.comments.map((e: comment) => {
        let sanitizedData;
        try {
          sanitizedData = () => ({
            __html: DOMPurify.sanitize(
              draftToHtml(JSON.parse(JSON.stringify(e.content)))
            ),
          });
        } catch (error) {}

        return (
          <div className="commentsContainer text-zinc-950 text-lg" key={e.id}>
            {e.author}
            <div
              className="actualComment border border-solid border-black"
              dangerouslySetInnerHTML={
                sanitizedData ? sanitizedData() : undefined
              }
            />
          </div>
        );
      })}
      <MyEditor refetch={refetch} movieId={movieId} />
    </div>
  );
};

export default CommentsSection;

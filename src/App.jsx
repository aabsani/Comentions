/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Comment from "./components/Comment";
import Reply from "./components/Reply";
import data from "../data/data.json";

function App() {
  const [comments, setComments] = useState([]);

  function handleAddComment(comment) {
    setComments((newReply) => [...newReply, comment]);
  }

  const handleEditComment = (itemId, newContent, isComment) => {
    const updatedData = comments.map((comment) => {
      if (isComment && comment.id === itemId) {
        // Update the content of the comment
        return { ...comment, content: newContent };
      } else if (!isComment) {
        // If it's a reply, find and update the relevant reply content
        const updatedReplies = comment.replies.map((reply) =>
          reply.id === itemId ? { ...reply, content: newContent } : reply
        );
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });

    setComments(updatedData);
  };

  function handleAddReply(newReply, parentCommentId, parentReplyId) {
    setComments((prevComments) => {
      const updatedComments = prevComments.map((comment) => {
        // Check if the current comment matches the parentCommentId
        if (comment.id === parentCommentId) {
          // If parentReplyId is provided, find the parent reply
          if (parentReplyId) {
            const updatedReplies = comment.replies.map((reply) => {
              // Check if the current reply matches the parentReplyId
              if (reply.id === parentReplyId) {
                // Add the new reply to the replies array of the parent reply
                return {
                  ...reply,
                  replies: [...(reply.replies || []), newReply],
                };
              }
              return reply;
            });
            // Return the updated comment with modified replies
            return {
              ...comment,
              replies: updatedReplies,
            };
          } else {
            // If parentReplyId is not provided, add the new reply to the comment's replies array
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          }
        }
        return comment;
      });
      return updatedComments;
    });
  }

  function handleDelete(id, isComment) {
    // delete comment
    if (isComment) {
      setComments((comments) =>
        comments.filter((comment) => comment.id !== id)
      );
    }

    // delete reply
    if (!isComment) {
      setComments((comments) =>
        comments.map((comment) => ({
          ...comment,
          replies: comment.replies.filter((reply) => reply.id !== id),
        }))
      );
      // replies are nested inside comments, that is why we need to assign new replies in each iteration to update the state
    }
  }

  useEffect(function () {
    setComments(data.comments);
  }, []);

  return (
    <div>
      <Comment
        comments={comments}
        onAdd={handleAddReply}
        onEdit={handleEditComment}
        onDelete={handleDelete}
      />
      <Reply onAdd={handleAddComment} />
    </div>
  );
}

export default App;

/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Comment from "./components/Comment";
import Reply from "./components/Reply";

function App() {
  const [comments, setComments] = useState([]);
  const BASE_URL = "http://localhost:8000";

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

  // ****** same as above but different implementation ******* //

  // function handleEditComment(itemId, newContent, isComment) {
  //   setComments((comments) =>
  //     comments.map((comment) => {
  //       if (isComment && comment.id === itemId) {
  //         return { ...comment, content: newContent };
  //       }
  //       if (!isComment) {
  //         return {
  //           ...comment,
  //           replies: comment.replies.map((reply) =>
  //             reply.id === itemId ? { ...reply, content: newContent } : reply
  //           ),
  //         };
  //       }
  //       return comment;
  //     })
  //   );
  // }

  // function handleAddReply(newReply, parentCommentId, parentReplyId) {
  //   setComments((prevComments) => {
  //     const updateComments = [...prevComments];

  //     // Recursive function to find the parent comment or parent reply
  //     const findParentItem = (items, targetId) => {
  //       for (const item of items) {
  //         if (item.id === targetId) {
  //           return item;
  //         }
  //         if (item.replies) {
  //           const parentItem = findParentItem(item.replies, targetId);
  //           if (parentItem) {
  //             return parentItem;
  //           }
  //         }
  //       }
  //       return null;
  //     };

  //     // Find the parent item (either comment or reply)
  //     const parentItem = findParentItem(
  //       updateComments,
  //       parentReplyId || parentCommentId
  //     );

  //     // Add the new reply to the parent item's replies array
  //     if (parentItem) {
  //       parentItem.replies = parentItem.replies || [];
  //       parentItem.replies.push(newReply);
  //     } else {
  //       // If parent item is not found, add it to the top level comments
  //       updateComments.push(newReply);
  //     }

  //     return updateComments;
  //   });
  // }

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
    async function fetchComments() {
      try {
        const res = await fetch(`${BASE_URL}/comments`);
        const data = await res.json();
        setComments(data);
      } catch (error) {
        alert("There was an error fetching the data");
        console.error(error);
      }
    }
    fetchComments();
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

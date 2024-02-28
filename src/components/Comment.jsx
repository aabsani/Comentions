import { useState } from "react";
import Reply from "./Reply";
import RepliesList from "./RepliesList";
import CommentsItem from "./CommentsItem";

/* eslint-disable react/prop-types */

function Comment({ comments, onAdd, onEdit, onDelete }) {
  const [commentsReplyId, setCommentsReplyId] = useState(null);

  // managing state for toggling comment's replying box
  function toggleReplyBox(commentId) {
    setCommentsReplyId(commentId === commentsReplyId ? null : commentId);
  }

  return (
    <div className="comments-box">
      <ul className="comments-list">
        {comments?.map((comment) => (
          <ul key={comment.id}>
            <CommentsItem
              onEdit={onEdit}
              onToggleReplyBox={() => toggleReplyBox(comment.id)}
              comment={comment}
              isComment={true}
              onDelete={onDelete}
              key={comment.id}
            />
            {/* toggle reply box for existing comments */}
            {comment.id === commentsReplyId && (
              <Reply
                btnText="Reply"
                onAdd={onAdd}
                parentCommentId={comment.id}
                onSetReplyBox={setCommentsReplyId}
              />
            )}

            <RepliesList
              replies={comment.replies}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
              parentCommentId={comment.id}
              parentReplyId={comment.replies.id}
            />
          </ul>
        ))}
      </ul>
    </div>
  );
}

export default Comment;

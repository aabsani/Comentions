/* eslint-disable react/prop-types */
import { useState } from "react";
import React from "react";
import CommentsItem from "./CommentsItem";
import Reply from "./Reply";

function RepliesList({
  replies,
  onAdd,
  onEdit,
  onDelete,
  parentCommentId,
  parentReplyId,
}) {
  const [replyBoxId, setReplyBoxId] = useState(null);

  // managing state for toggling the reply's commenting box
  function toggleReplyBox(replyId) {
    setReplyBoxId(replyId === replyBoxId ? null : replyId);
  }

  return (
    <ul className="replies-list">
      {replies.map((reply) => (
        // using react.fragment so React can uniquely render components with keys
        <React.Fragment key={reply.id}>
          <CommentsItem
            onEdit={onEdit}
            onDelete={onDelete}
            comment={reply}
            isComment={false}
            onToggleReplyBox={() => toggleReplyBox(reply.id)}
            key={reply.id}
          />
          {/* toggle reply box for child reply comments */}
          {reply.id === replyBoxId && (
            <Reply
              btnText="Reply"
              onAdd={onAdd}
              parentReplyId={parentReplyId}
              // parentReplyId = {reply.id}
              parentCommentId={parentCommentId}
              onSetReplyBox={setReplyBoxId}
            />
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}

export default RepliesList;

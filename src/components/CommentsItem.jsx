/* eslint-disable react/prop-types */
import { useState } from "react";
import Edit from "./Edit";

function CommentsItem({
  comment,
  onToggleReplyBox,
  onEdit,
  isComment,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    createdAt,
    content,
    score,
    user: { username, image },
  } = comment;
  const { png } = image;

  const [scoreRating, setScoreRating] = useState(score);

  if (!comment) {
    return <div>Loading...</div>;
  }

  function toggleEdit() {
    setIsEditing((edit) => !edit);
  }

  function handleEdit(editContent) {
    onEdit(comment.id, editContent, isComment);
    // close edit box after submitting update
    toggleEdit();
  }

  function handleDelete() {
    // isComment is true inside the <Comment /> and false inside <RepliesList />
    onDelete(comment.id, isComment);
  }

  return (
    <li>
      <div className="comment-items">
        <div className="rating">
          <button
            className="btn-rate upvote"
            onClick={() => setScoreRating(scoreRating + 1)}
          >
            <img src="./images/icon-plus.svg" alt="plus" />
          </button>
          <strong>
            <p className="score">{scoreRating}</p>
          </strong>
          <button
            className="btn-rate downvote"
            onClick={() => {
              if (scoreRating > 0) setScoreRating(scoreRating - 1);
            }}
          >
            <img src="./images/icon-minus.svg" alt="minus" />
          </button>
        </div>
        <div className="header">
          <img className="profileimg" src={png} alt="profile-picture" />
          <p className="username">
            {username}
            {username === "juliusomo" ? (
              <span className="user-indicator">you</span>
            ) : (
              ""
            )}
          </p>

          <p>{createdAt}</p>

          <div className="replybtn-box">
            {/* show edit and delete button for current user comments/replies */}
            {username === "juliusomo" ? (
              <>
                <img src="./images/icon-delete.svg" alt="delete-icon" />
                <button className="btn" onClick={handleDelete}>
                  Delete
                </button>
                <img src="./images/icon-edit.svg" alt="edit-icon" />
                <button className="btn" onClick={toggleEdit}>
                  Edit
                </button>
              </>
            ) : (
              // show reply button for other user comments
              <>
                <img src="./images/icon-reply.svg" alt="reply-icon" />
                <button className="btn btn-reply" onClick={onToggleReplyBox}>
                  Reply
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* conditionally render edit box or comment box */}
      <div className="content">
        {isEditing ? (
          <Edit
            comment={comment}
            onIsEditing={toggleEdit}
            onEdit={handleEdit}
          />
        ) : (
          content
        )}
      </div>
    </li>
  );
}

export default CommentsItem;

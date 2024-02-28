/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

function Reply({
  btnText = "Send",
  onAdd,
  parentCommentId,
  parentReplyId,
  onSetReplyBox,
  textareaRef,
}) {
  // initialise userComment as null to prevent initialising userComment as undefined data
  const [userComment, setUserComments] = useState(null);
  const [content, setContent] = useState("");

  const isValidComment = content.length > 3;

  // console.log("this is the parent reply id: ", parentReplyId);
  // console.log("this is the parent comment id: ", parentCommentId);

  const BASE_URL = "http://localhost:8000";

  const id = crypto.randomUUID();
  const createdAt = new Date().toLocaleDateString();

  function handleAdd() {
    const newReply = {
      id,
      createdAt,
      content,
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      replies: [],
    };

    // add a reply to existing reply
    if (parentReplyId) onAdd(newReply, parentCommentId, parentReplyId);
    // add a reply to existing comment
    if (parentCommentId) onAdd(newReply, parentCommentId, parentReplyId);
    // add new comment
    onAdd(newReply);

    // clear text from textbox
    setContent("");

    // close reply box after sending comment
    if (onSetReplyBox) onSetReplyBox(null);
  }

  useEffect(function () {
    async function fetchComments() {
      try {
        const res = await fetch(`${BASE_URL}/currentUser`);
        const data = await res.json();
        setUserComments(data);
      } catch (error) {
        alert("There was an error fetching the data");
        console.error(error);
      }
    }
    fetchComments();
  }, []);

  const png = userComment ? userComment.image.png : null;

  return (
    <div className="reply-input">
      <img className="profileimg" src={png} alt="profile-picture" />
      <textarea
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        value={content}
        ref={textareaRef}
        rows="3"
        cols="20"
      ></textarea>
      <button
        disabled={!isValidComment}
        className="btn btn-send"
        onClick={handleAdd}
      >
        {btnText}
      </button>
    </div>
  );
}

export default Reply;

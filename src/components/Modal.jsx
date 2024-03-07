/* eslint-disable react/prop-types */
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { useEffect } from "react";

function Modal({ onDelete, commentId, isComment, toggleModal }) {
  useLockBodyScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  function handleDelete() {
    // isComment is true inside the <Comment /> and false inside <RepliesList />
    onDelete(commentId, isComment);
  }

  return (
    <div className="modal">
      <div className="modal-card">
        <h3 className="modal-title">Delete Comment</h3>
        <p className="modal-content">
          Are you sure you want to delete this comment?
        </p>
        <div className="modal-actions">
          <button className="modalbtn cancel" onClick={toggleModal}>
            No, cancel
          </button>
          <button className="modalbtn confirm" onClick={handleDelete}>
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

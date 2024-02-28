/* eslint-disable react/prop-types */
import { useState } from "react";

function Edit({ comment, onIsEditing, onEdit }) {
  const [editContent, setEditContent] = useState(comment.content);

  return (
    <div>
      <textarea
        cols="20"
        rows="3"
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
      ></textarea>
      <div className="btn-edit-container">
        <button onClick={onIsEditing} className="btn btn-send btn-edit">
          Cancel
        </button>
        <button
          onClick={() => onEdit(editContent)}
          className="btn btn-send btn-edit"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default Edit;

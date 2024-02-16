import React from 'react'

function ViewComments({comments}) {
  return (
    <div className="comment-list">
            {comments.slice().reverse().map((comment, index) => (
                <div key={index} className="comment-item">
                    <div className="comment-header">
                        <strong>{comment.commentator}</strong>
                        <span className="comment-timestamp">{comment.timestamp}</span>
                    </div>
                    <div className="comment-text">{comment.comment}</div>
                </div>
            ))}
        </div>
  )
}

export default ViewComments
import React, { useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DataState from '../DataState';
import { usePostsContext } from '../../context/PostsContext';
import './style.css';

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, isLoading, error } = usePostsContext();
  const notesRef = useRef(null);
  const currentPost = posts.find((item) => String(item.id) === String(id)) || null;

  const handleFocusNotes = () => {
    if (notesRef.current) {
      notesRef.current.focus();
    }
  };

  if (isLoading) {
    return (
      <main className="post-details-page">
        <DataState
          variant="loading"
          title="Loading post..."
          message="Please wait while we load the article."
        />
      </main>
    );
  }

  if (!currentPost || error) {
    return (
      <main className="post-details-page">
        <DataState
          variant="error"
          title="Post not found"
          message="The requested post does not exist or could not be loaded."
          actionLabel="Back to Posts"
          actionTo="/posts"
        />
      </main>
    );
  }

  return (
    <main className="post-details-page">
      <article className="post-details-card ui-card">
        <div className="post-details-meta">
          <p className="post-details-tag">User {currentPost.userId}</p>
          <span className="post-details-id">Post #{currentPost.id}</span>
        </div>
        <h1>{currentPost.title}</h1>
        <p className="post-details-text">
          A focused article view with live data from the API and a cleaner editorial presentation.
        </p>
        <p className="post-details-body">{currentPost.body}</p>
        <section className="post-details-notes">
          <div className="post-details-notes-header">
            <h2>Ref Example</h2>
            <button type="button" className="post-details-focus-button ui-button" onClick={handleFocusNotes}>
              Focus Notes
            </button>
          </div>
          <p className="post-details-notes-text">
            This button uses <code>useRef</code> to move the cursor directly into the textarea.
          </p>
          <textarea
            ref={notesRef}
            className="post-details-textarea"
            placeholder="Write a quick note about this post..."
            rows="4"
          />
        </section>
        <div className="post-details-summary-grid">
          <div className="post-details-summary-card">
            <strong>Source</strong>
            <span>Live API content</span>
          </div>
          <div className="post-details-summary-card">
            <strong>Route</strong>
            <span>/posts/{currentPost.id}</span>
          </div>
        </div>
        <div className="post-details-action-row">
          <Link to="/posts" className="post-details-link ui-link-button ui-link-button--primary">Back to Posts</Link>
          <button type="button" className="ui-button ui-button--secondary" onClick={() => navigate('/posts')}>
            Edit In Posts
          </button>
        </div>
      </article>
    </main>
  );
}

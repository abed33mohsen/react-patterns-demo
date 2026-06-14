import { Link } from 'react-router-dom';

export default function PostsRouterDemo({ firstPostId, onOpenFirstPost }) {
  return (
    <section className="posts-router-demo ui-card">
      <h2>Router example</h2>
      <p>
        Here you can see the difference between using <code>Link</code>, <code>useNavigate</code>, and
        reading the post id later with <code>useParams</code> inside the details page.
      </p>
      <div className="posts-router-actions">
        <Link
          to={firstPostId ? `/posts/${firstPostId}` : '/posts'}
          className={`posts-demo-button${!firstPostId ? ' disabled' : ''}`}
          onClick={(event) => {
            if (!firstPostId) {
              event.preventDefault();
            }
          }}
        >
          Open first post with Link
        </Link>
        <button
          type="button"
          className="posts-demo-button secondary ui-button ui-button--primary"
          onClick={onOpenFirstPost}
          disabled={!firstPostId}
        >
          Open first post with useNavigate
        </button>
      </div>
    </section>
  );
}

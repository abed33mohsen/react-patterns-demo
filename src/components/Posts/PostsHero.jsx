export default function PostsHero({ isLoading, totalPosts }) {
  return (
    <section className="posts-hero ui-card">
      <div className="posts-copy">
        <p className="posts-kicker">Posts</p>
        <h1>Read and browse API-powered content.</h1>
        <p>
          This page loads posts from a live API and displays them in a cleaner reusable table.
        </p>
      </div>
      <div className="posts-stats">
        <div className="posts-stat">
          <strong>{isLoading ? '--' : totalPosts}</strong>
          <span>Loaded Posts</span>
        </div>
        <div className="posts-stat">
          <strong>API</strong>
          <span>jsonplaceholder</span>
        </div>
      </div>
    </section>
  );
}

import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import ToastMessage from '../ToastMessage';
import useTimedMessage from '../../hooks/useTimedMessage';
import { usePostsContext } from '../../context/PostsContext';
import { useTodosContext } from '../../context/TodosContext';
import { PATHS } from '../../router/paths';
import './style.css';

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuthContext();
  const { message, setMessage } = useTimedMessage();
  const { posts } = usePostsContext();
  const { todos } = useTodosContext();
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const pendingTodos = todos.length - completedTodos;
  const completionRate = todos.length > 0 ? Math.round((completedTodos / todos.length) * 100) : 0;
  const recentTodos = [...todos].sort((firstTodo, secondTodo) => Number(secondTodo.id) - Number(firstTodo.id)).slice(0, 4);
  const recentPosts = [...posts].sort((firstPost, secondPost) => Number(secondPost.id) - Number(firstPost.id)).slice(0, 4);

  useEffect(() => {
    const flashMessage = location.state?.flashMessage;

    if (!flashMessage) {
      return;
    }

    setMessage(flashMessage);
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.pathname, location.state, navigate, setMessage]);

  return (
    <main className="home-page">
      <ToastMessage message={message} />
      <section className="home-hero">
        <div className="home-panel home-main ui-card">
          <p className="home-kicker">Productivity Dashboard</p>
          {isLoggedIn ? (
            <div className="home-user-pill">Welcome back, {user?.name}</div>
          ) : (
            <div className="home-user-pill muted">Guest mode is active</div>
          )}
          <h1>Manage tasks, notes, and progress from one focused workspace.</h1>
          <p className="home-text">
            Track pending work, capture quick notes, and keep your workflow organized with
            a cleaner dashboard built around everyday actions.
          </p>
          <div className="home-actions">
            <Link to={PATHS.TODO} className="home-link primary ui-link-button ui-link-button--primary">Open Tasks</Link>
            <Link to={PATHS.POSTS.ROOT} className="home-link secondary ui-link-button ui-link-button--secondary">Open Notes</Link>
            {!isLoggedIn ? (
              <Link to={PATHS.LOGIN} className="home-link secondary ui-link-button ui-link-button--ghost">Sign In For More</Link>
            ) : null}
          </div>
        </div>

        <aside className="home-panel home-side ui-card">
          <p className="home-kicker">Today at a glance</p>
          <div className="home-metrics">
            <div className="home-metric-card">
              <strong>{todos.length}</strong>
              <span>Total Tasks</span>
            </div>
            <div className="home-metric-card">
              <strong>{pendingTodos}</strong>
              <span>Pending Tasks</span>
            </div>
            <div className="home-metric-card">
              <strong>{posts.length}</strong>
              <span>Saved Notes</span>
            </div>
            <div className="home-metric-card accent">
              <strong>{completionRate}%</strong>
              <span>Completion Rate</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card dashboard-card-wide ui-card">
          <div className="dashboard-card-head">
            <div>
              <p className="home-kicker">Quick Actions</p>
              <h2>Move your day forward</h2>
            </div>
          </div>
          <div className="dashboard-actions">
            <Link to={PATHS.TODO} className="ui-link-button ui-link-button--primary">Add Task</Link>
            <Link to={PATHS.POSTS.ROOT} className="ui-link-button ui-link-button--secondary">Write Note</Link>
            {isLoggedIn ? (
              <>
                <Link to={PATHS.PROFILE} className="ui-link-button ui-link-button--ghost">Update Profile</Link>
                <Link to={PATHS.SETTINGS} className="ui-link-button ui-link-button--ghost">Open Settings</Link>
              </>
            ) : (
              <Link to={PATHS.LOGIN} className="ui-link-button ui-link-button--ghost">Sign In First</Link>
            )}
          </div>
        </article>

        <article className="dashboard-card ui-card">
          <div className="dashboard-card-head">
            <div>
              <p className="home-kicker">Tasks Snapshot</p>
              <h2>Recent Tasks</h2>
            </div>
            <Link to={PATHS.TODO} className="dashboard-mini-link">Open all</Link>
          </div>
          <div className="dashboard-list">
            {recentTodos.length > 0 ? (
              recentTodos.map((todo) => (
                <div key={todo.id} className="dashboard-list-item">
                  <div>
                    <strong>{todo.title}</strong>
                    <span>{todo.completed ? 'Completed' : 'Pending'}</span>
                  </div>
                  <span className={`dashboard-status${todo.completed ? ' done' : ''}`}>
                    {todo.completed ? 'Done' : 'Next'}
                  </span>
                </div>
              ))
            ) : (
              <div className="dashboard-empty-state">No tasks yet. Create your first one from the Tasks page.</div>
            )}
          </div>
        </article>

        <article className="dashboard-card ui-card">
          <div className="dashboard-card-head">
            <div>
              <p className="home-kicker">Notes Snapshot</p>
              <h2>Recent Notes</h2>
            </div>
            <Link to={PATHS.POSTS.ROOT} className="dashboard-mini-link">Open all</Link>
          </div>
          <div className="dashboard-list">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div key={post.id} className="dashboard-list-item">
                  <div>
                    <strong>{post.title}</strong>
                    <span>User {post.userId}</span>
                  </div>
                  <span className="dashboard-id">#{post.id}</span>
                </div>
              ))
            ) : (
              <div className="dashboard-empty-state">No notes yet. Start by creating your first note.</div>
            )}
          </div>
        </article>

        <article className="dashboard-card ui-card">
          <div className="dashboard-card-head">
            <div>
              <p className="home-kicker">Focus</p>
              <h2>Progress Summary</h2>
            </div>
          </div>
          <div className="dashboard-progress">
            <div className="dashboard-progress-bar">
              <span style={{ width: `${completionRate}%` }} />
            </div>
            <div className="dashboard-progress-meta">
              <strong>{completionRate}% completed</strong>
              <span>{completedTodos} finished out of {todos.length || 0} tasks</span>
            </div>
          </div>
        </article>
      </section>

      <section className="home-cards">
        <Link to={PATHS.POSTS.ROOT} className="home-card ui-card">
          <span className="card-label">Notes</span>
          <h2>Content Hub</h2>
          <p>Create, edit, sort, and review your notes with a lightweight CRUD workspace.</p>
        </Link>

        <Link to={PATHS.TODO} className="home-card ui-card">
          <span className="card-label">Tasks</span>
          <h2>Task Board</h2>
          <p>Manage task status, update items fast, and keep daily priorities visible.</p>
        </Link>

        <Link to={PATHS.COUNTERS} className="home-card ui-card">
          <span className="card-label">Tracking</span>
          <h2>Quick Counter</h2>
          <p>Use a focused counter panel for quick progress checks and small interaction demos.</p>
        </Link>

        {isLoggedIn ? (
          <Link to={PATHS.PROFILE} className="home-card ui-card">
            <span className="card-label">Workspace</span>
            <h2>Profile</h2>
            <p>Keep your identity, goals, and profile overview in one editable personal area.</p>
          </Link>
        ) : (
          <Link to={PATHS.LOGIN} className="home-card ui-card">
            <span className="card-label">Access</span>
            <h2>Login</h2>
            <p>Sign in to open your profile, settings, and the more personal parts of the workspace.</p>
          </Link>
        )}

        <Link to={PATHS.LIFECYCLE} className="home-card ui-card">
          <span className="card-label">System</span>
          <h2>Lifecycle</h2>
          <p>Review state transitions and lifecycle behavior inside a cleaner demo page.</p>
        </Link>

        <Link to={PATHS.ABOUT} className="home-card ui-card">
          <span className="card-label">Overview</span>
          <h2>About</h2>
          <p>See the project structure, reusable sections, and the product direction in one place.</p>
        </Link>

        <Link to={PATHS.ROUTER} className="home-card ui-card">
          <span className="card-label">Reference</span>
          <h2>Router Guide</h2>
          <p>Keep a practical guide to routes, params, links, and navigation patterns close by.</p>
        </Link>

        {isLoggedIn ? (
          <Link to={PATHS.SETTINGS} className="home-card ui-card">
            <span className="card-label">Control</span>
            <h2>Settings</h2>
            <p>Manage appearance mode, jump between key sections, and keep the workspace feeling consistent.</p>
          </Link>
        ) : null}
      </section>
    </main>
  );
}

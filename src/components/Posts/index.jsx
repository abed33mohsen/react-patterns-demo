import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataState from '../DataState';
import { POSTS_COLUMNS } from './constants';
import PostsHero from './PostsHero';
import PostsRouterDemo from './PostsRouterDemo';
import ToastMessage from '../ToastMessage';
import { usePostsContext } from '../../context/PostsContext';
import useTimedMessage from '../../hooks/useTimedMessage';
import Table from '../Table';
import './style.css';

export default function PostsPage() {
  const navigate = useNavigate();
  const { posts, isLoading, error, createPost, updatePost, deletePost } = usePostsContext();
  const firstPostId = posts[0]?.id;
  const [formState, setFormState] = useState({ title: '', body: '', userId: '1' });
  const [editingId, setEditingId] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [sortValue, setSortValue] = useState('recent');
  const { message, setMessage } = useTimedMessage();

  const resetForm = () => {
    setFormState({ title: '', body: '', userId: '1' });
    setEditingId(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevFormState) => ({ ...prevFormState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formState.title.trim() || !formState.body.trim()) {
      return;
    }

    if (editingId) {
      updatePost(editingId, formState);
      setMessage('Post updated successfully.');
    } else {
      createPost(formState);
      setMessage('Post added successfully.');
    }

    resetForm();
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setFormState({
      title: post.title,
      body: post.body,
      userId: String(post.userId),
    });
  };

  const handleDelete = (postId) => {
    const isConfirmed = window.confirm('Delete this post permanently?');

    if (!isConfirmed) {
      return;
    }

    deletePost(postId);
    setMessage('Post deleted successfully.');
  };

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch = `${post.title} ${post.body}`.toLowerCase().includes(searchValue.trim().toLowerCase());
      const matchesUser = userFilter === 'all' ? true : String(post.userId) === userFilter;
      return matchesSearch && matchesUser;
    })
    .sort((firstPost, secondPost) => {
      if (sortValue === 'title') {
        return firstPost.title.localeCompare(secondPost.title);
      }

      if (sortValue === 'user') {
        return Number(firstPost.userId) - Number(secondPost.userId);
      }

      return Number(secondPost.id) - Number(firstPost.id);
    });

  const uniqueUsers = [...new Set(posts.map((post) => String(post.userId)))];
  const resetFilters = () => {
    setSearchValue('');
    setUserFilter('all');
    setSortValue('recent');
  };

  const tableData = filteredPosts.map((post) => ({
    id: post.id,
    title: post.title,
    tag: `User ${post.userId}`,
    body: `${post.body.slice(0, 70)}...`,
    action: (
        <div className="posts-table-actions" onClick={(event) => event.stopPropagation()}>
          <Link
            to={`/posts/${post.id}`}
            className="posts-inline-link"
          >
          Read More
        </Link>
        <button type="button" className="posts-mini-button" onClick={() => handleEdit(post)}>
          Edit
        </button>
        <button type="button" className="posts-mini-button danger" onClick={() => handleDelete(post.id)}>
          Delete
        </button>
      </div>
    ),
  }));

  return (
    <main className="posts-page">
      <PostsHero isLoading={isLoading} totalPosts={posts.length} />

      <section className="posts-editor ui-card">
        <ToastMessage message={message} />
        <div className="posts-editor-head">
          <div>
            <p className="posts-kicker">CRUD</p>
            <h2>{editingId ? 'Edit Post' : 'Create Post'}</h2>
          </div>
          {editingId ? (
            <button type="button" className="ui-button ui-button--secondary" onClick={resetForm}>
              Cancel Edit
            </button>
          ) : null}
        </div>

        <form className="posts-editor-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Post title"
            value={formState.title}
            onChange={handleChange}
          />
          <input
            type="number"
            name="userId"
            placeholder="User ID"
            value={formState.userId}
            onChange={handleChange}
          />
          <textarea
            name="body"
            rows="4"
            placeholder="Write the post body..."
            value={formState.body}
            onChange={handleChange}
          />
          <button type="submit" className="ui-button ui-button--primary">
            {editingId ? 'Save Post' : 'Add Post'}
          </button>
        </form>
      </section>

      <section className="posts-controls ui-card">
        <div className="posts-controls-head">
          <div>
            <p className="posts-kicker">Workspace Controls</p>
            <h2>Search, filter, and sort notes</h2>
          </div>
          <span className="posts-results-count">{filteredPosts.length} visible</span>
        </div>

        <div className="posts-controls-grid">
          <input
            type="text"
            placeholder="Search notes by title or content..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <select value={userFilter} onChange={(event) => setUserFilter(event.target.value)}>
            <option value="all">All users</option>
            {uniqueUsers.map((userId) => (
              <option key={userId} value={userId}>User {userId}</option>
            ))}
          </select>
          <select value={sortValue} onChange={(event) => setSortValue(event.target.value)}>
            <option value="recent">Newest first</option>
            <option value="title">Title A-Z</option>
            <option value="user">User ID</option>
          </select>
          <button type="button" className="ui-button ui-button--secondary posts-clear-button" onClick={resetFilters}>
            Clear Filters
          </button>
        </div>
      </section>

      <PostsRouterDemo
        firstPostId={firstPostId}
        onOpenFirstPost={() => firstPostId && navigate(`/posts/${firstPostId}`)}
      />

      <Table
        columns={POSTS_COLUMNS}
        data={tableData}
        isLoading={isLoading}
        error={error}
        fallback={
          error ? (
            <DataState
              variant="error"
              title="Posts could not be loaded"
              message="Please try again in a moment. The API may be temporarily unavailable."
              actionLabel="Reload Page"
              onAction={() => navigate(0)}
            />
          ) : null
        }
        onRowClick={(row) => navigate(`/posts/${row.id}`)}
      />
    </main>
  );
}

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { POSTS_ENDPOINT } from '../components/Posts/constants';

const PostsContext = createContext(null);
const POSTS_STORAGE_KEY = 'alara-react-posts';

function readStoredPosts() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedPosts = window.localStorage.getItem(POSTS_STORAGE_KEY);
    return storedPosts ? JSON.parse(storedPosts) : null;
  } catch {
    return null;
  }
}

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedPosts = readStoredPosts();

    if (storedPosts?.length) {
      setPosts(storedPosts);
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();

    setIsLoading(true);
    setError('');

    fetch(POSTS_ENDPOINT, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load posts');
        }

        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((fetchError) => {
        if (fetchError.name === 'AbortError') {
          return;
        }

        setPosts([]);
        setError(fetchError.message || 'Failed to load posts');
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || isLoading || posts.length === 0) {
      return;
    }

    window.localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  }, [posts, isLoading]);

  const createPost = ({ title, body, userId }) => {
    const nextId = posts.length > 0 ? Math.max(...posts.map((post) => Number(post.id) || 0)) + 1 : 1;
    const newPost = {
      id: nextId,
      userId: Number(userId) || 1,
      title: title.trim(),
      body: body.trim(),
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
    return newPost;
  };

  const updatePost = (id, updates) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        String(post.id) === String(id)
          ? {
              ...post,
              ...updates,
              userId: updates.userId ? Number(updates.userId) : post.userId,
            }
          : post
      )
    );
  };

  const deletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => String(post.id) !== String(id)));
  };

  const getPostById = (id) => posts.find((post) => String(post.id) === String(id)) || null;

  const value = useMemo(
    () => ({
      posts,
      isLoading,
      error,
      createPost,
      updatePost,
      deletePost,
      getPostById,
    }),
    [posts, isLoading, error]
  );

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}

export function usePostsContext() {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error('usePostsContext must be used within PostsProvider');
  }

  return context;
}

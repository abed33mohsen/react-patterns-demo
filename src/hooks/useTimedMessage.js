import { useEffect, useState } from 'react';

export default function useTimedMessage(timeout = 2200) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setMessage('');
    }, timeout);

    return () => window.clearTimeout(timerId);
  }, [message, timeout]);

  return {
    message,
    setMessage,
    clearMessage: () => setMessage(''),
  };
}
